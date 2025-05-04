<script lang="ts">
  import { MapPin } from "lucide-svelte";

  let { onclick = () => {} }: { onclick: () => void } = $props();
</script>

<div {onclick}>
  <MapPin size="36" color="#000000" fill="#ffffff" />
</div>
