<script>
  import { onMount } from "svelte";
  import * as echarts from "echarts";
  import { sanitize } from "$lib/sanitize.js";

  let mapDiv;
  let chartDiv;
  let chartDiv2;
  let chartDiv3;
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

    // POIs with categories
    const pois = [
      { name: "Coffee Shop", coords: [51.505, -0.09], image: "/coffee.jpg", category: "coffee" },
      { name: "Library", coords: [51.507, -0.088], image: "/library.jpg", category: "library" },
      { name: "Museum", coords: [51.503, -0.091], image: "/museum.jpg", category: "museum" }
    ];

    // Store markers so we can update popups
    const markers = {};

    // Create category layers
    const layers = {
      coffee: L.layerGroup().addTo(map),
      library: L.layerGroup().addTo(map),
      museum: L.layerGroup().addTo(map)
    };

    // GLOBAL delete function for popup button
    window.deletePoiImage = (name) => {
      const poi = pois.find((p) => p.name === name);
      if (!poi) return;

      poi.image = null;

      // Update popup content
      markers[name].setPopupContent(`
        <b>${sanitize(poi.name)}</b><br>
        <button onclick="window.deletePoiImage('${poi.name}')">Delete Image</button>
      `);
    };

    // Add markers to category layers
    pois.forEach((poi) => {
      const marker = L.marker(poi.coords, { draggable: true });

      marker.bindPopup(`
        <b>${sanitize(poi.name)}</b><br>
        ${poi.image ? `<img src="${sanitize(poi.image)}" width="150" style="margin-top:5px;"><br>` : ""}
        <button onclick="window.deletePoiImage('${poi.name}')">Delete Image</button>
      `);

      markers[poi.name] = marker;
      layers[poi.category].addLayer(marker);
    });

    // Layer control
    L.control
      .layers(null, {
        "Coffee Shops": layers.coffee,
        Libraries: layers.library,
        Museums: layers.museum
      })
      .addTo(map);

    // -----------------------------
    // CHART 1 — BAR CHART
    // -----------------------------
    const chart1 = echarts.init(chartDiv);

    chart1.setOption({
      title: { text: sanitize("Bar Chart") },
      tooltip: {},
      xAxis: { data: ["A", "B", "C", "D", "E"].map(sanitize) },
      yAxis: {},
      series: [
        {
          name: sanitize("Values"),
          type: "bar",
          data: [5, 20, 36, 10, 15]
        }
      ]
    });

    // -----------------------------
    // CHART 2 — LINE CHART
    // -----------------------------
    const chart2 = echarts.init(chartDiv2);

    chart2.setOption({
      title: { text: sanitize("Line Chart") },
      tooltip: {},
      xAxis: { data: ["A", "B", "C", "D", "E"].map(sanitize) },
      yAxis: {},
      series: [
        {
          name: sanitize("Trend"),
          type: "line",
          data: [10, 15, 8, 20, 12]
        }
      ]
    });

    // -----------------------------
    // CHART 3 — PIE CHART
    // -----------------------------
    const chart3 = echarts.init(chartDiv3);

    chart3.setOption({
      title: { text: sanitize("Pie Chart") },
      tooltip: {},
      series: [
        {
          name: sanitize("Categories"),
          type: "pie",
          radius: "60%",
          data: [
            { value: 10, name: sanitize("A") },
            { value: 20, name: sanitize("B") },
            { value: 30, name: sanitize("C") },
            { value: 40, name: sanitize("D") }
          ]
        }
      ]
    });

    // Resize all charts
    window.addEventListener("resize", () => {
      chart1.resize();
      chart2.resize();
      chart3.resize();
    });
  });
</script>

<div class="container">
  <div class="left" bind:this={mapDiv}></div>

  <div class="right">
    <div id="chart" bind:this={chartDiv}></div>
    <div id="chart2" bind:this={chartDiv2}></div>
    <div id="chart3" bind:this={chartDiv3}></div>
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
    overflow-y: auto;
  }

  #chart,
  #chart2,
  #chart3 {
    width: 100%;
    height: 300px;
    margin-bottom: 20px;
  }
</style>
