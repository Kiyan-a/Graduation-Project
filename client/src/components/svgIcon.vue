<template>
  <svg aria-hidden="true" class="icon-svg">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    symbolId() {
      return `#${this.prefix}-${this.name}`;
    },
  },
};
</script>

<style scoped>
.icon-svg {
  font-weight: bold;
  width: 1.33em;
  height: 1.33em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: #5d98fc;
}
</style>
