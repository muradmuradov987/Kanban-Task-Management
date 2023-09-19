<template>
  <div class="login__wrapper">
    <div class="login__card">
      <Logo />
      <div class="login__title">
        <h5>Welcome to Kanban !</h5>
        <p>Please sign-in to your account and start the adventure</p>
      </div>
      <div class="form__wrapper">
        <div class="form__control" :class="{ err__input: validation.email }">
          <input class="form__input" type="mail" v-model="email" required @keypress.enter="login" />
          <label class="form__label">Email</label>
        </div>
        <div class="form__control" :class="{ err__input: validation.password }">
          <input
            class="form__input"
            type="password"
            v-model="password"
            ref="inputRef"
            required
            @keypress.enter="login"
          />
          <label class="form__label">Password</label>
          <i
            class="far fa-eye-slash"
            :class="{ 'fa-eye': !showPassword, 'fa-eye-slash': showPassword }"
            @click="togglePassword"
          ></i>
        </div>
        <div class="forgot__pass">
          <RouterLink to="/forgot-password">Forgot Password?</RouterLink>
          <p v-if="errMsg" class="err__msg">{{ errMsg }}</p>
        </div>
        <PrimaryBtn buttonWidth="100%" :onClick="login">LOGIN</PrimaryBtn>
        <div class="register d-flex align-items-center justify-content-center">
          <span>New on our platform?</span>
          <RouterLink to="/register">Create an account</RouterLink>
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
      <img src="../../assets/img/login.svg" alt="login" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; //import router
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useCounterStore } from "@/stores/counter";
import PrimaryBtn from "@/components/Buttons/PrimaryBtn.vue";
import Logo from "@/components/Logo.vue";
const router = useRouter(); // get reference to our vue router
const storeCount = useCounterStore(); // get reference to our store

let validation = ref({
  email: false,
  password: false,
});

const resetValidation = () => {
  validation.value.email = false;
  validation.value.password = false;
};

const email = ref("");
const password = ref("");
const inputRef = ref(null);
let showPassword = ref(false);

const errMsg = ref(""); //Error message

//Login button
const login = () => {
  resetValidation();
  if (email.value == "") {
    validation.value.email = true;
  }
  if (password.value == "") {
    validation.value.password = true;
  }
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      if (data.user.emailVerified == false) {
        errMsg.value = "Your email is not verified!";
      } else {
        router.push("/dashboard");
      }
    })
    .catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          validation.value.email = true;
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          validation.value.email = true;
          break;
        case "auth/user-disabled":
          errMsg.value = "Your account has been disabled";
          validation.value.email = true;
          break;
        case "auth/wrong-password":
          errMsg.value = "Invalid password";
          validation.value.password = true;
          break;
        case "auth/missing-password":
          errMsg.value = "The password field is empty";
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        a {
          color: var(--primary);
          text-decoration: none;
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
    max-width: 450px;
    width: 450px;
    max-height: 500px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
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
  color: var(--red);
  font-size: 14px;
  margin: 0;
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
        .register {
          span {
            font-size: 14px;
          }
          a {
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
}
</style>
