<script lang="ts">
  import { MapPin } from "lucide-svelte";

  let {
    number = -1,
    onclick = () => {},
  }: { number: number; onclick: () => void } = $props();
</script>

<div
  {onclick}
  style="display: flex; flex-direction: column; justify-content: center; align-items: center;"
>
  <span class="h2">{number}</span>
  <MapPin size="36" color="#000000" fill="#ffffff" />
</div>
