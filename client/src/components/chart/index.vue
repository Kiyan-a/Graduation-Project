<template>
  <!-- 图表单文件组件，供界面调用 -->
  <div ref="chart" :style="{ height: height, width: width }" />
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import {
  BarChart,
  LineChart,
  GraphChart,
  SunburstChart,
  GaugeChart,
  PieChart,
} from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  GraphChart,
  SunburstChart,
  GaugeChart,
  PieChart,
]);
export default {
  name: 'ChartView',
  data() {
    return {
      chart: null,
    };
  },
  // 接收自定义配置
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '350px',
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartOption: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: 'canvas',
    },
  },
  watch: {
    /**
     * @method: 监听配置项的变化重新改变
     */
    chartOption: {
      deep: true,
      handler(newVal) {
        // 调 setOption
        this.setOption(newVal);
      },
    },
  },
  mounted() {
    this.initChart();
    if (this.autoResize) {
      // 窗口大小改变之后就会触发resize事件
      window.addEventListener('resize', this.resizeHandler);
    }
  },
  methods: {
    /**
     * @method: 初始化图表
     */
    initChart() {
      this.chart = echarts.init(this.$refs.chart, null, {
        // 渲染模式
        renderer: this.type,
      });
      this.chart.setOption(this.chartOption);
      this.chart.on('click', this.handleClick);
    },
    /**
     * @method: 响应容器大小的变化
     */
    resizeHandler() {
      this.chart.resize();
    },
    handleClick(params) {
      this.$emit('click', params);
    },
    /**
     * @method: 配置项重新设置
     */
    setOption(opt) {
      this.clearChart();
      this.resizeHandler();
      this.chart.setOption(opt);
    },
    /**
     * @method: 清空当前实例，会移除实例中所有的组件和图表
     */
    clearChart() {
      this.chart && this.chart.clear();
    },
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    this.chart.dispose();
    this.chart = null;
  },
};
</script>

<style></style>
