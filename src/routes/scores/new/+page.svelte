<script lang="ts">
  import { games, scores } from "$lib/mock-db";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let selectedGameId: number | null = $state(null);

  function changeGameSelection(gameId: number) {
    selectedGameId = gameId;
  }

  function getSelectedGame() {
    if (selectedGameId !== null) return games[selectedGameId];
    else return null;
  }
</script>

<h2 class="h2">New Score</h2>

<form class="space-y-4" action="" style="margin-top: 10px;">
  <label class="label">
    <span class="label-text">Game</span>
    <select
      class="select"
      name="game-id"
      id="game-id-select"
      value={selectedGameId}
      required
      onchange={(e) => changeGameSelection(parseInt(e.target.value))}
    >
      {#each Object.values(games) as game}
        <option value={game.id}>{game.name}</option>
      {/each}
    </select>
  </label>

  {#if selectedGameId !== null && getSelectedGame()!.hasSongs}
    <label class="label">
      <span class="label-text">Song</span>
      <select name="song-id" id="song-id-select" class="select" required>
        {#each Object.values(getSelectedGame()!.songs!) as song}
          <option value={song.id}>{song.name} - {song.artist}</option>
        {/each}
      </select>
    </label>
  {/if}

  {#if selectedGameId !== null && getSelectedGame()!.hasLevels}
    <label class="label">
      <span class="label-text">Level</span>
      <select name="level-id" id="level-id-select" class="select" required>
        {#each Object.values(getSelectedGame()!.levels!) as level}
          <option value={level.id}>{level.name}</option>
        {/each}
      </select>
    </label>
  {/if}

  <label class="label">
    <span class="label-text">Name</span>
    <input
      class="input"
      type="text"
      required
      placeholder="Chosen name displayed next to the score"
    />
  </label>

  <label class="label">
    <span class="label-text">Score</span>
    <input class="input" type="number" required />
  </label>

  <button class="btn preset-filled" type="submit">Submit</button>
</form>
