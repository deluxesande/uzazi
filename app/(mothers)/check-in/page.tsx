'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const QUESTIONS = [
  {
    id: 'q1',
    text: 'How did you sleep last night?',
    options: [
      { value: 3, label: 'I slept well' },
      { value: 2, label: 'I woke up a few times, but okay' },
      { value: 1, label: 'I barely slept' },
      { value: 0, label: 'I could not sleep at all' }
    ]
  },
  {
    id: 'q2',
    text: 'How is your body feeling today?',
    options: [
      { value: 3, label: 'Healing well, little pain' },
      { value: 2, label: 'Some normal soreness' },
      { value: 1, label: 'I am in a lot of pain' },
      { value: 0, label: 'I have a fever or heavy bleeding' }
    ]
  },
  {
    id: 'q3',
    text: 'How are you feeling in your heart and mind?',
    options: [
      { value: 3, label: 'Happy and calm' },
      { value: 2, label: 'A bit tired and overwhelmed' },
      { value: 1, label: 'Very sad or anxious' },
      { value: 0, label: 'I feel hopeless or scared' }
    ]
  },
  {
    id: 'q4',
    text: 'How is feeding your baby going?',
    options: [
      { value: 3, label: 'Going well' },
      { value: 2, label: 'Learning, but getting there' },
      { value: 1, label: 'It is very difficult and painful' },
      { value: 0, label: 'Baby is not feeding well' }
    ]
  },
  {
    id: 'q5',
    text: 'Do you have someone helping you today?',
    options: [
      { value: 3, label: 'Yes, I have good support' },
      { value: 2, label: 'Someone is checking on me' },
      { value: 1, label: 'I am doing mostly everything alone' },
      { value: 0, label: 'I am completely alone and struggling' }
    ]
  }
];

export default function CheckInPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleSelect = (value: number) => {
    const questionId = QUESTIONS[currentStep].id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Auto-advance after a short delay for better UX
    setTimeout(() => {
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 400);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-warmWhite flex flex-col items-center justify-center p-6">
        <div className="w-32 h-32 bg-mintGreen rounded-full flex items-center justify-center mb-8 shadow-lg">
          <span className="text-warmWhite text-5xl font-bold">+1</span>
        </div>
        <h1 className="text-4xl font-bold text-deepPlum mb-4 text-center tracking-tight">
          You earned a petal!
        </h1>
        <p className="text-deepPlum/70 text-center mb-12 max-w-sm text-xl leading-relaxed">
          Thank you for checking in today. Your garden is growing beautifully.
        </p>
        <button 
          onClick={() => router.push('/home')}
          className="w-full max-w-xs bg-deepPlum text-warmWhite font-bold py-5 rounded-none text-xl tracking-wide hover:bg-deepPlum/90 transition-colors"
        >
          Return to Garden
        </button>
      </div>
    );
  }

  const question = QUESTIONS[currentStep];

  return (
    <div className="min-h-screen bg-warmWhite flex flex-col p-6 max-w-md mx-auto">
      <div className="flex gap-2 mb-12 mt-6">
        {QUESTIONS.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-2 flex-1 transition-colors duration-300 ${idx <= currentStep ? 'bg-mintGreen' : 'bg-deepPlum/10'}`}
          />
        ))}
      </div>

      <h2 className="text-3xl font-bold text-deepPlum mb-12 leading-tight">
        {question.text}
      </h2>

      <div className="space-y-4 flex-1">
        {question.options.map((option) => {
          const isSelected = answers[question.id] === option.value;
          return (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left p-6 text-xl font-bold transition-all duration-200 ${
                isSelected 
                  ? 'bg-mintGreen text-warmWhite border-2 border-mintGreen translate-x-2' 
                  : 'bg-white text-deepPlum border-2 border-deepPlum/10 hover:border-deepPlum/30 hover:bg-warmWhite'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
