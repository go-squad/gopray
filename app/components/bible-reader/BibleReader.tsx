import { BookOpenIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

export interface Passage {
  text: string;
  verse: string;
}

const RandomBibleReader = ({ className }: { className?: string }) => {
  const passages = [
    {
      text: 'Não deixemos de reunir-nos como igreja, segundo o costume de alguns, mas procuremos encorajar-nos uns aos outros, ainda mais quando vocês veem que se aproxima o Dia.',
      verse: 'Hebreus 10:24-25',
    },
    {
      text: 'Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus.',
      verse: 'Filipenses 4:6-7',
    },

    {
      text: 'Dediquem-se à oração, estejam alerta e sejam agradecidos.',
      verse: 'Colossenses 4:2',
    },
    {
      text: 'Então vocês clamarão a mim, virão orar a mim, e eu os ouvirei.',
      verse: 'Jeremias 29:12',
    },
    {
      text: 'Alegrem-se na esperança, sejam pacientes na tribulação, perseverem na oração.',
      verse: 'Romanos 12:12',
    },
    {
      text: 'Clame a mim e eu responderei e lhe direi coisas grandiosas e insondáveis que você não conhece.',
      verse: 'Jeremias 33:3',
    },
  ];

  const [passage, setPassage] = useState(passages[0]);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * passages.length);
    setPassage(passages[randomNumber]);
  }, []);

  return (
    <div className={`flex flex-col items-center ph-10 ${className}`}>
      <BookOpenIcon className="text-gray-400 w-8 mt-6" />
      <p className="p-px text-sm text-center italic text-gray-400 mt-3 mb-2">
        {passage.text}
      </p>
      <span className="text-sm font-bold text-gray-300">{passage.verse}</span>
    </div>
  );
};

export default RandomBibleReader;
