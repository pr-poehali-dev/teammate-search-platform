import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type Game = 'dota' | 'cs' | 'valorant' | 'pubg';

interface Player {
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

const gameThemes = {
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

const mockPlayers: Player[] = [
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

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<Game>('dota');
  const [searchTerm, setSearchTerm] = useState('');
  const [minRating, setMinRating] = useState('');
  const [selectedRank, setSelectedRank] = useState('');

  const filteredPlayers = mockPlayers.filter(player => {
    const matchesGame = player.game === selectedGame;
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = !minRating || player.rating >= parseInt(minRating);
    const matchesRank = !selectedRank || player.rank === selectedRank;
    
    return matchesGame && matchesSearch && matchesRating && matchesRank;
  });

  const getRanksForGame = (game: Game) => {
    const ranks = {
      dota: ['Herald', 'Guardian', 'Crusader', 'Archon', 'Legend', 'Ancient', 'Divine', 'Immortal'],
      cs: ['Silver', 'Gold Nova', 'Master Guardian', 'Eagle', 'Supreme', 'Global Elite', 'Faceit 10'],
      valorant: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'],
      pubg: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Crown', 'Ace', 'Conqueror']
    };
    return ranks[game] || [];
  };

  const PlayerCard = ({ player }: { player: Player }) => {
    const theme = gameThemes[player.game];
    
    return (
      <Card className={`group hover:scale-105 transition-all duration-300 ${theme.secondary} ${theme.border} border-2 hover:shadow-2xl hover:shadow-${player.game === 'dota' ? 'red' : player.game === 'cs' ? 'blue' : player.game === 'valorant' ? 'pink' : 'orange'}-500/25`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={player.avatar} />
                <AvatarFallback className={`${theme.primary} text-white font-bold`}>
                  {player.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg text-white group-hover:text-primary transition-colors">
                  {player.name}
                </CardTitle>
                <CardDescription className={`${theme.accent} font-medium`}>
                  {player.age} лет • {player.rank}
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className={`px-3 py-1 rounded-full ${theme.primary} text-white text-sm font-bold`}>
                {player.rating}
              </div>
              <Badge variant="outline" className={`mt-2 ${theme.border} ${theme.accent} border-2`}>
                {player.playStyle}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            {player.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {player.languages.map(lang => (
              <Badge key={lang} variant="secondary" className="bg-gray-700 text-gray-300">
                {lang}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <Icon name="Clock" size={14} />
              <span>{player.availability}</span>
            </div>
            
            <Button size="sm" className={`${theme.primary} hover:opacity-90 text-white border-0`}>
              <Icon name="UserPlus" size={16} className="mr-2" />
              Пригласить
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-blue-600/20" />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            GAMING TEAMMATES
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Найди идеальную команду для побед в любимых играх. 
            Подключайся к лучшим игрокам и покоряй рейтинговые лестницы вместе!
          </p>
          
          <div className="flex justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-2 text-gray-300">
              <Icon name="Users" size={20} />
              <span>15,847+ игроков</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Icon name="Trophy" size={20} />
              <span>2,341+ команд</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Icon name="Star" size={20} />
              <span>4.9/5 рейтинг</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Selection */}
      <div className="container mx-auto px-4 pb-8">
        <Tabs value={selectedGame} onValueChange={(value) => setSelectedGame(value as Game)} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-800 border border-gray-700">
            {Object.entries(gameThemes).map(([game, theme]) => (
              <TabsTrigger 
                key={game}
                value={game} 
                className={`data-[state=active]:${theme.primary} data-[state=active]:text-white transition-all duration-300 hover:scale-105`}
              >
                <span className="font-bold">{theme.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(gameThemes).map((game) => (
            <TabsContent key={game} value={game}>
              {/* Filters */}
              <Card className="mb-8 bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Filter" size={20} className="mr-2" />
                    Фильтры поиска
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Поиск по имени</label>
                      <Input
                        placeholder="Введите имя игрока..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Минимальный рейтинг</label>
                      <Input
                        type="number"
                        placeholder="Например: 3000"
                        value={minRating}
                        onChange={(e) => setMinRating(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Ранг</label>
                      <Select value={selectedRank} onValueChange={setSelectedRank}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Выберите ранг" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="">Все ранги</SelectItem>
                          {getRanksForGame(selectedGame).map(rank => (
                            <SelectItem key={rank} value={rank} className="text-white hover:bg-gray-600">
                              {rank}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-end">
                      <Button 
                        onClick={() => {
                          setSearchTerm('');
                          setMinRating('');
                          setSelectedRank('');
                        }}
                        variant="outline"
                        className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                      >
                        <Icon name="RotateCcw" size={16} className="mr-2" />
                        Сбросить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Players Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Icon name="UserX" size={48} className="mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl text-gray-400 mb-2">Игроки не найдены</h3>
                    <p className="text-gray-500">Попробуйте изменить критерии поиска</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Активных игроков', value: '15,847', icon: 'Users', color: 'text-blue-400' },
            { label: 'Создано команд', value: '2,341', icon: 'Shield', color: 'text-green-400' },
            { label: 'Проведено матчей', value: '47,291', icon: 'Trophy', color: 'text-orange-400' },
            { label: 'Средний рейтинг', value: '4,235', icon: 'Star', color: 'text-purple-400' }
          ].map((stat, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 text-center hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6">
                <Icon name={stat.icon as any} size={32} className={`mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;