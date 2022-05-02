<template>
  <w-edit :value.sync="value" />
</template>

<script>
import wEdit from './w-edit.vue';
export default {
  components: { wEdit },
  data() {
    return {
      value: '<h1>欢迎使用!</h1>',
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
