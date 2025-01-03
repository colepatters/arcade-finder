<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let show_add_game = $state(false);

	let loading_add_game_entries = $state(false);
	let add_game_entries: { [id: number]: string } = $state({});
	async function handle_show_add_game() {
		// get games
		show_add_game = true;
		loading_add_game_entries = true;
		const res = await fetch('/api/games');
		if (!res) return;
		const games = await res.json();

		for (const game of games) {
			add_game_entries[game.id] = game.name;
		}

		loading_add_game_entries = false;
	}
</script>

<h1>{data.arcade.name}</h1>
<p>Created: {data.arcade.created_at}</p>
<p>Updated: {data.arcade.updated_at}</p>

<h2>Games</h2>
<button onclick={handle_show_add_game}>+ Add Game to {data.arcade.name}</button>

{#if show_add_game}
	{#if loading_add_game_entries}
		<p>Loading...</p>
	{:else}
		<form method="post" action="?/add_game">
			<label for="input-game_id">Game</label>
			<select name="game_id" id="input-game_id" required>
				<option value="">Choose a Game</option>
				{#each Object.entries(add_game_entries) as [id, name]}
					<option value={id}>{name}</option>
				{/each}
			</select>

			<button type="submit">Submit</button>
			<button type="button" onclick={() => (show_add_game = false)}>Cancel</button>
		</form>
	{/if}
{/if}

<ul>
	{#each data.arcade.Games as game}
		<li>
			<div>
				<a href={`/games/${game.id}`}>
					<h3>{game.name}</h3>
				</a>
			</div>
		</li>
	{/each}
</ul>

<h2>High Scores</h2>
