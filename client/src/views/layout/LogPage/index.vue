<template>
  <div style="margin: 0 0 0 10px">
    <el-timeline>
      <el-timeline-item
        v-for="item in logList"
        :key="item.date"
        :timestamp="item.date"
        placement="top"
        :color="item.color"
        :icon="item.icon"
      >
        <el-card>
          <h4>
            {{ item.content }}
          </h4>
          <p>{{ item.time }}</p>
          <el-link
            v-if="item.address"
            :href="item.address"
            icon="el-icon-paperclip"
            :underline="false"
            type="success"
            ><h4>项目地址</h4></el-link
          >
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logList: [
        {
          date: '2022-05-02',
          content: '项目完成',
          icon: 'el-icon-s-flag',
          time: '李雨锋 提交于 2022-05-02 12:00',
          color: '#3390ff',
          address: 'https://github.com/Kiyan-a/Node_Service',
        },
        {
          date: '2022-05-02',
          content: '版本最后的测试',
          time: '李雨锋 提交于 2022-05-02 09:10',
          color: '#3390ff',
        },
        {
          date: '2022-05-01',
          content: '对后台接口进行调整，添加新的接口，并提交到github仓库',
          time: '李雨锋 提交于 2022-05-01 23:10',
          color: '#3390ff',
          address: 'https://github.com/Kiyan-a/Node_Service',
        },
        {
          date: '2022-04-28',
          content: '增加用户重置密码功能，用户简介内容尚未开放',
          time: '李雨锋 提交于 2022-04-28 14:10',
          color: '#3390ff',
        },
        {
          date: '2022-04-27',
          content:
            '优化项目相关功能，增强用户体验，提升项目性能，修复亿点点Bug',
          time: '李雨锋 提交于 2022-04-27 09:10',
          color: '#3390ff',
        },
        {
          date: '2022-04-26',
          content: '优化项目结构，规范开发',
          time: '李雨锋 提交于 2022-04-26 22:10',
          color: '#3390ff',
        },
        {
          date: '2022-04-25',
          content: '项目新版本_V1.8.0 测试中',
          time: '李雨锋 提交于 2022-04-25 22:10',
          color: '#3390ff',
          icon: 'el-icon-loading',
        },
        {
          date: '2022-04-20',
          content: '发布npm包 w-edit-u 富文本编辑器组件_V1.0.0',
          time: '李雨锋 提交于 2022-04-20 17:10',
          color: '#3390ff',
          address:
            'https://kiyan-a.github.io/sev/blog/w-edit-u%20%E7%BB%84%E4%BB%B6',
        },
        {
          date: '2022-04-18',
          content: '发布npm包 tab-u 表格组件_V1.0.0',
          time: '李雨锋 提交于 2022-04-18 11:00',
          color: '#3390ff',
          address: 'https://kiyan-a.github.io/sev/blog/tab-u%E7%BB%84%E4%BB%B6',
        },
        {
          date: '2022-04-10',
          content: '发布个人博客',
          time: '李雨锋 提交于 2022-04-10 21:00',
          color: '#3390ff',
          icon: 'el-icon-user-solid',
          address: 'https://kiyan-a.github.io/sev/',
        },
        {
          date: '2022-03-21',
          content: '更换项目打包构建工具 ( Webpack -> Vite )',
          time: '李雨锋 提交于 2022-03-21 11:00',
          color: '#3390ff',
          icon: 'el-icon-help',
        },
        {
          date: '2022-03-20',
          content: 'V1.0.0版本升级重构文档撰写',
          time: '李雨锋 提交于 2022-03-20 20:30',
          color: '#3390ff',
          icon: 'el-icon-edit',
        },
        {
          date: '2021-09-20',
          content: '后台管理系统_V1.0.0 发布',
          time: '李雨锋 提交于 2021-09-20 11:00',
          address: 'https://github.com/Kiyan-a/node_vueProject',
          color: '#3390ff',
          icon: 'el-icon-document-checked',
        },
        {
          date: '2021-09-13',
          content: '撰写后台数据接口方案',
          time: '李雨锋 提交于 2021-09-13 11:00',
          color: '#3390ff',
        },
        {
          date: '2021-09-12',
          content: '后台管理系统_V1 开发',
          time: '李雨锋 提交于 2021-09-12 19:30',
          color: '#3390ff',
        },
        {
          date: '2021-09-10',
          content: '后台管理系统项目设想初布撰写',
          time: '李雨锋 提交于 2021-09-10 12:30',
          color: '#3390ff',
        },
      ],
    };
  },
};
</script>
