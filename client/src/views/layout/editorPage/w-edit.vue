<!-- wangEditor 富文本编辑器,扩展xiumi与135入口菜单按钮 -->
<template>
  <div>
    <!-- 编辑器 -->
    <div ref="editor"></div>
    <template v-if="isDisable">
      <div class="w-e-menu" @click="openEditor('xiumi')">
        <img
          src="@/assets/img/xiumi-connect-icon.png"
          id="custom-button-xiumi"
        />
      </div>
      <div class="w-e-menu" @click="openEditor('135')">
        <img src="@/assets/img/editor-135-icon.png" id="custom-button-135" />
      </div>
    </template>
    <!-- 秀米 135 编辑器iframe -->
    <transition name="el-zoom-in-bottom">
      <el-drawer
        :visible.sync="isOpenDrawer"
        :before-close="closXiumi"
        size="90%"
        :with-header="false"
      >
        <!-- <el-dialog
        v-if="isOpenDrawer"
        :visible.sync="isOpenDrawer"
        width="100%"
        :fullscreen="true"
        :before-close="closXiumi"
        :center="true"
        :modal="false"
      > -->
        <div
          class="xiumi-iframe-wrapper"
          v-if="isOpenDrawer"
          style="height: 100vh"
        >
          <iframe id="xiumi" v-if="isXiumi" src="//xiumi.us/studio/v5#/paper" />
          <iframe
            id="editor135"
            v-else
            src="//www.135editor.com/simple_editor.html?callback=true&appkey="
          ></iframe>
        </div>
        <el-dialog
          title="关闭编辑器"
          append-to-body
          :visible.sync="exportContent"
          width="40%"
          custom-class="dialog-exportContent-title"
        >
          <p>
            即将关闭编辑器，内容会默认追加到编辑器中，未保存的文稿可能会丢失，是否继续？
          </p>
          <el-switch
            v-model="coverContent"
            active-text="覆盖全部内容"
            inactive-text="追加内容"
            active-color="#13ce66"
            inactive-color="#409eff"
          >
            ></el-switch
          >
          <div slot="footer" class="dialog-footer">
            <el-button @click="exportContent = false" size="small"
              >取 消</el-button
            >
            <el-button type="primary" @click="exportData" size="small"
              >确 定</el-button
            >
          </div>
        </el-dialog>
        <!-- </el-dialog> -->
      </el-drawer>
    </transition>
  </div>
</template>

<script>
import E from 'wangeditor';
const xiumi_url = 'https://xiumi.us';
const beautify_url = window.location.protocol + '//135editor.com';
export default {
  name: 'wangEditor',
  data() {
    return {
      editor: null,
      editorData: '',
      loading: true,
      isOpenDrawer: false,
      // 导出数据前确认框
      exportContent: false,
      coverContent: false,
      isXiumi: true,
    };
  },
  watch: {
    value: {
      handler(val) {
        this.editor.txt.html(val);
      },
    },
  },
  props: {
    // 传递过来的数据
    value: {
      type: String,
      default: '<h1  style="text-align:center;">请输入标题</h1>',
    },
    // 禁用编辑器
    isDisable: {
      type: Boolean,
      default: true,
    },
    height: {
      type: Number,
      default: 550,
    },
  },
  mounted() {
    const editor = new E(this.$refs.editor);
    const { BtnMenu } = E;
    // 扩展菜单
    class InsertXiumiMenu extends BtnMenu {
      constructor(editor) {
        const $elem = E.$(`.w-e-menu`);
        super($elem, editor);
      }
      // 必须属性
      tryChangeActive() {}
    }
    // 关闭粘贴样式的过滤
    editor.config.pasteFilterStyle = false;
    // if (this.isDisable) {
    // 注册 xiumi 菜单
    editor.menus.extend('InsertMenu', InsertXiumiMenu);
    editor.config.menus = editor.config.menus.concat('InsertMenu');
    editor.config.placeholder =
      '如果是展示在公众号或小程序的文本内容，推荐编辑器右上角的秀米或135编辑入口，编辑器有更丰富的排版功能';
    // }
    editor.config.onchange = newHtml => {
      this.$emit('update:value', newHtml);
    };
    editor.config.height = this.height;
    editor.config.zIndex = 500;
    editor.config.colors = [
      '#0a0a0a',
      '#808080',
      '#c0c0c0',
      '#f1f1f1',
      '#008000',
      '#808000',
      '#00ff00',
      '#ffcc00',
      '#000080',
      '#0000ff',
      '#00ffff',
      '#008080',
      '#880000',
      '#ff0000',
      '#800080',
      '#ff00ff',
    ];
    editor.create();
    if (!this.isDisable) {
      editor.disable();
    }
    // 数据填充到编辑器中
    editor.txt.html(this.value);
    this.editor = editor;
  },
  methods: {
    /**
     * @method: 打开 iframe 编辑器
     * @param: { String } 'xiumi'  '135'
     */
    openEditor(val) {
      this.isOpenDrawer = true;
      (val !== 'xiumi' ? this.on135 : this.onXiumi)();
    },
    on135() {
      this.isXiumi = false;
      this.$nextTick(() => {
        let editor135 = document.getElementById('editor135');
        editor135.onload = function () {
          editor135.contentWindow.postMessage('ready', beautify_url);
        };
        window.addEventListener('message', this.htmlFormEditor, false);
      });
    },
    onXiumi() {
      this.isXiumi = true;
      this.$nextTick(() => {
        let xiumi = document.getElementById('xiumi');
        xiumi.onload = function () {
          xiumi.contentWindow.postMessage('XIUMI:3rdEditor:Connect', xiumi_url);
        };
        window.addEventListener('message', this.htmlFormEditor, false);
      });
    },
    // 拿到xiumi 135编辑器数据
    htmlFormEditor(event) {
      if (event.origin == xiumi_url) {
        this.exportContent = true;
        this.editDataHtml = event.data;
        return;
      }
      if (
        event.origin == 'http://www.135editor.com' &&
        typeof event.data !== 'object'
      ) {
        this.exportContent = true;
        this.editDataHtml = event.data;
      }
    },
    /*
     *@method: 关闭 xiumi 导出数据模板
     */
    exportData() {
      // 是否覆盖
      if (this.coverContent) {
        this.$emit('update:value', this.editDataHtml);
      } else {
        this.$emit('update:value', this.value + this.editDataHtml);
      }
      this.exportContent = false;
      this.isOpenDrawer = false;
      this.editor.txt.html(this.value);
      window.removeEventListener('message', this.htmlFormEditor, false);
    },
    /*
     *@method: 关闭 xiumi
     *@param: {Function} done 用于关闭
     */
    closXiumi(done) {
      this.$confirm(
        '即将关闭编辑器未保存的文稿可能会丢失，是否继续？',
        '关闭编辑器',
        {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning',
        }
      ).then(() => {
        done();
        this.isOpenDrawer = false;
        window.removeEventListener('message', this.htmlFormEditor, false);
      });
    },
  },
  beforeDestroy() {
    this.editor.destroy();
    this.editor = null;
  },
};
</script>
<style lang="less" scoped>
#custom-button-xiumi,
#custom-button-135 {
  height: 16px;
  width: 16px;
}
.xiumi-iframe-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
  box-sizing: border-box;
}
/deep/ .el-dialog__body {
  padding: 0 20px;
  color: #2e2f30;
  font-size: 15px;
  word-break: break-all;
  p {
    margin-bottom: 8px;
  }
}
</style>
