<template>
  <div class="home">
    <TablePage
      :getListData="getListData"
      :searchConfig="searchConfig"
      :columns="columns"
      ref="tablePage"
      fieldKey="only - aritclePage"
    >
      <!-- <template #search-type="{ formModel, formItem }">
        <el-select v-model="formModel[formItem]" placeholder="请选择文章类型">
          <el-option label="工具分享" value="工具分享"></el-option>
          <el-option label="Javascript" value="Javascript"></el-option>
          <el-option label="NodeJs" value="NodeJs"></el-option>
          <el-option label="面试" value="面试"></el-option>
          <el-option label="GitHub" value="GitHub"></el-option>
          <el-option label="Vue" value="Vue"></el-option>
          <el-option label="Recat" value="Recat"></el-option>
          <el-option label="组件" value="组件"></el-option>
          <el-option label="技巧分享" value="技巧分享"></el-option>
          <el-option label="TypeScript" value="TypeScript"></el-option>
          <el-option label="Vite" value="Vite"></el-option>
          <el-option label="Webpack" value="Webpack"></el-option>
          <el-option label="其它" value="其它"></el-option>
        </el-select>
      </template> -->
      <template #search-buttons>
        <el-button size="small" type="success" @click="openDrawer"
          >添加</el-button
        >
      </template>
      <template #table-operation="{ table }">
        <el-button size="mini" type="primary" @click="openDrawer(table.row)"
          >修改</el-button
        >
        <el-popconfirm title="确定删除吗？" @confirm="delData(table.row)">
          <el-button slot="reference" size="mini" type="danger">
            删除</el-button
          >
        </el-popconfirm>
      </template>
    </TablePage>
    <el-drawer
      :title="tips"
      :visible.sync="dialog"
      custom-class="demo-drawer"
      ref="drawer"
      @close="cancelForm"
      v-loading="loading"
    >
      <div class="demo-drawer__content" style="margin: 20px">
        <el-form ref="form" :model="form" label-position="top" :rules="rules">
          <el-form-item label="类型">
            <el-select v-model="form.type" placeholder="请选择文章类型">
              <el-option label="工具分享" value="工具分享"></el-option>
              <el-option label="Javascript" value="Javascript"></el-option>
              <el-option label="NodeJs" value="NodeJs"></el-option>
              <el-option label="面试" value="面试"></el-option>
              <el-option label="GitHub" value="GitHub"></el-option>
              <el-option label="Vue" value="Vue"></el-option>
              <el-option label="Recat" value="Recat"></el-option>
              <el-option label="组件" value="组件"></el-option>
              <el-option label="技巧分享" value="技巧分享"></el-option>
              <el-option label="TypeScript" value="TypeScript"></el-option>
              <el-option label="Vite" value="Vite"></el-option>
              <el-option label="Webpack" value="Webpack"></el-option>
              <el-option label="其它" value="其它"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章网址" prop="address">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="handlForm">提 交</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getList, deleteRow, setArticle } from '@/api';
import { formatterDate } from '@/utils';
import TablePage from '@/components/tablePage.vue';
export default {
  components: { TablePage },
  data() {
    return {
      dialog: false,
      loading: false,
      tips: '',
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入文章网址', trigger: 'blur' },
        ],
      },
      form: {
        title: '',
        type: '',
        address: '',
        remark: '',
      },
      searchConfig: {
        inline: true,
        columns: [
          {
            label: '标题',
            prop: 'title',
          },
          {
            label: '类型',
            prop: 'type',
          },
        ],
      },
      columns: [
        { label: '标题', prop: 'title', align: 'center' },
        { label: '类型', prop: 'type', align: 'center' },
        { label: '文章地址', prop: 'address', align: 'center' },
        { label: '创建时间', prop: 'createDate', align: 'center' },
        { label: '更新时间', prop: 'upDate', align: 'center' },
        { label: '备注', prop: 'remark', align: 'center' },
        {
          label: '操作',
          prop: 'operation',
          align: 'center',
          fixed: 'right',
          width: '120',
        },
      ],
    };
  },
  methods: {
    getListData(query) {
      return getList(query).then(res => {
        return {
          list: res.data.list,
          total: res.data.total,
        };
      });
    },
    delData(row) {
      deleteRow({ id: row._id }).then(res => {
        this.$notify({
          title: '成功',
          message: res.succMsg,
          type: 'success',
        });
        this.$refs['tablePage'].againGetData();
      });
    },
    openDrawer(row = {}) {
      this.dialog = true;
      this.tips = row._id ? '修改' : '添加';
      this.form = { ...row };
    },
    cancelForm() {
      this.$refs['form'].resetFields();
      this.dialog = false;
    },
    handlForm() {
      let { form } = this;

      this.$refs['form'].validate(valid => {
        if (!valid) return;
        this.$confirm('确定提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
        })
          .then(() => {
            this.loading = true;
            setArticle(form).then(res => {
              this.$notify({
                title: '成功',
                message: res.succMsg,
                type: 'success',
              });
            });
            this.dialog = false;
            this.$nextTick(() => {
              this.$refs['tablePage'].againGetData();
            });
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.demo-drawer__footer {
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 10px;
  .el-button {
    width: 40%;
  }
}
</style>
