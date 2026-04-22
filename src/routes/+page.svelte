<script>
  import { onMount } from "svelte";
  import * as echarts from "echarts";
  import { sanitize } from "$lib/sanitize.js";

  let mapDiv;
  let chartDiv;
  let L;

  onMount(async () => {
    // Load Leaflet dynamically
    const leaflet = await import("leaflet");
    L = leaflet.default;

    // Map
    const map = L.map(mapDiv).setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19
    }).addTo(map);

    // POIs
    const pois = [
      {
        name: "Coffee Shop",
        coords: [51.505, -0.09],
        image: "/coffee.jpg"
      },
      {
        name: "Library",
        coords: [51.507, -0.088],
        image: "/library.jpg"
      },
      {
        name: "Museum",
        coords: [51.503, -0.091],
        image: "/museum.jpg"
      }
    ];

    pois.forEach((poi) => {
      L.marker(poi.coords, { draggable: true }).addTo(map).bindPopup(`
      <b>${sanitize(poi.name)}</b><br>
      <img src="${sanitize(poi.image)}" width="150" style="margin-top:5px;">
    `);
    });

    // ECharts
    const chart = echarts.init(chartDiv);

    const options = {
      title: { text: "Single Chart" },
      tooltip: {},
      xAxis: { data: ["A", "B", "C", "D", "E"] },
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

<div class="container">
  <div class="left" bind:this={mapDiv}></div>
  <div class="right">
    <div id="chart" bind:this={chartDiv}></div>
  </div>
</div>

<style>
  .container {
    display: flex;
    height: 100vh;
    width: 100vw;
  }
  .left {
    flex: 1;
  }
  .right {
    flex: 1;
    padding: 20px;
  }
  #chart {
    width: 100%;
    height: 100%;
  }
</style>
