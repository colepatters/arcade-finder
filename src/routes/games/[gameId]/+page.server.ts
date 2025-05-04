import type { PageServerLoad } from "./$types";
import { games } from "$lib/mock-db";

export const load = (async ({ params }) => {
  return {
    game: games[parseInt(params.gameId)],
  };
}) satisfies PageServerLoad;
