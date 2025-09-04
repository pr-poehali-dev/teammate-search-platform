import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Player, gameThemes } from './types';

interface PlayerCardProps {
  player: Player;
  onChatClick: (player: Player) => void;
}

const PlayerCard = ({ player, onChatClick }: PlayerCardProps) => {
  const theme = gameThemes[player.game];
  
  return (
    <Card className="group hover:scale-105 transition-all duration-300 bg-gray-800/50 border-gray-600 hover:shadow-2xl">
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
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              className={`${theme.border} ${theme.accent} border-2 hover:bg-gray-600`}
              onClick={() => onChatClick(player)}
            >
              <Icon name="MessageCircle" size={14} className="mr-1" />
              Чат
            </Button>
            <Button size="sm" className={`${theme.primary} hover:opacity-90 text-white border-0`}>
              <Icon name="UserPlus" size={16} className="mr-2" />
              Пригласить
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;