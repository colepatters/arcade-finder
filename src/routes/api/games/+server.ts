import { Game } from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const game_instances = await Game.findAll();
	const games = game_instances.map((entry) => entry.dataValues);
	return json(games);
};
