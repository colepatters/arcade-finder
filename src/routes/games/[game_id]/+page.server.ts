import { Game } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const game_instance = await Game.findByPk(parseInt(params.game_id));
	if (!game_instance) return error(404, `Game with id of ${params.game_id} does not exist!`);

	return {
		game: game_instance.dataValues
	};
}) satisfies PageServerLoad;
