/* 移除了 VueX 使用新一代状态管理工具 Pinia */
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一 (用于插件不同的 状态仓库)
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    setUser() {
      let data = localStorage.getItem('UserInfo');
      this.user = data;
    },
  },
});
