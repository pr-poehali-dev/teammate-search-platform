export type Game = 'dota' | 'cs' | 'valorant' | 'pubg';

export interface Player {
  id: string;
  name: string;
  age: number;
  game: Game;
  rank: string;
  rating: number;
  description: string;
  avatar?: string;
  languages: string[];
  playStyle: string;
  availability: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'player';
  timestamp: Date;
}

export const gameThemes = {
  dota: {
    primary: 'bg-gradient-to-r from-red-600 to-red-800',
    secondary: 'bg-red-900/20',
    accent: 'text-red-400',
    border: 'border-red-600',
    name: 'Dota 2'
  },
  cs: {
    primary: 'bg-gradient-to-r from-blue-600 to-orange-500',
    secondary: 'bg-blue-900/20',
    accent: 'text-blue-400',
    border: 'border-blue-600',
    name: 'Counter-Strike'
  },
  valorant: {
    primary: 'bg-gradient-to-r from-pink-600 to-red-600',
    secondary: 'bg-pink-900/20',
    accent: 'text-pink-400',
    border: 'border-pink-600',
    name: 'Valorant'
  },
  pubg: {
    primary: 'bg-gradient-to-r from-orange-700 to-orange-900',
    secondary: 'bg-orange-900/20',
    accent: 'text-orange-400',
    border: 'border-orange-600',
    name: 'PUBG'
  }
};

export const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Orbitron',
    age: 23,
    game: 'dota',
    rank: 'Divine',
    rating: 4200,
    description: 'Ищу команду для участия в турнирах. Играю на поддержке.',
    languages: ['RU', 'EN'],
    playStyle: 'Support',
    availability: 'Вечером'
  },
  {
    id: '2',
    name: 'ShadowHunter',
    age: 19,
    game: 'cs',
    rank: 'Global Elite',
    rating: 3800,
    description: 'AWP-ер с опытом. Люблю играть агрессивно.',
    languages: ['RU'],
    playStyle: 'AWP',
    availability: 'Днем'
  },
  {
    id: '3',
    name: 'ValorantPro',
    age: 21,
    game: 'valorant',
    rank: 'Radiant',
    rating: 4500,
    description: 'Дуэлист, ищу серьезную команду для рангед игр.',
    languages: ['RU', 'EN'],
    playStyle: 'Duelist',
    availability: 'Всегда онлайн'
  },
  {
    id: '4',
    name: 'ChickenDinner',
    age: 25,
    game: 'pubg',
    rank: 'Conqueror',
    rating: 4100,
    description: 'Опытный игрок в squad режиме. Предпочитаю тактическую игру.',
    languages: ['RU', 'EN'],
    playStyle: 'Tactical',
    availability: 'Выходные'
  },
  {
    id: '5',
    name: 'MidMaster',
    age: 20,
    game: 'dota',
    rank: 'Immortal',
    rating: 5200,
    description: 'Миддер с большим опытом. Играю на инвокере и СФ.',
    languages: ['RU'],
    playStyle: 'Mid',
    availability: 'Каждый день'
  },
  {
    id: '6',
    name: 'FlashKing',
    age: 22,
    game: 'cs',
    rank: 'Faceit 10',
    rating: 3900,
    description: 'Entry fragger, люблю быстрые раунды и флешки.',
    languages: ['RU', 'EN'],
    playStyle: 'Entry',
    availability: 'После работы'
  }
];