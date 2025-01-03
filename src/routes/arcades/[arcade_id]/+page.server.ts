import { Arcade, Game } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const arcade_instance = await Arcade.findByPk(parseInt(params.arcade_id), {
		include: {
			model: Game
		}
	});

	if (!arcade_instance) return error(404, `Arcade with id of ${params.arcade_id} does not exist!`);

	let arcade = arcade_instance.dataValues;
	if (arcade.Games.length > 0) {
		arcade.Games = arcade.Games.map((entry) => {
			return { ...entry.dataValues, arcade_games: {} };
		});
	}

	return {
		arcade
	};
}) satisfies PageServerLoad;

export const actions = {
	add_game: async ({ request, params }) => {
		const formData = await request.formData();
		const game_id = formData.get('game_id');
		if (!game_id) return error(400, 'User provided no/invalid game_id');
		const game = await Game.findByPk(parseInt(game_id.toString()));
		if (!game) return error(404, `Game with id of ${game_id.toString()} does not exist!`);
		const arcade = await Arcade.findByPk(parseInt(params.arcade_id));
		if (!arcade) return error(404, `Arcade with id of ${params.arcade_id} does not exist!`);

		await arcade.addGame(game);
	}
} satisfies Actions;
