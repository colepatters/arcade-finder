<script lang="ts">
  import MapboxMap from "./MapboxMap.svelte";
  import * as mapboxgl from "mapbox-gl";

  let { onFinish }: { onFinish?: () => void } = $props();

  function handleMapClick(event: mapboxgl.MapMouseEvent) {
    console.log("Map clicked");
  }
</script>

<div id="select-marker-location-modal">
  <div id="select-marker-location-modal-background"></div>
  <div id="select-marker-location-modal-content">
    <h4 class="h4">Select Marker Location</h4>
    <div></div>
    <MapboxMap onclick={handleMapClick} />
  </div>
</div>

<style>
  #select-marker-location-modal {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #select-marker-location-modal-background {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    width: 100%;
    height: 100%;

    color: gray;
    /* opacity: 50%; */
  }

  #select-marker-location-modal-content {
    width: 50%;
    height: 50%;

    display: flex;

    justify-content: center;
  }
</style>
