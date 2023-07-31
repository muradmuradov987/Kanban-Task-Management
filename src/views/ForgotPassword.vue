<template>
  <div
    class="forgot__password d-flex align-items-center justify-content-center min-vh-100 p-3"
  >
    <div class="forgot__password-container">
      <div class="login__logo d-flex align-items-center justify-content-center">
        <div class="d-flex me-2">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h2 class="m-0">kanban</h2>
      </div>
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
      <div class="form__control">
        <input class="form__input" type="mail" required />
        <label class="form__label">Email</label>
      </div>
      <button class="sendResetLinkBtn">Send Reset Link</button>
      <div class="back">
        <RouterLink to="/login">
          <i class="fa-solid fa-chevron-left"></i>Back to login</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.forgot__password {
  background: var(--bg);
  .forgot__password-container {
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
}
</style>
