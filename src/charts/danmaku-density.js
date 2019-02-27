function formatSeconds(value) {
  var secondTime = parseInt(value); // 秒
  var minuteTime = 0; // 分
  var hourTime = 0; // 小时
  if (secondTime > 60) {
    minuteTime = parseInt(secondTime / 60);
    secondTime = parseInt(secondTime % 60);
    if (minuteTime > 60) {
      hourTime = parseInt(minuteTime / 60);
      minuteTime = parseInt(minuteTime % 60);
    }
  }

  function addZero(val) {
    let r;
    val < 10 ? (r = "0" + String(val)) : (r = String(val));
    return r;
  }

  var result = "" + addZero(secondTime) + "";

  if (minuteTime >= 0) {
    result = "" + addZero(minuteTime) + ":" + result;
  }
  if (hourTime > 0) {
    result = "" + addZero(hourTime) + "" + result;
  }
  return result;
}

function drawChart(data, duration) {
  var tick = duration / 50;
  var x = [];
  for (let i = 0; i < 50; i++) {
    x.push(formatSeconds(tick * i + 0.5 * tick));
  }
  let Chart = {
    title: {
      left: "center",
      subtext: "弹幕密度变化趋势"
      // text: data.name
    },
    legend: {
      data: ["粉丝增量"],
      bottom: "5px"
    },
    tooltip: {
      trigger: "axis",
      confine: true,
      axisPointer: {
        label: {
          formatter: function(params) {
            return formatSeconds(params.value);
          }
        }
      }
    },
    grid: {
      left: "60px",
      right: "40px"
    },
    xAxis: {
      type: "category",
      data: x,
      axisPointer: {
        label: {
          formatter: function(params) {
            return "时间：" + params.value;
          }
        }
      }
    },
    yAxis: [
      {
        type: "value",
        min: function(value) {
          if (value.min > 0) {
            return 0;
          } else {
            return value.min;
          }
        },
        splitLine: {
          show: true
        }
      }
    ],
    series: [
      {
        name: "弹幕数",
        data: data,
        smooth: true,
        showSymbol: false,
        type: "line",
        areaStyle: {}
      }
    ]
  };
  return Chart;
}
export default drawChart;