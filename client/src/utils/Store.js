export const store = {
  state: {
    user: {},
  },
  // 获取 user 数据
  setUser() {
    let UserInfo = JSON.parse(localStorage.getItem('UserInfo'));
    this.state.user = UserInfo;
  },
  // 清楚 user 数据
  removeUser() {
    this.state.user = null;
  },
};

console.log(store);
