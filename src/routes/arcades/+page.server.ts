import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { Arcade } from '$lib/db';

export const load = (async () => {
	const arcade_instances = await Arcade.findAll();
	const arcades = arcade_instances.map((entry) => entry.dataValues);

	return {
		arcades
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
			const new_instance = await Arcade.create(transformed_data);
		} catch (err) {
			return error(err);
		}
	}
} satisfies Actions;
