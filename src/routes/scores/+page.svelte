<script lang="ts">
  import { games, scores } from "$lib/mock-db";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<div
  style="display: flex; justify-content: space-between; align-items: center;"
>
  <h2 class="h2">Scores</h2>
  <a href="/scores/new">
    <button class="btn preset-filled">+ New Score</button>
  </a>
</div>

<div class="table-wrap">
  <table class="table">
    <thead>
      <tr>
        <th>Game</th>
        <th>Level/Song</th>
        <th>Name</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody class="[&>tr]:hover:preset-tonal-primary">
      {#each Object.values(scores) as score}
        <tr>
          <td>
            <a href="/games/{score.game_id}">
              {games[score.game_id].name}
            </a>
          </td>
          {#if score.level_id}
            <td>
              {games[score.game_id].levels![score.level_id].name}
            </td>
          {:else if score.song_id}
            <td>
              {games[score.game_id].songs![score.song_id].name} -
              {games[score.game_id].songs![score.song_id].artist}
            </td>
          {/if}
          <td>{score.name}</td>
          <td>{score.value}</td>
        </tr>
      {/each}
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3">Total</td>
        <td class="text-right">Elements</td>
      </tr>
    </tfoot>
  </table>
</div>
