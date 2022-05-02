<template>
  <div class="login">
    <transition
      name="animate__animated animate__bounce animate__delay-1s"
      enter-active-class="animate__backInLeft"
      leave-active-class="animate__backOutRight"
      ><router-view></router-view>
    </transition>
  </div>
</template>
<script>
import 'animate.css';
export default {
  data() {
    return {
    };
  },
  mounted(){
    console.log('mm');
  },
  components: {},
};
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
}
.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: 0.5s;
}
.v-enter-to {
  opacity: 1;
}
.v-leave {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  transition: 0.5s;
}
</style>
