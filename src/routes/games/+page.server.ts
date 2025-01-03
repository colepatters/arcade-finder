import { Game } from '$lib/db';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async () => {
	const game_instances = await Game.findAll();
	const games = game_instances.map((entry) => entry.dataValues);

	return {
		games
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		// TODO log the user in
		const formData = await event.request.formData();

		// transform formData
		const transformed_data: { [key: string]: string } = {};
		for (const [key, value] of formData.entries()) {
			transformed_data[key] = value.toString();
		}

		try {
			const new_instance = await Game.create(transformed_data);
		} catch (err) {
			return error(err);
		}
	}
} satisfies Actions;
