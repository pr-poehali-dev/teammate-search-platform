import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Player, Message, gameThemes } from './types';

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlayer: Player | null;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const ChatDialog = ({ open, onOpenChange, selectedPlayer, messages, onSendMessage }: ChatDialogProps) => {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-3">
            {selectedPlayer && (
              <>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={`${gameThemes[selectedPlayer.game].primary} text-white text-sm`}>
                    {selectedPlayer.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                Чат с {selectedPlayer.name}
              </>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <ScrollArea className="h-80 w-full rounded-md border border-gray-600 p-4 bg-gray-900">
            <div className="space-y-3">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-700 text-gray-200'
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="flex gap-2">
            <Textarea
              placeholder="Напишите сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white resize-none"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <Button 
              onClick={sendMessage}
              className="bg-primary hover:bg-primary/90 text-white self-end"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;