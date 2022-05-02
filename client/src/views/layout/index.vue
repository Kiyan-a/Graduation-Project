<template>
  <el-container class="view">
    <el-header>
      <layHead />
    </el-header>
    <el-container>
      <el-aside width="auto" :class="{ coll: isCollapse }">
        <el-menu
          :default-active="activePath.path"
          class="el-menu-vertical-demo"
          router
          active-text-color="#185ce5"
          :collapse="isCollapse"
        >
          <el-menu-item
            v-for="(item, key) in routes"
            :index="item.path"
            :key="key"
          >
            <svg-icon :name="item.meta.icon" />
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="Aview">
          <transition name="el-zoom-in-bottom" mode="out-in"
            ><router-view></router-view>
          </transition>
        </div>
      </el-main>
    </el-container>
    <div @click="isCollapse = isCollapse ? false : true" class="collapse">
      <svg-icon name="control-centre" />
    </div>
  </el-container>
</template>

<script>
import R from '@/router/routes.js';
import 'animate.css';
import layHead from './layHead.vue';
export default {
  components: {
    layHead,
  },
  data() {
    return {
      routes: R,
      detailTit: [],
      activePath: null,
      isCollapse: false,
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        this.activePath = val;
        let titMap = this.detailTit
          .map(item => {
            return item.path;
          })
          .includes(val.path);
        if (!titMap && val.path !== '/main/index') {
          this.detailTit.push(val);
        }
      },
    },
  },
};
</script>

<style <style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
}
.el-menu--collapse {
  width: 75px;
}
.el-menu-item {
  display: flex;
  margin: 8px 8px;
  align-items: center;
  border-radius: 30px;
  overflow: hidden;
  span {
    margin-left: 10px;
  }
  &:hover {
    background-color: #ecf5ff;
  }
  &.is-active {
    background-color: #ecf5ff;
  }
}
.el-container {
  height: 100vh - 60px;
}
.view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .el-header {
    padding: 0;
  }
  .el-aside {
    border-radius: 10px;
    .el-menu {
      height: 100%;
    }
  }
  .el-main {
    .Aview {
      overflow: hidden;
    }
  }
  .collapse {
    position: fixed;
    bottom: 13px;
    left: 13px;
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
}
</style>
