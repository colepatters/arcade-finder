<script lang="ts">
  import { Joystick, ListOrdered, MapPin, User } from "lucide-svelte";
  import "../app.css";
  import { AppBar } from "@skeletonlabs/skeleton-svelte";

  let { children } = $props();
</script>

<AppBar>
  {#snippet lead()}
    <a href="/">Arcade Finder</a>
  {/snippet}

  {#snippet trail()}
    <a href="/games" title="Games"><Joystick /></a>
    <a href="/scores" title="Scores"><ListOrdered /></a>
    <a href="/arcades" title="Arcades"><MapPin /></a>
    <User />
  {/snippet}
</AppBar>

<div style="padding:15px">
  {@render children()}
</div>
