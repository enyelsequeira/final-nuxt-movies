<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  bodyAttrs: {
    class: "h-full bg-light-background-primary dark:bg-dark-background-primary",
    id: "page",
  },

  htmlAttrs: {
    lang: "en",
    class: "h-full",
  },
});
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#__nuxt {
  height: 100%;
}

.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}
.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-out 0.5s;
}

@keyframes bounce-in {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

@keyframes bounce-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-200px);
  }
}
.bouncier-enter-active {
  animation: bounce-in 0.7s;
}
.bouncier-leave-active {
  animation: bounce-fade-out 0.7s;
}

@keyframes bounce-in {
  0%,
  20%,
  60%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-50px);
  }
  80% {
    transform: translateY(-25px);
  }
}

@keyframes bounce-fade-out {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  20% {
    transform: translateY(-30px);
    opacity: 1;
  }
  40% {
    transform: translateY(15px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 0;
  }
}

.genre-slide-fade-enter-active,
.genre-slide-fade-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}
.genre-slide-fade-enter-from {
  transform: translateY(-50px);
  opacity: 0;
}
.genre-slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
@keyframes ripple-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes ripple-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

.genre-ripple-enter-active {
  animation: ripple-in 0.6s;
}
.genre-ripple-leave-active {
  animation: ripple-out 0.6s;
}
.genre-scale-twist-enter-active,
.genre-scale-twist-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.genre-scale-twist-enter-from {
  opacity: 0;
  transform: scale(0.9) rotate(5deg);
}
.genre-scale-twist-leave-to {
  opacity: 0;
  transform: scale(1.1) rotate(-5deg);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
.genre-transition-enter-active,
.genre-transition-leave-active {
  transition: all 0.4s ease;
}
.genre-transition-enter-from,
.genre-transition-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
