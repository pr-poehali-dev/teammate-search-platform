import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;