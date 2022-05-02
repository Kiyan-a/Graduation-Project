<template>
  <div class="home">
    <TablePage
      :getListData="getListData"
      :searchConfig="searchConfig"
      :columns="columns"
      fieldKey="only - a"
    >
      <template #search-user="{ formModel, formItem }">
        <el-input-number v-model="formModel[formItem]"></el-input-number>
      </template>
      <template #search-status="{ formModel, formItem }">
        <el-date-picker
          v-model="formModel[formItem]"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
      </template>
      <template #search-buttons>
        <el-button size="small" type="primary">主要按钮</el-button>
        <el-button size="small" type="success">成功按钮</el-button>
        <el-button size="small" round type="info">信息按钮</el-button>
      </template>
      <template #table-a="{ table }">
        <el-button size="mini" type="primary" @click="getData(table)"
          >修改</el-button
        >
        <el-button size="mini">删除</el-button>
      </template>
    </TablePage>
    <!-- <tableView
      :getListData="getListData"
      :searchConfig="searchConfig"
      :columns="columns"
      fieldKey="only - a"
    >
      <template #search-user="{ formModel, formItem }">
        <el-input-number v-model="formModel[formItem]"></el-input-number>
      </template>
      <template #search-status="{ formModel, formItem }">
        <el-date-picker
          v-model="formModel[formItem]"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
      </template>
      <template #search-buttons>
        <el-button size="mini" type="primary">主要按钮</el-button>
        <el-button size="mini" type="success">成功按钮</el-button>
        <el-button size="mini" round type="info">信息按钮</el-button>
        <el-button size="mini" round type="warning">警告按钮</el-button>
        <el-button size="mini" round type="danger">危险按钮</el-button>
      </template>
      <template #table-a="{ table }">
        <el-button size="mini" type="primary" @click="getData(table)"
          >修改</el-button
        >
        <el-button size="mini">删除</el-button>
      </template>
    </tableView> -->
  </div>
</template>

