<script lang="ts">
	import type { PageData } from './$types';

	let show_add_game = $state(false);

	let { data }: { data: PageData } = $props();
</script>

<h1>Games</h1>
<button onclick={() => (show_add_game = true)}>+ Add New Game</button>

{#if show_add_game}
	<form method="post">
		<label for="game-name-input">Name</label>
		<input type="text" id="game-name-input" name="name" required />

		<button type="submit">Submit</button>
		<button type="button" onclick={() => (show_add_game = false)}>Cancel</button>
	</form>
{/if}

{#if data.games.length === 0}
	<p>-- no games (yet :D) --</p>
{/if}

<ul>
	{#each data.games as game}
		<li>
			<div>
				<a href={`/games/${game.id}`}>
					<h3>{game.name}</h3>
				</a>
			</div>
		</li>
	{/each}
</ul>
