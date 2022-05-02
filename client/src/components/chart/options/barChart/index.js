/* 条形图 */
// 可以传参，图表所需要配置的属性，如：data数据、图表颜色......等
const Cake = () => {
  const defaultConfig = {
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgb(255, 255, 255)',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '知识点进度',
        type: 'pie',
        center: ['65%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 85, name: 'HTML' },
          { value: 88, name: 'CSS' },
          { value: 82, name: 'JavaScript' },
          { value: 80, name: 'Vue' },
          { value: 67, name: 'jQuery' },
          { value: 60, name: 'Bootstrap' },
          { value: 70, name: 'NodeJs' },
          { value: 69, name: 'Webpack' },
          { value: 31, name: 'TypeScript' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  // 使用 Object.assign() 去给多个属性添加响应式($set添加麻烦)
  const opt = Object.assign({}, defaultConfig);
  return opt;
};

export default { Cake };
