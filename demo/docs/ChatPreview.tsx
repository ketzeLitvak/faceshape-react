import { Character, type ExpressionName } from '../../src';
import './chat-preview.css';
import { useDocsLanguage } from './language';

const messages: { id: string; name: string; text: string; expression: ExpressionName }[] =
  [
    {
      id: '1',
      name: 'Eze',
      text: '¡Hola! ¿Podemos usar estos personajes en el chat?',
      expression: 'happy',
    },
    {
      id: '2',
      name: 'Sofi',
      text: 'Sí, cada persona conserva su avatar por nombre.',
      expression: 'neutral',
    },
    {
      id: '3',
      name: 'Eze',
      text: '¡Qué bueno! El mío también puede cambiar de expresión.',
      expression: 'surprised',
    },
  ];

export function ChatPreview() {
  const isEnglish = useDocsLanguage() === 'en';
  const translations = [
    'Hi! Can we use these characters in the chat?',
    'Yes, each person keeps their avatar by name.',
    'Great! Mine can change its expression too.',
  ];
  return (
    <figure
      className="docs-chat"
      aria-label={
        isEnglish
          ? 'Example conversation with avatars'
          : 'Ejemplo de conversación con avatares'
      }
    >
      <div className="docs-chat-heading">
        <strong>{isEnglish ? 'Creative team' : 'Equipo creativo'}</strong>
        <span>{isEnglish ? 'Example preview' : 'Vista de ejemplo'}</span>
      </div>
      <ol className="chat-messages">
        {messages.map((message, index) => (
          <li className="chat-message" key={message.id}>
            <Character
              name={message.name}
              face={{ eyes: 'bright', mouth: 'cat', eyebrows: 'expression' }}
              expression={message.expression}
              size={56}
              reducedMotion
            />
            <div className="chat-bubble">
              <strong>{message.name}</strong>
              <p>{isEnglish ? translations[index] : message.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
