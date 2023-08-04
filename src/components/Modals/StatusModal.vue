<template>
  <div class="statusModal__container">
    <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
      <g
        stroke="currentColor"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          class="circle"
          d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
        />
        <path class="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
      </g>
    </svg>
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.statusModal__container {
  position: absolute;
  top: 30px;
  right: 20px;
  max-width: 450px;
  width: 450px;
  padding: 20px;
  border: 2px solid var(--bg);
  border-radius: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: var(--bg2);
  animation: scale-up-ver-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  z-index: 100;
  svg {
    display: block;
    height: 80px;
    width: 80px;
    margin-bottom: 20px;
    color: rgb(20, 212, 20); /* SVG path use currentColor to inherit this */
  }

  .circle {
    stroke-dasharray: 76;
    stroke-dashoffset: 76;
    animation: draw 0.7s forwards;
  }

  .tick {
    stroke-dasharray: 18;
    stroke-dashoffset: 18;
    animation: draw 0.7s forwards 0.7s;
  }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes scale-up-ver-top {
    0% {
      -webkit-transform: scaleY(0.2);
      transform: scaleY(0.4);
      -webkit-transform-origin: 100% 0%;
      transform-origin: 100% 0%;
    }
    100% {
      -webkit-transform: scaleY(1);
      transform: scaleY(1);
      -webkit-transform-origin: 100% 0%;
      transform-origin: 100% 0%;
    }
  }
}

@media (max-width: 767px) {
  .statusModal__container {
    position: absolute;
    top: 20px;
    right: unset;
    transform: translate(-50%,-50%);
    max-width: 250px;
    width: 250px;
    padding: 10px;
    svg {
      height: 40px;
      width: 40px;
      margin-bottom: 10px;
    }
  }
}
</style>
