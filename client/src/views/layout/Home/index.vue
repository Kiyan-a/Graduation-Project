<template>
  <div class="home">
    <div class="news" v-loading="loading">
      <div class="head">
        <span></span>
        <h3 style="color: #4d79f3">全国(含港澳台)</h3>
        <p>{{ times }}数据统计</p>
      </div>
      <div class="data">
        <ul>
          <li v-for="item in newsData" :key="item.label">
            <span>{{ item.label }}</span>
            <p :style="{ color: item.color }">{{ item.value || '待公布' }}</p>
            <div v-if="item.compare">
              较昨日<span>{{ item.compare || '待公布' }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <FlipClock class="clock"></FlipClock>
      <chartView
        :chartOption="cakeChart"
        :autoResize="false"
        width="450px"
        height="250px"
      />
    </div>
  </div>
</template>

<script>
// 2022-04-30  axios不支持jsonp请求，所以需要引入 vue-jsonp 插件
import { jsonp } from 'vue-jsonp';
import FlipClock from './components/FlipClock.vue';
import chartView from '@/components/chart/index.vue';
import ChartFn from '@/components/chart/index';
export default {
  components: { FlipClock, chartView },
  data() {
    return {
      loading: false,
      times: '',
      newsData: [
        {
          label: '新增本土确诊',
          color: '#a48256',
        },
        {
          label: '新增确诊',
          color: '#a48256',
        },
        {
          label: '新增境外',
          color: '#c96161',
        },
        {
          label: '新增无症状',
          color: '#ffa200',
        },
        {
          label: '现存本土确诊',
          color: '#b8540e',
        },
        {
          label: '现存确诊',
          color: '#ff353a',
        },
        {
          label: '现存无症状',
          color: '#fe9885',
        },
        {
          label: '现存疑似',
          color: '#a36fff',
        },
        {
          label: '累计确诊',
          color: '#b10000',
          compare: '',
        },
        {
          label: '累计境外输入',
          color: '#fe6b22',
          compare: '',
        },
        {
          label: '累计治愈',
          color: '#13b593',
          compare: '',
        },
        {
          label: '累计死亡',
          color: '#666666',
          compare: '',
        },
      ],
      cakeChart: null,
    };
  },
  created() {
    this.loading = true;
    this.cakeChart = ChartFn.Cake();
    jsonp(
      `https://news.sina.com.cn/project/fymap/ncp2020_full_data.json?_=${new Date().getTime()}&callback=jsoncallback`
    ).then(
      () => {
        // 处不会读取到数据，数据在 window.jsoncallback 中读取
      },
      () => {}
    );
  },
  mounted() {
    let { newsData } = this;
    window.jsoncallback = ({
      data: {
        times,
        localconNum,
        add_daily: {
          addjwsr,
          addcure_new,
          adddeath_new,
          addcon,
          addjwsr_new,
          addsus,
          addcon_new,
        },
        addAsymNum,
        locIncrNum,
        econNum,
        asymptomNum,
        gntotal,
        jwsrNum,
        curetotal,
        deathtotal,
      },
    }) => {
      const statistics = [
        localconNum,
        addcon,
        addjwsr_new,
        addAsymNum,
        locIncrNum,
        econNum,
        asymptomNum,
        addsus,
        gntotal,
        jwsrNum,
        curetotal,
        deathtotal,
      ];
      let compare = [addcon_new, addjwsr, addcure_new, adddeath_new];
      this.newsData = newsData.map((iten, i) => {
        if (i > 7) {
          return {
            ...iten,
            value: statistics[i],
            compare: compare.splice(0, 1)[0],
          };
        }
        return {
          ...iten,
          value: statistics[i],
        };
      });

      this.times = times;
      this.loading = false;
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: space-between;
  .clock {
    padding: 6px;
    height: 102px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .news {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 6px 8px;
    margin-right: 10px;
    height: 360px;
    .head {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 4px;
        height: 16px;
        border-radius: 2px;
        background-color: #4d79f3;
        margin-right: 6px;
      }
      p {
        color: #777777;
        font-size: 13px;
        margin: 6px 0 0 6px;
      }
    }
    .data {
      ul {
        display: flex;
        justify-content: space-between;
        align-content: space-around;
        flex-wrap: wrap;
        li {
          width: 200px;
          height: 103px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom: 17px;
          font-size: 14px;
          p {
            font-weight: bold;
            font-size: 30px;
          }
          div {
            color: #999999;
            font-size: 13px;
            span {
              font-weight: bold;
              margin-left: 2px;
              color: #666666;
            }
          }
        }
      }
    }
  }
}
</style>
