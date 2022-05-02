<template>
  <el-row type="flex" class="content" justify="space-around" align="middle">
    <el-col :span="12"><img src="../../../assets/img/reg.png" alt="" /></el-col>
    <el-col :span="8">
      <h1 class="animate__animated animate__backInDown animate__delay-0.8s">
        请先注册哦！
      </h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="ruleForm"
        size="small"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model.number="ruleForm.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input
            v-model.number="ruleForm.email"
            :maxlength="20"
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
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            show-password
            autocomplete="off"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-thumb"
            @click="register(ruleForm)"
            round
            >注册</el-button
          >
          <el-button
            type="info"
            size="mini"
            icon="el-icon-link"
            round
            @click="GoLogin"
            >Back - 登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import { getRegister } from '@/api';
export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      }
      callback();
    };
    const validatename = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      callback();
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validateCheckPass = (rule, value, callback) => {
      if (value === '' && this.ruleForm.password !== '') {
        callback(new Error('请再次输入密码'));
      }
      if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      }
      callback();
    };
    return {
      ruleForm: {
        name: '',
        password: '',
        email: '',
        checkPass: '',
      },
      rules: {
        name: [
          { validator: validatename, trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9_-]{3,12}$/,
            trigger: 'blur',
            message: '请输入 3 - 12 长度包含字母、数字、下划线、减号的用户名',
          },
        ],
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
        checkPass: [{ validator: validateCheckPass, trigger: 'blur' }],
      },
    };
  },
  methods: {
    GoLogin() {
      this.$router.push('/verify/login');
    },
    register(ruleForm) {
      this.$refs.ruleForm
        .validate()
        .then(() => {
          this.$loading({ fullscreen: true });
          getRegister(ruleForm)
            .then(res => {
              this.$loading().close();
              this.$notify({
                title: '成功',
                message: res.succMsg,
                type: 'success',
              });
              this.GoLogin();
            })
            .catch(() => {
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
