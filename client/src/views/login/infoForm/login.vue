<template>
  <el-row type="flex" class="content" justify="space-around" align="middle">
    <el-col :span="12"
      ><img src="../../../assets/img/login.png" alt=""
    /></el-col>
    <el-col :span="8">
      <h1 class="animate__animated animate__backInDown animate__delay-0.8s">
        欢迎登录！
      </h1>

      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="ruleForm"
      >
        <el-form-item label="Email" prop="email">
          <el-input
            v-model.number="ruleForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-thumb"
            round
            @click="login(ruleForm)"
            >登录</el-button
          >
          <el-button
            type="info"
            size="mini"
            icon="el-icon-link"
            round
            @click="GoRegister"
            >GO - 注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
/* 解析 token 得到用户信息 */
import jwt_decode from 'jwt-decode';
import { getLogin } from '@/api';
export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      }
      callback();
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      callback();
    };
    return {
      ruleForm: {
        password: '',
        email: '',
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: '密码至少包含 数字和英文，长度6-20!',
            trigger: 'blur',
          },
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' },
          {
            pattern:
              /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '请输入正确的邮箱格式!',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    GoRegister() {
      this.$router.push('/verify/register');
    },
    // 登录
    login(ruleForm) {
      this.$refs.ruleForm
        .validate()
        .then(() => {
          this.$loading({ fullscreen: true });
          getLogin(ruleForm)
            .then(res => {
              /* 解析 token */
              // console.log(decode);
              let token = res.data.token;
              console.log(res);
              let decode = JSON.stringify(jwt_decode(token.split(' ')[1]));
              localStorage.setItem('Utoken', token);
              localStorage.setItem('UserInfo', decode);

              this.$notify({
                title: '成功',
                message: res.succMsg,
                type: 'success',
              });
              this.$router.push('/main');
              this.$loading().close();
            })
            .finish(() => {
              console.log('登录失效尝试刷新一下！');
              this.$loading().close();
            });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  width: 70%;
  height: 70%;
  border-radius: 15px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  box-shadow: 10px 10px 15px 0 rgba(255, 255, 255, 0.15);
  img {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
