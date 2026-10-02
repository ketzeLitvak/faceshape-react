import { Character, type ExpressionName } from '../../src';
import './chat-preview.css';

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
  return (
    <figure className="docs-chat" aria-label="Ejemplo de conversación con avatares">
      <div className="docs-chat-heading">
        <strong>Equipo creativo</strong>
        <span>Vista de ejemplo</span>
      </div>
      <ol className="chat-messages">
        {messages.map((message) => (
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
              <p>{message.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
