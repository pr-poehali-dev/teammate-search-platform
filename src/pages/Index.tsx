import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import HeroSection from '@/components/gaming/HeroSection';
import FiltersSection from '@/components/gaming/FiltersSection';
import PlayerCard from '@/components/gaming/PlayerCard';
import ChatDialog from '@/components/gaming/ChatDialog';
import StatsSection from '@/components/gaming/StatsSection';
import { Game, Player, Message, gameThemes, mockPlayers } from '@/components/gaming/types';

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<Game>('dota');
  const [searchTerm, setSearchTerm] = useState('');
  const [minRating, setMinRating] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const filteredPlayers = mockPlayers.filter(player => {
    const matchesGame = player.game === selectedGame;
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = !minRating || player.rating >= parseInt(minRating);
    const matchesRank = !selectedRank || player.rank === selectedRank;
    
    return matchesGame && matchesSearch && matchesRating && matchesRank;
  });

  const sendMessage = (message: string) => {
    if (!selectedPlayer) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    
    setTimeout(() => {
      const responses = [
        'Привет! Давай обсудим детали игры',
        'Круто! Когда можем сыграть?',
        'Отлично, я как раз искал тиммейта!',
        'Давай созвонимся в дискорде?',
        'Какой у тебя рейтинг?'
      ];
      
      const playerMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'player',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, playerMessage]);
    }, 1000);
  };

  const openChat = (player: Player) => {
    setSelectedPlayer(player);
    setChatOpen(true);
    setMessages([
      {
        id: '1',
        text: `Привет! Я ${player.name}, рад познакомиться!`,
        sender: 'player',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <HeroSection />

        <div className="container mx-auto px-4 pb-8">
          <Tabs value={selectedGame} onValueChange={(value) => setSelectedGame(value as Game)} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-800 border border-gray-700">
              {Object.entries(gameThemes).map(([game, theme]) => (
                <TabsTrigger 
                  key={game}
                  value={game} 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                >
                  <span className="font-bold">{theme.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.keys(gameThemes).map((game) => (
              <TabsContent key={game} value={game}>
                <FiltersSection
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  minRating={minRating}
                  setMinRating={setMinRating}
                  selectedRank={selectedRank}
                  setSelectedRank={setSelectedRank}
                  selectedGame={selectedGame}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player) => (
                      <PlayerCard 
                        key={player.id} 
                        player={player} 
                        onChatClick={openChat}
                      />
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

        <StatsSection />
      </div>

      <ChatDialog
        open={chatOpen}
        onOpenChange={setChatOpen}
        selectedPlayer={selectedPlayer}
        messages={messages}
        onSendMessage={sendMessage}
      />
    </>
  );
};

export default Index;