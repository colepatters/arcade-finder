<script lang="ts">
  import { mount, onMount } from "svelte";
  import type { PageData } from "./$types";
  import * as mapboxgl from "mapbox-gl";
  import { PUBLIC_MAPBOX_TOKEN } from "$env/static/public";
  import { Locate, MapPinHouse } from "lucide-svelte";
  import YourLocationMarker from "../../components/YourLocationMarker.svelte";

  // TODO fix this vvv
  import "/Users/cjpat/source/arcade-finder/node_modules/mapbox-gl/dist/mapbox-gl.css";
  import { arcades, type Arcade } from "$lib/mock-db";
  import ArcadeMarker from "../../components/ArcadeMarker.svelte";
  import * as mapboxgeo from "@mapbox/search-js-core";
  import { distance } from "$lib/utils";

  let { data }: { data: PageData } = $props();

  let mapContainer: HTMLDivElement;
  let map: mapboxgl.Map | null = null;
  let deviceLocationMarkerPlaced = false;

  let geocode: mapboxgeo.GeocodingCore | null = null;

  onMount(() => {
    geocode = new mapboxgeo.GeocodingCore({
      accessToken: PUBLIC_MAPBOX_TOKEN,
    });

    map = new mapboxgl.Map({
      container: mapContainer,
      accessToken: PUBLIC_MAPBOX_TOKEN,
      zoom: 3.5,
      center: { lat: 39.1136101, lon: -98.7380103 },
    });

    updateVisibleEntries();

    map.on("dragend", updateVisibleEntries);
    map.on("zoomend", updateVisibleEntries);
    map.on("moveend", updateVisibleEntries);

    map.on("click", (event) => {
      console.log(`mouse clicked at ${event.lngLat}`);
    });

    for (const arcade of Object.values(arcades)) {
      const markerTarget = document.createElement("div");
      mount(ArcadeMarker, {
        target: markerTarget,
        props: {
          onclick: () => console.log(`clicked on ${arcade.name}`),
        },
      });
      const marker = new mapboxgl.Marker({
        element: markerTarget,
      });
      marker.setLngLat(arcade);
      marker.addTo(map);
    }
  });

  function setUSView() {
    map?.setCenter({ lat: 39.1136101, lon: -98.7380103 });
    map?.setZoom(3.5);
  }

  function getDeviceLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        map?.setCenter({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        map?.setZoom(10);

        if (!deviceLocationMarkerPlaced) {
          const div = document.createElement("div");
          mount(YourLocationMarker, { target: div });
          const marker = new mapboxgl.Marker({
            element: div,
          });
          marker.setLngLat({
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          });
          marker.addTo(map);
          deviceLocationMarkerPlaced = true;
        }

        return position;
      },
      () => {
        alert("Geolocation permission denied. Refresh the page to try again!");
      }
    );
  }

  let goToAddressInputValue = $state("");
  let goToAddressFeatures: mapboxgeo.GeocodeFeature[] = $state([]);
  async function goToAddress(address: string) {
    const res = await geocode?.forward(address);
    if (res) {
      goToAddressFeatures = res.features;
    }
  }

  let visibleEntries: Arcade[] = $state([]);
  function updateVisibleEntries() {
    const bounds = map?.getBounds();
    console.log(bounds);
    visibleEntries = Object.values(arcades)
      .filter((entry) => {
        return (
          entry.lat > bounds?.getSouth() &&
          entry.lat < bounds?.getNorth() &&
          entry.lon > bounds?.getWest() &&
          entry.lon < bounds?.getEast()
        );
      })
      .toSorted((a, b) => {
        const mapCenter = map!.getCenter();
        return (
          distance(mapCenter.lng, mapCenter.lat, a.lon, a.lat) -
          distance(mapCenter.lng, mapCenter.lat, b.lon, b.lat)
        );
      });
    console.log("visible entries updated.");
  }
</script>

<h2 class="h2">Arcades</h2>
<div
  id="map-container"
  bind:this={mapContainer}
  style="height: 500px; margin-top: 10px;"
></div>

<div style="margin-top: 10px; display: flex; align-items: center; gap: 5px;">
  <button class="btn preset-filled" onclick={getDeviceLocation}
    ><Locate /></button
  >
  <button class="btn preset-filled" onclick={setUSView}>US View</button>
</div>

<h3 class="h3">Visible Entries</h3>
<div style="display: flex; flex-direction: column; gap: 5px;">
  {#each visibleEntries as entry}
    <button class="btn preset-filled">{entry.name}</button>
  {/each}
</div>

<h4 class="h4" style="margin-top: 10px;">Map Debugging Tools</h4>
<form
  style="display: flex; flex-direction: column; gap: 5px;"
  onsubmit={(e) => {
    e.preventDefault();
    goToAddress(goToAddressInputValue);
  }}
>
  <h5 class="h5">Go to Address</h5>
  <label class="label">
    <span class="label-text">Address</span>
    <input
      class="input"
      type="text"
      placeholder="Input"
      required
      bind:value={goToAddressInputValue}
    />
  </label>
  <button class="btn preset-filled">Search</button>

  {#if goToAddressFeatures.length > 0}
    <h6 class="h6">Results</h6>
    {#each goToAddressFeatures as feature}
      <button
        type="button"
        class="btn btn-sm preset-filled"
        onclick={() =>
          map?.setCenter({
            lat: feature.properties.coordinates.latitude,
            lon: feature.properties.coordinates.longitude,
          })}>{feature.properties.full_address}</button
      >
    {/each}
  {/if}
</form>
