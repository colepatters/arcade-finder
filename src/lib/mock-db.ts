type Score = {
  id: number;
  game_id: number;
  author: string;
  song_id: number | null;
  level_id: number | null;
  name: string;
  value: number;
};

type Song = {
  id: number;
  name: string;
  artist: string;
};

type Level = {
  id: number;
  name: string;
};

type Game = {
  id: number;
  name: string;
  publishers: string[];
  cabinetCount: number;
  genre: string;
  hasSongs: boolean;
  songs?: Record<number, Song>;
  hasLevels: boolean;
  levels?: Record<number, Level>;
};

export const games: Record<number, Game> = {
  0: {
    id: 0,
    name: "Guitar Hero Arcade",
    publishers: ["Activision", "Konami", "Raw Thrills"],
    cabinetCount: 0,
    genre: "Rhythm/Music",
    hasSongs: true,
    hasLevels: false,
    songs: {
      0: { id: 0, name: "Almost Easy", artist: "Avenged Sevenfold" },
      1: { id: 1, name: "Anarchy in the U.K.", artist: "Sex Pistols" },
      2: { id: 2, name: "Barracuda", artist: "Heart" },
      3: { id: 3, name: "Before I Forget", artist: "Slipknot" },
      4: { id: 4, name: "Black Magic Woman", artist: "Santana" },
      5: { id: 5, name: "Black Sunshine", artist: "White Zombie" },
      6: { id: 6, name: "Bulls on Parade", artist: "Rage Against the Machine" },
      7: { id: 7, name: "Cherub Rock", artist: "Smashing Pumpkins" },
      8: { id: 8, name: "Closer", artist: "Lacuna Coil" },
      9: { id: 9, name: "Cult of Personality", artist: "Living Colour" },
      10: { id: 10, name: "Even Flow", artist: "Pearl Jam" },
      11: { id: 11, name: "Holiday in Cambodia", artist: "Dead Kennedys" },
      12: { id: 12, name: "Hit Me With Your Best Shot", artist: "Pat Benatar" },
      13: { id: 13, name: "Knights of Cydonia", artist: "Muse" },
      14: { id: 14, name: "La Grange", artist: "ZZ Top" },
      15: { id: 15, name: "Lay Down", artist: "Priestess" },
      16: { id: 16, name: "Mississippi Queen", artist: "Mountain" },
      17: { id: 17, name: "My Name Is Jonas", artist: "Weezer" },
      18: { id: 18, name: "Paint It Black", artist: "The Rolling Stones" },
      19: { id: 19, name: "Paranoid", artist: "Black Sabbath" },
      20: { id: 20, name: "Pride and Joy", artist: "Stevie Ray Vaughan" },
      21: { id: 21, name: "Radio Song", artist: "Superbus" },
      // reptilia??
      22: { id: 22, name: "Rock and Roll All Nite", artist: "Kiss" },
      23: { id: 23, name: "Rock You Like a Hurricane", artist: "Scorpions" },
      24: { id: 24, name: "Sabotage", artist: "Beastie Boys" },
      25: { id: 25, name: "Same Old Song and Dance", artist: "Aerosmith" },
      26: { id: 26, name: "School's Out", artist: "Alice Cooper" },
      27: { id: 27, name: "She Bangs the Drums", artist: "The Stone Roses" },
      28: { id: 28, name: "Slow Ride", artist: "Foghat" },
      29: { id: 29, name: "Story of My Life", artist: "Social Distortion" },
      30: { id: 30, name: "Sunshine of Your Love", artist: "Cream" },
      31: { id: 31, name: "Talk Dirty to Me", artist: "Poison" },
      32: { id: 32, name: "The Metal", artist: "Tenacious D" },
      33: { id: 33, name: "Welcome to the Jungle", artist: "Guns N' Roses" },
      34: { id: 34, name: "When You Were Young", artist: "The Killers" },
      35: { id: 35, name: "Yellow", artist: "Coldplay" },
    },
  },
  2: {
    id: 2,
    name: "Luigi's Mansion Arcade",
    publishers: ["Capcom", "Sega", "Nintendo"],
    cabinetCount: 0,
    genre: "Rails Shooter",
    hasSongs: false,
    hasLevels: true,
    levels: {
      0: {
        id: 0,
        name: "Gloomy Manor",
      },
      1: {
        id: 1,
        name: "Old Clockworks",
      },
      2: {
        id: 2,
        name: "Treacherous Mansion",
      },
    },
  },
  3: {
    id: 3,
    name: "Music Diver",
    publishers: ["Taito"],
    cabinetCount: 0,
    genre: "Rhythm/Music",
    hasSongs: true,
    hasLevels: false,
    songs: {
      0: {
        id: 0,
        name: "Alien Alien",
        artist: "Nayutan Seijin",
      },
    },
  },
};

export const scores: Record<number, Score> = {
  0: {
    id: 0,
    game_id: 0,
    author: "swoley_coley",
    song_id: 15,
    level_id: null,
    name: "COLE",
    value: 193462,
  },
  1: {
    id: 1,
    game_id: 0,
    author: "swoley_coley",
    song_id: 15,
    level_id: null,
    name: "SAM",
    value: 246200,
  },
  2: {
    id: 2,
    game_id: 0,
    author: "swoley_coley",
    song_id: 15,
    level_id: null,
    name: "LARS",
    value: 244020,
  },
  3: {
    id: 3,
    game_id: 0,
    author: "swoley_coley",
    song_id: 15,
    level_id: null,
    name: "COLE",
    value: 233111,
  },
  4: {
    id: 4,
    game_id: 0,
    author: "swoley_coley",
    song_id: 15,
    level_id: null,
    name: "DIGTHENIG",
    value: 232676,
  },
};

export type Arcade = {
  id: number;
  name: string;
  street_address: string;
  lat: number;
  lon: number;
};

export const arcades: Record<number, Arcade> = {
  0: {
    id: 0,
    name: "Dave & Buster's Phoenix - Scottsdale",
    street_address: "21001 N Tatum Blvd Suite 44-1400, Phoenix, AZ 85050",
    lat: 33.677158,
    lon: -111.977242,
  },
  1: {
    id: 1,
    name: "Round1 Bowling & Arcade - Glendale",
    street_address: "7650 W Arrowhead Towne Center, Glendale, AZ 85308",
    lat: 33.641308227254015,
    lon: -112.22417144940518,
  },
};
