<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>{data.game.name}</h1>
<p>Created: {data.game.created_at}</p>
<p>Updated: {data.game.updated_at}</p>

<button disabled>Edit</button>
<button disabled>Delete</button>
