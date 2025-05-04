<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  import { games, scores } from "$lib/mock-db";
</script>

<h2 class="h2">Games</h2>

<div class="table-wrap">
  <table class="table caption-bottom">
    <caption class="pt-4">All games in the database</caption>
    <thead>
      <tr>
        <th>Name</th>
        <th>Publisher(s)</th>
        <th>Recorded Scores</th>
        <th>Cabinets</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody class="[&>tr]:hover:preset-tonal-primary">
      {#each Object.values(games) as entry}
        <tr>
          <td>{entry.name}</td>
          <td>{entry.publishers.join(", ")}</td>
          <td
            >{Object.values(scores).filter(
              (score) => score.game_id === entry.id
            ).length}</td
          >
          <td>{entry.cabinetCount}</td>
          <td class="text-right">
            <a class="btn btn-sm preset-filled" href="/games/{entry.id}">
              View &rarr;
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4">Total</td>
        <td class="text-right">{Object.entries(games).length} Games</td>
      </tr>
    </tfoot>
  </table>
</div>
