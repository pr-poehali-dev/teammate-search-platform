import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Game } from './types';

interface FiltersSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  minRating: string;
  setMinRating: (rating: string) => void;
  selectedRank: string;
  setSelectedRank: (rank: string) => void;
  selectedGame: Game;
}

const FiltersSection = ({ 
  searchTerm, 
  setSearchTerm, 
  minRating, 
  setMinRating, 
  selectedRank, 
  setSelectedRank, 
  selectedGame 
}: FiltersSectionProps) => {
  const getRanksForGame = (game: Game) => {
    const ranks = {
      dota: ['Herald', 'Guardian', 'Crusader', 'Archon', 'Legend', 'Ancient', 'Divine', 'Immortal'],
      cs: ['Silver', 'Gold Nova', 'Master Guardian', 'Eagle', 'Supreme', 'Global Elite', 'Faceit 10'],
      valorant: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'],
      pubg: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Crown', 'Ace', 'Conqueror']
    };
    return ranks[game] || [];
  };

  const resetFilters = () => {
    setSearchTerm('');
    setMinRating('');
    setSelectedRank('');
  };

  return (
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
              onClick={resetFilters}
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
  );
};

export default FiltersSection;