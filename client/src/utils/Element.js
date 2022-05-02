/* 引入 Element 提示组件 */
import Vue from 'vue';
import ElLoading from "element-ui/lib/loading.js";
import "element-ui/packages/theme-chalk/lib/loading.css";
import ElMessageBox from "element-ui/lib/message-box.js";
import "element-ui/packages/theme-chalk/lib/message-box.css";
import ElNotification from "element-ui/lib/notification.js";
import "element-ui/packages/theme-chalk/lib/notification.css";
import ElMessage from "element-ui/lib/message.js";
import "element-ui/packages/theme-chalk/lib/message.css";
Vue.use(ElLoading.directive);
Vue.prototype.$loading = ElLoading.service;
Vue.prototype.$msgbox = ElMessageBox;
Vue.prototype.$alert = ElMessageBox.alert;
Vue.prototype.$confirm = ElMessageBox.confirm;
Vue.prototype.$prompt = ElMessageBox.prompt;
Vue.prototype.$notify = ElNotification;
Vue.prototype.$message = ElMessage;