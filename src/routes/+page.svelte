<script>
  import { onMount } from "svelte";

  let mapDiv;

  onMount(async () => {
    const leaflet = await import("leaflet");
    const L = leaflet.default;

    const map = L.map(mapDiv).setView([53.3498, -6.2603], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    setTimeout(() => map.invalidateSize(), 200);
  });
</script>

<div class="page">
  <div id="map" bind:this={mapDiv}></div>
</div>

<style>
  .page {
    height: 100%;
    width: 100%;
  }

  #map {
    height: 100%;
    width: 100%;
  }
</style>
