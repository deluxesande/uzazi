'use client';

import { useState, useRef, useEffect } from 'react';
import BreathingExercise from './BreathingExercise';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

// Keywords that trigger the immediate breathing exercise overlay
const DISTRESS_KEYWORDS = [
  'hurt', 'pain', 'cry', 'crying', 'alone', 'scared', 
  'give up', 'die', 'end', 'overwhelmed', 'can\'t take this'
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'init-1', 
      role: 'ai', 
      content: 'Habari, Wanjiku. It is late, and the house is quiet. I am here with you. How are you feeling right now?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isBreathing, setIsBreathing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userText = input.trim();
    setInput('');
    
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: userText };
    setMessages(prev => [...prev, newUserMsg]);

    // Check for distress keywords
    const isDistressed = DISTRESS_KEYWORDS.some(kw => userText.toLowerCase().includes(kw));
    
    if (isDistressed) {
      setIsBreathing(true);
    } else {
      processAIResponse(userText, false);
    }
  };

  const processAIResponse = (userText: string, wasDistressed: boolean) => {
    setIsTyping(true);
    
    // Simulating an SSE stream response for the prototype
    setTimeout(() => {
      setIsTyping(false);
      
      const responseContent = wasDistressed 
        ? 'I am so glad we took that breath together. It is completely normal to feel overwhelmed during these quiet night hours. You are doing a wonderful job as a mother, even when it feels heavy. I am here to listen. What is weighing on your mind the most?'
        : 'I hear you, Wanjiku. The nights can feel very long. Remember that you are doing your best, and your best is enough. Would you like to talk more about it, or would you prefer a quiet distraction?';

      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'ai', 
        content: responseContent 
      }]);
    }, 1500);
  };

  const handleBreathingComplete = () => {
    setIsBreathing(false);
    // After breathing, the AI responds to the distressed message
    processAIResponse('User was distressed, completed breathing.', true);
  };

  return (
    <div className="flex flex-col h-[650px] w-full max-w-md mx-auto relative border border-nightSurface bg-nightBlue rounded-xl overflow-hidden shadow-2xl">
      {isBreathing && <BreathingExercise onComplete={handleBreathingComplete} />}
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-mintGreen text-warmWhite rounded-br-none' 
                : 'bg-nightSurface text-warmWhite rounded-bl-none border border-white/5'
            }`}>
              <p className="text-[15px] leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-nightSurface text-warmWhite/50 p-4 rounded-2xl rounded-bl-none border border-white/5 text-sm font-medium tracking-wide">
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-nightSurface/80 border-t border-white/5 backdrop-blur-sm">
        <div className="flex gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-nightBlue border border-white/10 rounded-full px-6 py-3.5 text-warmWhite placeholder-warmWhite/30 focus:outline-none focus:border-mintGreen/50 transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-mintGreen text-warmWhite font-bold px-6 py-3.5 rounded-full disabled:opacity-50 transition-opacity"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
