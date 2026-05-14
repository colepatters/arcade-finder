<script lang="ts">
  import * as mapboxgl from "mapbox-gl";
  import type { MapboxHTMLEvent } from "@mapbox/search-js-web";
  import { onMount } from "svelte";
  import { PUBLIC_MAPBOX_TOKEN } from "$env/static/public";

  // TODO fix this vvv
  import "/Users/cjpat/source/arcade-finder/node_modules/mapbox-gl/dist/mapbox-gl.css";

  let markers: mapboxgl.Marker[] = $state([]);

  let { onclick }: { onclick?: (event: mapboxgl.MapMouseEvent) => void } =
    $props();
  let mapContainerEl: HTMLDivElement | undefined;

  onMount(async () => {
    // import mapbox search after mount since it's a client-side only library
    const { MapboxSearchBox } = await import("@mapbox/search-js-web");

    if (!mapContainerEl) {
      throw new Error("map container element not bound");
    }

    const map = new mapboxgl.Map({
      accessToken: PUBLIC_MAPBOX_TOKEN,
      container: mapContainerEl,
      zoom: 3.5,
      center: { lat: 39.1136101, lon: -98.7380103 },
    });

    const searchBox = new MapboxSearchBox();
    searchBox.accessToken = PUBLIC_MAPBOX_TOKEN;
    searchBox.addEventListener("retrieve", handleSearchResultSelected);
    map.addControl(searchBox);

    map.addControl(new mapboxgl.GeolocateControl());
    map.addControl(new mapboxgl.NavigationControl());

    // dark and light theming
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      map.setStyle("mapbox://styles/mapbox/dark-v11");
    }

    // change color scheme when system does
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        console.log("event listener triggered");
        if (event.matches) map?.setStyle("mapbox://styles/mapbox/dark-v11");
        else map?.setStyle("mapbox://styles/mapbox/light-v11");
      });

    // event listener props
    if (onclick !== undefined) {
      console.log("registering event listeners");
      map.on("click", onclick);
    }
  });

  function handleSearchResultSelected(
    event: MapboxHTMLEvent<SearchBoxRetrieveResponse>
  ) {
    console.log("search result selected:", event);
  }
</script>

<div
  id="map-container"
  style="height: 100%; width: 100%;"
  bind:this={mapContainerEl}
></div>
