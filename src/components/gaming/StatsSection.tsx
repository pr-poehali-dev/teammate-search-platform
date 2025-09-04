import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const StatsSection = () => {
  const stats = [
    { label: 'Активных игроков', value: '15,847', icon: 'Users', color: 'text-blue-400' },
    { label: 'Создано команд', value: '2,341', icon: 'Shield', color: 'text-green-400' },
    { label: 'Проведено матчей', value: '47,291', icon: 'Trophy', color: 'text-orange-400' },
    { label: 'Средний рейтинг', value: '4,235', icon: 'Star', color: 'text-purple-400' }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
  );
};

export default StatsSection;