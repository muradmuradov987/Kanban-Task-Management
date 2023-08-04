<template>
  <div class="login__wrapper">
    <StatusModal v-if="showStatus">
      <h5 class="modal__title">Successfull register</h5>
      <p class="modal__text">
        We have sent an activation link to your account to countinue with the
        registration process.
      </p>
    </StatusModal>
    <div class="login__card">
      <Logo />
      <div class="login__title">
        <h5>Adventure starts here</h5>
        <p>Make your app management easy and fun!</p>
      </div>
      <div class="form__wrapper">
        <div class="form__control" :class="{ err__input: validation.fullName }">
          <input class="form__input" type="text" v-model="fullName" required />
          <label class="form__label">Fullname</label>
        </div>
        <div class="form__control" :class="{ err__input: validation.email }">
          <input class="form__input" type="mail" v-model="email" required />
          <label class="form__label">Email</label>
        </div>
        <div class="form__control" :class="{ err__input: validation.password }">
          <input
            class="form__input"
            type="password"
            v-model="password"
            ref="inputRef"
            required
          />
          <label class="form__label">Password</label>
          <i
            class="far fa-eye-slash"
            :class="{ 'fa-eye': !showPassword, 'fa-eye-slash': showPassword }"
            @click="togglePassword"
          ></i>
        </div>
        <p v-if="errMsg" class="err__msg">{{ errMsg }}</p>
        <PrimaryBtn buttonWidth="100%" :onClick="registerBtn"
          >Sign Up</PrimaryBtn
        >
        <div class="register d-flex align-items-center justify-content-center">
          <span>Already have an account?</span>
          <RouterLink to="/login">Sign in instead</RouterLink>
        </div>
        <div class="hr">
          <hr />
          <span>or</span>
          <hr />
        </div>
        <div class="sosial__network">
          <a href="#">
            <i class="fa-brands fa-google"></i>
          </a>
          <a href="#">
            <i class="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#">
            <i class="fa-brands fa-twitter"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="page__img d-none d-lg-block">
      <img src="../../assets/img/signup.svg" alt="login" />
    </div>
  </div>
</template>

<script setup>
import StatusModal from "@/components/Modals/StatusModal.vue";
import { ref } from "vue";
import { useRouter } from "vue-router"; //import router
import PrimaryBtn from "@/components/Buttons/PrimaryBtn.vue";
import Logo from "@/components/Logo.vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const showStatus = ref(false);

let validation = ref({
  fullName: false,
  email: false,
  password: false,
});

const resetValidation = () => {
  validation.value.fullName = false;
  validation.value.email = false;
  validation.value.password = false;
};
const errMsg = ref(""); //Error message

const inputRef = ref(null);
let showPassword = ref(false);
const router = useRouter(); // get reference to our vue router

const fullName = ref("");
const email = ref("");
const password = ref("");

//Register button
const registerBtn = () => {
  resetValidation();

  if (fullName.value == "") {
    validation.value.fullName = true;
  }
  if (email.value == "") {
    validation.value.email = true;
  }
  if (password.value == "") {
    validation.value.password = true;
  }

  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      sendEmailVerification(getAuth().currentUser).then(() => {});
      fullName.value = "";
      email.value = "";
      password.value = "";
      resetValidation();
      errMsg.value = "";
      showStatus.value = true;
      setTimeout(() => {
        showStatus.value = false;
      }, 5000);
    })
    .catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          validation.value.email = true;
          break;
        case "auth/wrong-password":
          errMsg.value = "Invalid password";
          validation.value.password = true;
          break;
        case "auth/weak-password":
          errMsg.value = "Password should be at least 6 characters";
          validation.value.password = true;
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          validation.value.email = true;
          validation.value.password = true;
          break;
      }
    });
};

//Show Password
const togglePassword = () => {
  showPassword.value = !showPassword.value;
  if (showPassword.value) {
    inputRef.value.type = "text";
  } else {
    inputRef.value.type = "password";
  }
};
</script>

<style lang="scss" scoped>
.login__wrapper {
  background: var(--bg);
  min-height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  .login__card {
    max-width: 448px;
    width: 100%;
    border-radius: 6px;
    background: var(--bg2);
    padding: 40px 20px;
    .login__title {
      color: var(--white);
      margin: 30px 0;
      p {
        margin: 0;
        color: var(--primary);
      }
    }
    .form__wrapper {
      display: flex;
      flex-direction: column;
      gap: 30px;
      .form__control {
        position: relative;
        z-index: 5;
        .form__label {
          position: absolute;
          color: var(--white);
          top: 50%;
          left: 20px;
          transform: translate(0%, -50%);
          transition: 0.3s ease;
          z-index: -1;
        }
        .form__input {
          width: 100%;
          height: 60px;
          border-radius: 8px;
          padding: 20px;
          padding-right: 50px;
          outline: none;
          font-size: 20px;
          color: var(--primary);
          background: none;
          border: 1px solid var(--white);
          &:valid,
          &:focus {
            border: 2px solid var(--primary);
          }
          &:valid ~ .form__label,
          &:focus ~ .form__label {
            top: 0;
            color: var(--primary);
            font-size: 14px;
            background: var(--bg2);
            padding: 0 5px;
            z-index: 1;
          }
        }

        i {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translate(0%, -50%);
          color: var(--primary);
          cursor: pointer;
        }
      }
      .forgot__pass {
        text-align: end;
        a {
          color: var(--primary);
        }
      }
      .loginBtn {
        padding: 10px;
        border-radius: 8px;
        background: var(--primary);
        color: var(--white);
        border: none;
        transition: 0.3s ease;
        &:hover {
          box-shadow: -1px 3px 10px 2px rgba(102, 96, 195, 0.75);
        }
      }
      .register {
        span {
          margin-right: 20px;
          color: var(--white);
        }
        a {
          color: var(--primary);
          text-decoration: none;
        }
      }
      .hr {
        position: relative;
        display: flex;
        align-items: center;
        hr {
          width: 100%;
          color: var(--white);
          margin: 0;
        }
        span {
          color: var(--white);
          padding: 0 20px;
          background: var(--bg2);
        }
      }
      .sosial__network {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        a {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          border-radius: 4px;
          transition: 0.3s ease;
          background: var(--bg);
          i {
            color: var(--primary);
          }
          &:hover {
            box-shadow: -1px 3px 10px 2px rgba(102, 96, 195, 0.75);
          }
        }
      }
    }
  }
  .page__img {
    max-width: 650px;
    width: 650px;
    max-height: 600px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
.modal__title {
  color: var(--white);
}
.modal__text {
  color: var(--white);
  text-align: center;
}

.err__input {
  .form__label {
    color: var(--red) !important;
  }
  .form__input {
    border: 1px solid var(--red) !important;
  }
}
.err__msg {
  color: red;
}

@media (max-width: 767px) {
  .login__wrapper {
    gap: unset;
    .login__card {
      padding: 20px;
      .login__title {
        margin: 20px 0;
        p {
          font-size: 14px;
        }
      }
      .form__wrapper {
        gap: 20px;
        .form__control {
          .form__label {
            font-size: 14px;
          }
          .form__input {
            height: 50px;
            border-radius: 6px;
            font-size: 14px;
          }
        }
        .hr {
          span {
            padding: 0 10px;
          }
        }
        .sosial__network {
          gap: 10px;
        }
      }
    }
  }
  .modal__title {
    font-size: 12px;
    margin: 0;
  }
  .modal__text{
    margin-top: 10px;
    font-size: 12px;
    line-height: 12px;
  }
}
</style>
