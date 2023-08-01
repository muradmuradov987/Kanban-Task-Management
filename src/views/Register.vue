<template>
  <div
    class="login__wrapper d-flex align-items-center justify-content-center min-vh-100 p-3"
  >
    <StatusModal v-if="showStatus">
      <h5 class="modal__title">Successfull register</h5>
      <p class="modal__text">
        We have sent an activation link to your account to countinue with the
        registration process.
      </p>
    </StatusModal>
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
        <h5>Adventure starts here</h5>
        <p>Make your app management easy and fun!</p>
      </div>
      <div class="form__wrapper">
        <div class="form__control">
          <input class="form__input" type="text" v-model="userName" />
          <label class="form__label">Username</label>
        </div>
        <div class="form__control">
          <input class="form__input" type="mail" v-model="email" />
          <label class="form__label">Email</label>
        </div>
        <div class="form__control">
          <input
            class="form__input"
            type="password"
            v-model="password"
            ref="inputRef"
          />
          <label class="form__label">Password</label>
          <i
            class="far fa-eye-slash"
            :class="{ 'fa-eye': !showPassword, 'fa-eye-slash': showPassword }"
            @click="togglePassword"
          ></i>
        </div>
        <div class="form__agreement">
          <input class="form-check-input" type="checkbox" />
          <span>I agree to <a href="#">privacy policy & terms</a></span>
        </div>
        <button class="loginBtn" @click="registerBtn">Sign Up</button>
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
  </div>
</template>

<script setup>
import StatusModal from "@/components/StatusModal.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const showStatus = ref(false);

const inputRef = ref(null);
let showPassword = ref(false);
const router = useRouter();

const userName = ref("");
const email = ref("");
const password = ref("");

const registerBtn = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log(data);
      showStatus.value = true;
      setTimeout(() => {
        showStatus.value = false;
      }, 1500);
    })
    .catch(() => {
      console.log("error");
    });
};

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
      margin-block: 30px;
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
      .form__agreement {
        input {
          width: 18px;
          height: 18px;
          margin-right: 20px;
          outline: none;
          &:checked {
            background-color: var(--primary);
            border-color: var(--primary);
          }
        }
        span {
          color: var(--white);
          a {
            color: var(--primary);
            text-decoration: none;
          }
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
}
.modal__title {
  color: var(--white);
}
.modal__text {
  color: var(--white);
  text-align: center;
}
</style>
