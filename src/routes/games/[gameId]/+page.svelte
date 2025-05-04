<script lang="ts">
  import { scores } from "$lib/mock-db";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<h2 class="h2">{data.game.name}</h2>
<div style="margin-bottom: 10px">
  <strong>{data.game.genre}</strong>
  <p>Published by {data.game.publishers.join(", ")}</p>
</div>

<div style="display: flex; justify-content: space-between;">
  <h4 class="h4">Scores</h4>
  <a href="/scores/new?gameId={data.game.id}">
    <button class="btn btn-sm preset-filled">+ New Score</button>
  </a>
</div>
<div class="table-wrap" style="margin-bottom: 10px;">
  <table class="table">
    <thead>
      <tr>
        <th>Author</th>
        <th>Name</th>
        {#if data.game.hasSongs}
          <th>Song</th>
        {:else}
          <th>Level</th>
        {/if}
        <th>Value</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody class="[&>tr]:hover:preset-tonal-primary">
      {#each Object.values(scores).sort((a, b) => a.value - b.value) as score}
        <tr>
          <td>{score.author}</td>
          <td>{score.name}</td>
          <td
            >{data.game.songs[score.song_id].name} - {data.game.songs[
              score.song_id
            ].artist}</td
          >
          <td>{score.value}</td>
          <td>2025-01-01</td>
        </tr>
      {/each}
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4">Total</td>
        <td class="text-right">{Object.values(scores).length} Scores</td>
      </tr>
    </tfoot>
  </table>
</div>

{#if data.game.songs}
  <h4 class="h4">Available Songs</h4>
  <div class="table-wrap">
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Artist</th>
        </tr>
      </thead>
      <tbody class="[&>tr]:hover:preset-tonal-primary">
        {#each data.game.songs as song}
          <tr>
            <td>{song.name}</td>
            <td>{song.artist}</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">Total</td>
          <td class="text-right">{data.game.songs.length} Songs</td>
        </tr>
      </tfoot>
    </table>
  </div>
{/if}
