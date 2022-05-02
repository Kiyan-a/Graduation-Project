<template>
  <div class="head">
    <div class="grid-content">
      <div class="login"></div>
      <h1 class="title">后台管理系统</h1>
      <!-- <div class="user">
        <img :src="user.avatar" width="34px"  height="34px"/>
        <span>{{ user.name }}</span>
      </div> -->
    </div>

    <el-dropdown trigger="click">
      <span><svg-icon name="flower" /></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          ><div @click="outLogin">
            <i class="el-icon-switch-button"></i> 退出账号
          </div></el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import svgIcon from '../../components/svgIcon.vue';
export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('UserInfo'));
  },
  components: { svgIcon },
  methods: {
    outLogin() {
      this.$confirm('确定退出账号吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          localStorage.removeItem('Utoken');
          this.$router.push('/verify/login');
          this.$notify({
            title: '成功',
            message: '账号已退出',
            type: 'success',
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.head {
  position: relative;
  z-index: 999;
  height: 100%;
  display: flex;
  padding: 0 17px;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(120deg, #5d98fc 0%, #98befc 100%);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.24);
  .grid-content {
    display: flex;
    align-items: center;
    color: #ffffff;
    .title {
      font-family: myFont;
    }
    .login {
      width: 40px;
      height: 40px;
      margin: 0 16px 0 10px;
      background: url(/favicon.svg) no-repeat center;
    }
  }
  .user {
    display: flex;
    align-items: center;
    padding: 3px 70px;
    font-weight: bold;
    img {
      margin-right: 7px;
      border-radius: 50%;
      border: 2px solid #ffffff;
      background: #77a9fc;
      // box-shadow: inset 20px 20px 60px #6590d6, inset -20px -20px 60px #89c2ff;
    }
  }
}
.el-dropdown {
  font-size: 21px;
  width: 35px;
  height: 35px;
  padding: 2px 1px 0 0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebecf0;
  box-shadow: 5px 5px 10px rgba(121, 130, 160, 0.55),
    -2px -2px 4px rgba(255, 255, 255, 0.3);
  cursor: pointer;
  &:active {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0),
      inset 5px 5px 10px rgba(121, 130, 160, 0.55),
      inset -5px -5px 10px rgb(255, 255, 255);
    transition: box-shadow 50ms ease-out;
  }
}
</style>
