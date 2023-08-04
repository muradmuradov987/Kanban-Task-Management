<template>
  <div class="forgot__password">
    <StatusModal v-if="showStatus">
      <h5 class="modal__title">We have e-mailed you password reset link</h5>
    </StatusModal>
    <div class="forgot__password-container">
      <Logo />
      <div class="forgot__password-title">
        <div>
          <h5>Forgot Password?</h5>
          <i class="fa-solid fa-lock"></i>
        </div>
        <p>
          Enter your email and we'll send you instructions to reset your
          password
        </p>
      </div>
      <div class="form__control" :class="{ err__input: activeErr }">
        <input class="form__input" v-model="resetMail" type="mail" required />
        <label class="form__label">Email</label>
      </div>
      <p v-if="activeErr" class="err__msg">{{ errMsg }}</p>
      <PrimaryBtn buttonWidth="100%" :onClick="sendLink">
        Send Reset Link</PrimaryBtn
      >
      <div class="back">
        <RouterLink to="/login">
          <i class="fa-solid fa-chevron-left"></i>Back to login</RouterLink
        >
      </div>
    </div>
    <div class="page__img d-none d-lg-block">
      <img src="../../assets/img/forgot-password.svg" alt="login" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import StatusModal from "@/components/Modals/StatusModal.vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import PrimaryBtn from "@/components/Buttons/PrimaryBtn.vue";
import Logo from "@/components/Logo.vue";
let resetMail = ref("");
const showStatus = ref(false);
let activeErr = ref(false); //Activate error input class
const errMsg = ref(""); //Error message

const sendLink = () => {
  if (resetMail.value == "") {
    activeErr.value = true;
    errMsg.value = "The email field is empty";
  } else {
    sendPasswordResetEmail(getAuth(), resetMail.value)
      .then(() => {
        resetMail.value = "";
        activeErr.value = false;
        errMsg.value = "";
        showStatus.value = true;
        setTimeout(() => {
          showStatus.value = false;
        }, 2500);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            errMsg.value = "Invalid email";
            activeErr.value = true;
            break;
          default:
            errMsg.value = "No account with that email was found";
            activeErr.value = true;
            break;
        }
      });
  }
};
</script>

<style lang="scss" scoped>
.forgot__password {
  background: var(--bg);
  position: relative;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  .forgot__password-container {
    max-width: 448px;
    width: 100%;
    border-radius: 6px;
    background: var(--bg2);
    padding: 40px 20px;

    .forgot__password-title {
      margin: 30px 0;
      div {
        display: flex;
        align-items: center;
        margin-block: 10px;
        h5 {
          color: var(--white);
          margin-right: 20px;
        }
        i {
          color: var(--primary);
        }
      }
      p {
        color: var(--white);
        margin: 0;
        font-size: 14px;
      }
    }
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
    }
    .sendResetLinkBtn {
      margin: 30px 0;
      width: 100%;
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
    .back {
      text-align: center;
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--primary);
        text-decoration: none;
        font-weight: 500;
      }
      i {
        margin-right: 10px;
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

.err__input {
  .form__label {
    color: var(--red) !important;
  }
  .form__input {
    border: 1px solid var(--red) !important;
  }
}
.err__msg {
  color: var(--red) !important;
  font-size: 14px;
  margin: 20px 0;
}

@media (max-width: 767px) {
  .forgot__password {
    gap: unset;
    .forgot__password-container {
      padding: 20px;

      .forgot__password-title {
        margin: 20px 0;
      }
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
    }
  }
  .modal__title {
    font-size: 12px;
    margin: 0;
  }
}
</style>
