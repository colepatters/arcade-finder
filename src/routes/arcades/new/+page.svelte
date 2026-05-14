<script lang="ts">
  import MapboxMap from "../../../components/MapboxMap.svelte";
  import SelectMarkerLocationModal from "../../../components/SelectMarkerLocationModal.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<h2 class="h2">Add</h2>

<form>
  <div style="display: flex; gap: 10px;">
    <label class="label">
      <span class="label-text">Name</span>
      <input class="input" type="text" name="name" placeholder="Name" />
    </label>
    <label class="label">
      <span class="label-text">Street Address</span>
      <input
        class="input"
        type="text"
        name="address"
        placeholder="Street Address"
      />
    </label>
  </div>
  <h4 class="h4">Place Marker Pin</h4>
  <div style="height: 400px;">
    <MapboxMap />
  </div>
</form>

<SelectMarkerLocationModal />
