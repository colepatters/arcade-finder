<script lang="ts">
	import type { PageData } from './$types';

	let show_add_form = $state(false);

	let { data }: { data: PageData } = $props();
</script>

<h1>Arcades</h1>

<button onclick={() => (show_add_form = true)}>+ Add New Arcade</button>

{#if show_add_form}
	<form method="post">
		<label for="arcade-name-input">Name</label>
		<input type="text" id="arcade-name-input" name="name" required />

		<label for="arcade-street_address-input">Street Address</label>
		<input type="text" id="arcade-street_address-input" name="street_address" required />

		<button type="submit">Submit</button>
		<button type="button" onclick={() => (show_add_form = false)}>Cancel</button>
	</form>
{/if}

<ul>
	{#each data.arcades as arcade}
		<li>
			<div class="arcade-entry">
				<a href={`/arcades/${arcade.id}`}>
					<h3>{arcade.name}</h3>
				</a>
				<p>{arcade.street_address}</p>
			</div>
		</li>
	{/each}
</ul>

<style>
	form {
		display: flex;
		flex-direction: column;
		width: fit-content;
		padding: 5px;
		gap: 2px;
	}

	.arcade-entry h3 {
		margin: 0px;
	}

	.arcade-entry p {
		margin: 0px;
	}
</style>