<script>
import TablePage from './tablePage.vue';
// import searchView from './searchView.vue';
// import tableView from './tableView.vue';
export default {
  // components: { searchView, tableView, TablePage },
  components: { TablePage },
  data() {
    return {
      searchConfig: {
        inline: true,
        columns: [
          {
            label: '姓名',
            prop: 'name',
          },
          {
            label: '年龄',
            prop: 'age',
          },
          {
            label: '城市',
            prop: 'city',
          },
        ],
      },
      tableData: [
        {
          name: '余霞',
          age: '73',
          hobby: '本观六去半',
          city: '新疆维吾尔自治区 巴音郭楞蒙古自治州',
          phone: '18149951368',
          email: 'a.hnvlnmw@avhydowwk.cd',
        },
        {
          name: '乔强',
          age: '94',
          hobby: '心众山资引给',
          city: '江西省 上饶市',
          phone: '19812648578',
          email: 'f.ctpyufuk@lxbflzejj.sg',
        },
        {
          name: '曾丽',
          age: '30',
          hobby: '原起各传收了',
          city: '上海 上海市',
          phone: '18676572557',
          email: 'r.rdhuekkryc@jwvleuhug.za',
        },
        {
          name: '顾伟',
          age: '92',
          hobby: '程参决',
          city: '天津 天津市',
          phone: '18696661826',
          email: 'k.dapvoy@xngfex.edu',
        },
        {
          name: '顾伟',
          age: '92',
          hobby: '程参决',
          city: '天津 天津市',
          phone: '18696661826',
          email: 'k.dapvoy@xngfex.edu',
        },
        {
          name: '顾伟',
          age: '92',
          hobby: '程参决',
          city: '天津 天津市',
          phone: '18696661826',
          email: 'k.dapvoy@xngfex.edu',
        },
        {
          name: '顾伟',
          age: '92',
          hobby: '程参决',
          city: '天津 天津市',
          phone: '18696661826',
          email: 'k.dapvoy@xngfex.edu',
        },
        {
          name: '顾伟',
          age: '92',
          hobby: '程参决',
          city: '天津 天津市',
          phone: '18696661826',
          email: 'k.dapvoy@xngfex.edu',
        },
        {
          name: '顾伟',
          age: '92',
          hobby: '程参决',
          city: '天津 天津市',
          phone: '18696661826',
          email: 'k.dapvoy@xngfex.edu',
        },
        {
          name: '顾伟',
          age: '92',
          hobby: '程参决',
          city: '天津 天津市',
          phone: '18696661826',
          email: 'k.dapvoy@xngfex.edu',
        },
        {
          name: '顾伟',
          age: '92',
          hobby: '程参决',
          city: '天津 天津市',
          phone: '18696661826',
          email: 'k.dapvoy@xngfex.edu',
        },
        {
          name: '顾伟',
          age: '92',
          hobby: '程参决',
          city: '天津 天津市',
          phone: '18696661826',
          email: 'k.dapvoy@xngfex.edu',
        },
        {
          name: '尹丽',
          age: '73',
          hobby: '真己格场群水精',
          city: '澳门特别行政区 澳门半岛',
          phone: '18668785288',
          email: 'm.drm@crwbolsct.va',
        },
        {
          name: '戴军',
          age: '14',
          hobby: '受构习力持片长',
          city: '辽宁省 沈阳市',
          phone: '18692116115',
          email: 'o.bvxdww@iopcohu.as',
        },
        {
          name: '戴军',
          age: '14',
          hobby: '受构习力持片长',
          city: '辽宁省 沈阳市',
          phone: '18692116115',
          email: 'o.bvxdww@iopcohu.as',
        },
        {
          name: '戴军',
          age: '14',
          hobby: '受构习力持片长',
          city: '辽宁省 沈阳市',
          phone: '18692116115',
          email: 'o.bvxdww@iopcohu.as',
        },
        {
          name: '戴军',
          age: '14',
          hobby: '受构习力持片长',
          city: '辽宁省 沈阳市',
          phone: '18692116115',
          email: 'o.bvxdww@iopcohu.as',
        },
        {
          name: '戴军',
          age: '14',
          hobby: '受构习力持片长',
          city: '辽宁省 沈阳市',
          phone: '18692116115',
          email: 'o.bvxdww@iopcohu.as',
        },
        {
          name: '戴军',
          age: '14',
          hobby: '受构习力持片长',
          city: '辽宁省 沈阳市',
          phone: '18692116115',
          email: 'o.bvxdww@iopcohu.as',
        },
        {
          name: '戴军',
          age: '14',
          hobby: '受构习力持片长',
          city: '辽宁省 沈阳市',
          phone: '18692116115',
          email: 'o.bvxdww@iopcohu.as',
        },
        {
          name: '戴军',
          age: '14',
          hobby: '受构习力持片长',
          city: '辽宁省 沈阳市',
          phone: '18692116115',
          email: 'o.bvxdww@iopcohu.as',
        },
        {
          name: '戴军',
          age: '14',
          hobby: '受构习力持片长',
          city: '辽宁省 沈阳市',
          phone: '18692116115',
          email: 'o.bvxdww@iopcohu.as',
        },
        {
          name: '戴军',
          age: '14',
          hobby: '受构习力持片长',
          city: '辽宁省 沈阳市',
          phone: '18692116115',
          email: 'o.bvxdww@iopcohu.as',
        },
        {
          name: '戴军',
          age: '14',
          hobby: '受构习力持片长',
          city: '辽宁省 沈阳市',
          phone: '18692116115',
          email: 'o.bvxdww@iopcohu.as',
        },
        {
          name: '戴军',
          age: '14',
          hobby: '受构习力持片长',
          city: '辽宁省 沈阳市',
          phone: '18692116115',
          email: 'o.bvxdww@iopcohu.as',
        },
        {
          name: '戴军',
          age: '14',
          hobby: '受构习力持片长',
          city: '辽宁省 沈阳市',
          phone: '18692116115',
          email: 'o.bvxdww@iopcohu.as',
        },
        {
          name: '戴军',
          age: '14',
          hobby: '受构习力持片长',
          city: '辽宁省 沈阳市',
          phone: '18692116115',
          email: 'o.bvxdww@iopcohu.as',
        },
        {
          name: '余霞',
          age: '73',
          hobby: '本观六去半',
          city: '新疆维吾尔自治区 巴音郭楞蒙古自治州',
          phone: '18149951368',
          email: 'a.hnvlnmw@avhydowwk.cd',
        },
        {
          name: '余霞',
          age: '73',
          hobby: '本观六去半',
          city: '新疆维吾尔自治区 巴音郭楞蒙古自治州',
          phone: '18149951368',
          email: 'a.hnvlnmw@avhydowwk.cd',
        },
        {
          name: '余霞',
          age: '73',
          hobby: '本观六去半',
          city: '新疆维吾尔自治区 巴音郭楞蒙古自治州',
          phone: '18149951368',
          email: 'a.hnvlnmw@avhydowwk.cd',
        },
        {
          name: '余霞',
          age: '73',
          hobby: '本观六去半',
          city: '新疆维吾尔自治区 巴音郭楞蒙古自治州',
          phone: '18149951368',
          email: 'a.hnvlnmw@avhydowwk.cd',
        },
        {
          name: '余霞',
          age: '73',
          hobby: '本观六去半',
          city: '新疆维吾尔自治区 巴音郭楞蒙古自治州',
          phone: '18149951368',
          email: 'a.hnvlnmw@avhydowwk.cd',
        },
        {
          name: '余霞',
          age: '73',
          hobby: '本观六去半',
          city: '新疆维吾尔自治区 巴音郭楞蒙古自治州',
          phone: '18149951368',
          email: 'a.hnvlnmw@avhydowwk.cd',
        },
        {
          name: '余霞',
          age: '73',
          hobby: '本观六去半',
          city: '新疆维吾尔自治区 巴音郭楞蒙古自治州',
          phone: '18149951368',
          email: 'a.hnvlnmw@avhydowwk.cd',
        },
      ],
      columns: [
        { label: '姓名', prop: 'name', align: 'center' },
        { label: '年龄', prop: 'age', align: 'center' },
        { label: '爱好', prop: 'hobby', align: 'center' },
        { label: '城市', prop: 'city', align: 'center' },
        { label: '手机号', prop: 'phone', align: 'center' },
        { label: '邮箱', prop: 'email', align: 'left', width: 200 },
        { label: '省份', prop: 'a', align: 'left' },
      ],
    };
  },
  methods: {
    getData(table, row) {
      console.log(table);
    },
    getListData(query) {
      let data = this.tableData;
      for (const item in query) {
        if (!['pageNum', 'pageSize'].includes(item)) {
          data = this.tableData.filter(i => i[item].includes(query[item]));
        }
      }
      let { pageNum, pageSize } = query;
      return Promise.resolve({
        list: data.slice(
          (pageNum - 1) * pageSize,
          pageSize + (pageNum - 1) * pageSize
        ),
        total: data.length,
      });
    },
  },
};
</script>

<style></style>
