<template>
  <div class="user">
    <div class="info">
      <div class="avatar">
        <img :src="user.avatar" alt="" />
      </div>
      <transition mode="out-in">
        <div class="right" v-if="!change">
          <div>
            <el-tag><i class="el-icon-s-custom"></i> 用 户</el-tag>
            {{ user.name }}
          </div>
          <el-tag><i class="el-icon-s-platform"></i> 邮 箱</el-tag>
          {{ user.email }}
          <el-input
            type="textarea"
            placeholder="请输入简介内容...(该功能尚未开放)"
            v-model="textarea"
            maxlength="30"
            :autosize="{ minRows: 3, maxRows: 3 }"
            show-word-limit
            disabled
          ></el-input>
        </div>
      </transition>
      <transition mode="out-in">
        <div class="right" v-if="change">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="旧的密码" prop="oldPass">
              <el-input
                size="mini"
                type="password"
                v-model="ruleForm.oldPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="新的密码" prop="newPass">
              <el-input
                size="mini"
                type="password"
                v-model="ruleForm.newPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                size="mini"
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="简介内容" prop="content">
              <el-input
                type="textarea"
                placeholder="请输入简介内容...(该功能尚未开放)"
                v-model="ruleForm.content"
                maxlength="30"
                :autosize="{ minRows: 3, maxRows: 3 }"
                show-word-limit
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" round type="primary" @click="handlChange"
                >提交</el-button
              >
              <el-button size="mini" round @click="ruleForm = {}"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </transition>
      <el-button
        class="butt"
        type="primary"
        size="default"
        @click="change = !change"
      >
        {{ change ? '取消' : '修改' }}</el-button
      >
    </div>
  </div>
</template>

<script>
import { setInformation } from '@/api';
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      }
      if (value !== this.ruleForm.newPass) {
        callback(new Error('两次输入密码不一致!'));
      }

      callback();
    };
    return {
      change: false,
      textarea: '',
      user: {},
      ruleForm: {
        oldPass: '',
        newPass: '',
        checkPass: '',
        content: '',
      },
      rules: {
        oldPass: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: '密码至少包含 数字和英文，长度6-20!',
            trigger: 'blur',
          },
        ],
        newPass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: '密码至少包含 数字和英文，长度6-20!',
            trigger: 'blur',
          },
        ],
        checkPass: [{ validator: validatePass, trigger: 'blur' }],
      },
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('UserInfo'));
  },
  methods: {
    handlChange() {
      let query = { _id: this.user.id, ...this.ruleForm };
      this.$refs.ruleForm.validate().then(() => {
        this.$loading({ fullscreen: true });
        setInformation(query)
          .then(res => {
            console.log(res);
            this.$notify({
              title: '成功',
              message: res.succMsg,
              type: 'success',
            });
            localStorage.removeItem('Utoken');
            this.$router.push('/verify/login');
          })
          .finally(() => {
            this.$loading().close();
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 110px);
  .info {
    width: 50vw;
    height: 55vh;
    border-radius: 50px;
    background: linear-gradient(145deg, #f0f0f0, #f7f5f5);
    box-shadow: 20px 20px 40px #b3b3b3, -20px -20px 40px #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    .right {
      font-size: 23px;
      &:first-child div {
        font-family: myFont;
        font-weight: bold;
      }
    }
    .avatar {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1000;
      width: 150px;
      height: 150px;
      border-radius: 10px;
      background: linear-gradient(145deg, #cacaca, #f0f0f0);
      box-shadow: 20px 20px 40px #b3b3b3, -20px -20px 40px #ffffff;
      overflow: hidden;
      img {
        width: 100%;
        opacity: 0.9;
      }
    }
  }
}
.el-button.butt {
  position: absolute;
  right: -50px;
  &:hover {
    right: 0;
  }
}

.v-enter {
  transform: translateY(100px);
}
.v-enter-active {
  transition: all 1s;
}
.v-enter-to {
  transform: translateY(0px);
}
.v-leave {
  display: none;
  transform: translateY(0px);
}
.v-leave-active {
  transition: all 0.1s;
}
.v-leave-to {
  display: none;
  transform: translateY(-300px);
}
</style>
