<template>
  <div class="login__wrapper">
    <div class="login__card">
      <div class="login__logo d-flex align-items-center justify-content-center">
        <div class="d-flex me-2">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h2 class="m-0">kanban</h2>
      </div>
      <div class="login__title">
        <h5>Welcome to Kanban !</h5>
        <p>Please sign-in to your account and start the adventure</p>
      </div>
      <div class="form__wrapper">
        <div class="form__control" :class="{ err__input: activeErr }">
          <input class="form__input" type="mail" v-model="email" required />
          <label class="form__label">Email</label>
        </div>
        <div class="form__control" :class="{ err__input: activeErr }">
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
        <PrimaryBtn buttonWidth="100%" :onClick='login'>LOGIN</PrimaryBtn>
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
const router = useRouter(); // get reference to our vue router
const storeCount = useCounterStore(); // get reference to our store

const email = ref("");
const password = ref("");
const inputRef = ref(null);
let showPassword = ref(false);

let activeErr = ref(false); //Activate error input class
const errMsg = ref(""); //Error message

//Login button
const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      if (data.user.emailVerified == false) {
        errMsg.value = "Your email is not verified!";
      } else {
        router.push("/home");
      }
    })
    .catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          activeErr.value = true;
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          activeErr.value = true;
          break;
        case "auth/user-disabled":
          errMsg.value = "Your account has been disabled";
          activeErr.value = true;
          break;
        case "auth/wrong-password":
          errMsg.value = "Invalid password";
          activeErr.value = true;
          break;
        case "auth/missing-password":
          errMsg.value = "The password field is empty";
          activeErr.value = true;
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          activeErr.value = true;
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
    .login__logo {
      div {
        span {
          width: 3px;
          height: 25px;
          margin-right: 3px;
          &:nth-child(1) {
            background: #6561c8;
          }
          &:nth-child(2) {
            background: #555597;
          }
          &:nth-child(3) {
            background: #4a467d;
          }
        }
      }
      h2 {
        color: var(--white);
      }
    }
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
</style>
