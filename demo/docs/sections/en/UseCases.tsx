import { Character } from '../../../../src';
import { ChatPreview } from '../../ChatPreview';
import { CodeBlock } from '../../CodeBlock';
import { chatExample, chatStylesExample } from '../../examples.en';

export function UseCases() {
  return (
    <section id="docs-cases">
      <h2>Use cases</h2>
      <div className="docs-cases">
        <div>
          <Character
            name="Profile"
            face={{ eyes: 'bright', mouth: 'tongue', eyebrows: 'expression' }}
            expression="happy"
            size={100}
            reducedMotion
          />
          <h3>Avatars</h3>
          <p>
            Use a stable name per user to reproduce color and silhouette. Add an
            accessible label when representing a person.
          </p>
        </div>
        <div>
          <Character
            shape="square"
            face={{ eyes: 'capsule', mouth: 'standard', eyebrows: 'expression' }}
            expression="sleepy"
            size={100}
            reducedMotion
          />
          <h3>Interface states</h3>
          <p>
            Change expression to reflect waiting, results or errors. Accompany the
            character with text explaining what happened.
          </p>
        </div>
        <div>
          <Character
            shape="circle"
            face={{ eyes: 'cartoon', mouth: 'beak', eyebrows: 'expression' }}
            expression="surprised"
            size={100}
            reducedMotion
          />
          <h3>Mascots and assistants</h3>
          <p>
            Bring your own silhouette and combine traits. Enable gaze and blink; use
            talking only for mouths that support opening.
          </p>
        </div>
      </div>
      <h3>Chat with avatars</h3>
      <p>
        Use a stable identity so messages from one person share color and shape.
        Expression can change per message without changing identity. In production, use
        the user ID as <code>name</code> and show the display name in the message.
      </p>
      <ChatPreview />
      <p>
        Names beside messages identify authors, so avatars are decorative. This example
        uses <code>reducedMotion</code> for a quiet conversation; enable blink when
        appropriate. Use expressions chosen by users or representing explicit chat states.
      </p>
      <CodeBlock code={chatExample} label="React chat" />
      <CodeBlock code={chatStylesExample} label="Chat CSS" />
    </section>
  );
}
