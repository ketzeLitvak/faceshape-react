import { Character } from '../../../src';
import { ChatPreview } from '../ChatPreview';
import { CodeBlock } from '../CodeBlock';
import { chatExample, chatStylesExample } from '../examples';

export function UseCases() {
  return (
    <section id="docs-cases">
      <h2>Casos de uso</h2>
      <div className="docs-cases">
        <div>
          <Character
            name="Perfil"
            face={{ eyes: 'bright', mouth: 'tongue', eyebrows: 'expression' }}
            expression="happy"
            size={100}
            reducedMotion
          />
          <h3>Avatares</h3>
          <p>
            Usá un nombre estable por usuario para reproducir color y silueta. Agregá una
            etiqueta accesible si representa a una persona.
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
          <h3>Estados de interfaz</h3>
          <p>
            Cambiá la expresión según el estado: espera, resultado o error. Acompañá al
            personaje con texto que explique lo ocurrido.
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
          <h3>Mascotas y asistentes</h3>
          <p>
            Traé tu propia silueta y combiná rasgos. Activá mirada y parpadeo; usá habla
            sólo para bocas que admitan apertura.
          </p>
        </div>
      </div>
      <h3>Chat con avatares</h3>
      <p>
        Usá una identidad estable para que los mensajes de una misma persona compartan
        color y forma. La expresión puede cambiar por mensaje sin cambiar su identidad. En
        producción podés usar el ID de usuario como name y mostrar su nombre en el texto.
      </p>
      <ChatPreview />
      <p>
        Los nombres escritos junto a cada mensaje identifican al autor, por eso los
        avatares son decorativos. El ejemplo usa reducedMotion para una conversación
        tranquila; podés habilitar parpadeo cuando corresponda. Usá expresiones que el
        usuario elija o que representen estados explícitos del chat.
      </p>
      <CodeBlock code={chatExample} label="Chat con React" />
      <CodeBlock code={chatStylesExample} label="CSS del chat" />
    </section>
  );
}
