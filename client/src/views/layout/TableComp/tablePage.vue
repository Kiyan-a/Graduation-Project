<template>
  <div>
    <div class="search-container" v-if="searchConfig">
      <el-form ref="searchForm" :inline="true" :model="formModel" size="small">
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
          <el-button type="primary" size="small" @click="onSubmit"
            >查询</el-button
          >
          <el-button size="small" @click="resetForm">重置</el-button>
          <slot name="search-buttons" v-if="searchConfig.inline"> </slot>
        </el-form-item>
      </el-form>
      <slot name="search-buttons" v-if="!searchConfig.inline"> </slot>
    </div>
    <el-table
      :data="tableData"
      v-bind="$attrs"
      v-on="$listeners"
      v-loading="loading"
      size="small"
      @cell-dblclick="handlCopy"
      highlight-current-row
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        v-if="isSelection"
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column label="序号" type="index" width="50">
        <template slot-scope="scope">
          <p class="xuhao">
            {{ scope.$index + 1 }}
          </p>
        </template>
      </el-table-column>
      <template v-for="item in columns">
        <el-table-column
          :key="item.prop"
          v-bind="item"
          v-if="fieldConfig[item.prop]"
          show-overflow-tooltip
        >
          <template v-slot="scope">
            <slot :name="'table-' + item.prop" :table="scope">{{
              scope.row[item.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>

      <el-table-column fixed="right" align="center" width="40">
        <template #header>
          <el-dropdown trigger="click">
            <i
              class="el-icon-s-tools"
              style="font-size: 16px; cursor: pointer; color: #409eff"
            ></i>
            <el-dropdown-menu slot="dropdown">
              <el-checkbox
                style="display: block; margin: 10px 20px"
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
                >全选</el-checkbox
              >
              <el-checkbox
                style="display: block; margin: 10px 20px"
                v-for="item in columns"
                v-model="fieldConfig[item.prop]"
                :key="item.prop"
                >{{ item.label }}</el-checkbox
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      hide-on-single-page
      :current-page="pageData.pageNum"
      :page-sizes="pageData.pageSizes ? pageData.pageSizes : [5, 10, 15, 20]"
      :page-size="pageData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
// 2022-04-30 新增表格双击复制功能
import copy from 'copy-to-clipboard';
export default {
  name: 'TablePage',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    searchConfig: {
      type: [Object, Boolean],
      default: false,
    },
    getListData: {
      type: Function,
      default: () => {},
    },
    fieldKey: {
      type: String,
      default: '',
    },
    isSelection: {
      type: Boolean,
      default: false,
    },
    isIndex: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tableData: [],
      formModel: {},
      pageData: {
        total: 0,
        pageSize: 10,
        pageNum: 1,
        pageSizes: [5, 10, 15, 20],
      },
      fieldConfig: {},
      loading: false,
      checkAll: false,
      isIndeterminate: true,
    };
  },
  created() {
    this.initFieldConfig();
  },
  mounted() {
    let { pageSize, pageNum } = this.pageData;
    this.getData({
      pageNum,
      pageSize,
    });
  },
  methods: {
    onSubmit({ pageNum = 1, pageSize = 10 } = {}) {
      let { formModel } = this;
      let query = { ...formModel, pageSize, pageNum };
      for (const i in query) {
        if (query[i] === '') {
          delete query[i];
        }
      }
      this.getData(query);
    },
    resetForm() {
      this.$refs['searchForm'].resetFields();
      this.formModel = {};
      this.getData({ pageNum: 1, pageSize: 10 });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) return 'double-row';
    },
    handleSizeChange(val) {
      this.pageData.pageSize = val;
      let { pageNum, pageSize } = this.pageData;
      this.onSubmit({ pageNum, pageSize });
    },
    handleCurrentChange(val) {
      this.pageData.pageNum = val;
      let { pageNum, pageSize } = this.pageData;
      this.onSubmit({ pageNum, pageSize });
    },
    getData(query) {
      this.loading = true;
      this.getListData(query)
        .then(({ list, total }) => {
          this.tableData = list;
          this.pageData.total = total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    initFieldConfig() {
      if (localStorage.getItem(this.fieldKey)) {
        this.fieldConfig = JSON.parse(localStorage.getItem(this.fieldKey));
        return;
      }
      this.fieldConfig = this.columns.reduce((pre, cur, index) => {
        if (index < 6) {
          return { ...pre, [cur.prop]: true };
        }
        return { ...pre, [cur.prop]: false };
      }, {});
    },
    handleCheckAllChange(val) {
      let { fieldConfig } = this;
      this.isIndeterminate = false;
      if (val) {
        for (const item in fieldConfig) {
          fieldConfig[item] = true;
        }
      }
      if (!val) {
        for (const item in fieldConfig) {
          fieldConfig[item] = false;
        }
      }
    },
    saveFieldConfig() {
      localStorage.setItem(this.fieldKey, JSON.stringify(this.fieldConfig));
    },
    handlCopy(row, column, cell) {
      let isCopy = copy(row[column['property']]);
      if (isCopy) {
        this.$notify({
          title: '复制成功',
          type: 'success',
        });
      }
    },
  },
};
</script>
<style>
.el-table {
  margin-top: 6px;
  border-radius: 8px;
}
.el-table .double-row {
  background: #fafafa;
}
.el-pagination {
  float: right;
  margin-top: 10px;
}
.xuhao {
  width: 18px;
  height: 18px;
  line-height: 18px;
  color: #909399;
  text-align: center;
  border-radius: 4px;
  background: #f4f4f5;
}
.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background-color: rgba(148, 187, 252, 0.2);
}
.el-table__body tr.current-row > td.el-table__cell {
  background-color: rgba(148, 187, 252, 0.3);
}
.el-table__body tr.current-row {
  position: relative;
}
.el-table__body tr.current-row::after {
  content: '';
  display: block;
  position: absolute;
  top: -1px;
  bottom: 0;
  left: 0;
  width: 3px;
  z-index: 999;
  background-color: #409eff;
}
</style>
