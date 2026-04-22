<script>
  import * as echarts from "echarts";
  import { onMount } from "svelte";

  let chartDiv;

  onMount(() => {
    const chart = echarts.init(chartDiv);

    const options = {
      title: {
        text: "Single Chart"
      },
      tooltip: {},
      xAxis: {
        data: ["A", "B", "C", "D", "E"]
      },
      yAxis: {},
      series: [
        {
          name: "Values",
          type: "bar",
          data: [5, 20, 36, 10, 15]
        }
      ]
    };

    chart.setOption(options);

    window.addEventListener("resize", () => chart.resize());
  });
</script>

<h1 class="title">Single Chart</h1>

<div id="chart" bind:this={chartDiv}></div>

<style>
  #chart {
    width: 100%;
    height: 400px;
  }
</style>
