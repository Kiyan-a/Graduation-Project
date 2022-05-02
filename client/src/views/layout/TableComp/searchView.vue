<template>
  <div class="search-container" v-if="searchConfig">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="formModel"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item
        v-for="items in searchConfig['columns']"
        :label="items.label"
        :key="items.prop"
      >
        <slot
          name="search-{{items.prop}}"
          :formModel="formModel"
          :formItem="items.prop"
        >
          <el-input v-model="formModel[items.prop]"></el-input>
        </slot>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
        <el-button size="mini" @click="resetForm">重置</el-button>
        <slot name="search-buttons" v-if="searchConfig.inline"> </slot>
      </el-form-item>
    </el-form>
    <slot name="search-buttons" v-if="!searchConfig.inline"> </slot>
  </div>
</template>
<script>
export default {
  name: 'searchView',
  components: {},
  props: {
    searchConfig: {
      type: [Object, Boolean],
      default: false,
    },
  },
  data() {
    return {
      formModel: {},
    };
  },
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      this.$emit('search', this.formModel);
    },
    resetForm() {
      this.$refs['searchForm'].resetFields();
      this.formModel = {};
      this.$emit('search', this.formModel);
    },
  },
};
</script>
