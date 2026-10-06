export const basicExample = `import { Character, type FaceConfig } from 'faceshape-react';

const face: FaceConfig = {
  eyes: 'bright',
  mouth: 'tongue',
  eyebrows: 'expression',
};

export function Avatar() {
  return (
    <Character
      name="Luna"
      shape="blob"
      face={face}
      expression="happy"
      size={180}
      label="Luna is happy"
      motion={{ idle: true, blink: true }}
    />
  );
}`;

export const identityExample = `<Character
  name="Luna"
  shape="triangle"
  face={{ eyes: 'capsule', mouth: 'standard', eyebrows: 'expression' }}
  expression="sad"
  color="#388697"
  motion={{ idle: true, glance: true }}
/>`;

export const motionExample = `<Character
  name="Assistant"
  face={{ eyes: 'cartoon', mouth: 'toothy', eyebrows: 'expression' }}
  expression="surprised"
  motion={{ blink: true, talking: true, lookAt: 'cursor' }}
  transition={{ duration: 350, easing: 'ease-in-out' }}
/>

// Normalized coordinates: the center is { x: 0.5, y: 0.5 }.
// To look toward the top right:
// motion={{ lookAt: { x: 1, y: 0 } }}`;

export const customPathExample = `import { Character, defineShape } from 'faceshape-react';

const heart = defineShape({
  path: 'M50 88 C40 79 7 57 7 31 C7 9 37 5 50 24 C63 5 93 9 93 31 C93 57 60 79 50 88Z',
  viewBox: '0 0 100 100',
  faceBox: { x: 0.23, y: 0.27, width: 0.54, height: 0.4 },
});

<Character
  shape={heart}
  face={{ eyes: 'bright', mouth: 'cat', eyebrows: 'expression' }}
  expression="happy"
/>`;

export const customRenderExample = `import { Character, type CustomShape } from 'faceshape-react';

const monitor: CustomShape = {
  viewBox: '0 0 100 100',
  faceBox: { x: 0.22, y: 0.20, width: 0.56, height: 0.42 },
  render: ({ color }) => (
    <g>
      <rect x={10} y={8} width={80} height={66} rx={8} fill={color} />
      <rect x={16} y={14} width={68} height={52} rx={4} fill="#f5f0e5" />
      <path d="M44 74 H56 V88 H44Z M30 88 H70 V94 H30Z" fill={color} />
    </g>
  ),
};

<Character
  shape={monitor}
  face={{ eyes: 'dots', mouth: 'standard', eyebrows: 'none' }}
  expression="happy"
/>`;

export const variationExample = `import {
  Character,
  defineShape,
  varyShape,
  type CustomShape,
} from 'faceshape-react';

const base = defineShape({
  path: 'M15 10 H85 V90 H15Z',
  faceBox: { x: 0.25, y: 0.28, width: 0.5, height: 0.45 },
  rotationRange: 10,
});

const card: CustomShape = {
  ...base,
  fromName: (name) => varyShape(base, name, 'card'),
};

<Character
  name="Luna"
  shape={card}
  face={{ eyes: 'bright', mouth: 'tongue', eyebrows: 'expression' }}
  expression="happy"
/>`;

export const randomExample = `import { createNameRandom, type CustomShape } from 'faceshape-react';

function robotFromName(name: string | number): CustomShape {
  const random = createNameRandom(name, 'robot');
  const width = 60 + random() * 20;
  const left = 50 - width / 2;

  return {
    // The face box follows the body proportions.
    faceBox: { x: (left + 8) / 100, y: 0.25,
      width: (width - 16) / 100, height: 0.4 },
    render: ({ color }) => (
      <rect x={left} y={10} width={width} height={80} rx={10} fill={color} />
    ),
  };
}

const robot: CustomShape = {
  ...robotFromName('base'),
  fromName: robotFromName,
};`;

export const compositionExample = `import { Character, Face, Eyes, Mouth, Eyebrows } from 'faceshape-react';

const face = {
  eyes: 'bright', mouth: 'beak', eyebrows: 'expression',
} as const;

<Character face={face} expression="happy">
  <Face {...face}>
    <Eyebrows variant={face.eyebrows} />
    <Eyes variant={face.eyes} />
    <Mouth variant={face.mouth} />
  </Face>
</Character>`;

export const expressionExample = `import { Character, defineExpression } from 'faceshape-react';

const curious = defineExpression({
  eyeOpen: 1.1,
  eyeAngle: -4,
  mouthCurve: 0.3,
  mouthOpen: 0.2,
  browLift: -3,
  browOpacity: 1,
});

<Character
  face={{ eyes: 'bright', mouth: 'tongue', eyebrows: 'expression' }}
  expression={curious}
  transition={{ duration: 400, easing: 'ease-out' }}
/>`;

export const chatExample = `import { Character, type ExpressionName } from 'faceshape-react';

const messages: {
  id: string;
  name: string;
  text: string;
  expression: ExpressionName;
}[] = [
  { id: '1', name: 'Eze', text: 'Hi! Can we use these characters in the chat?', expression: 'happy' },
  { id: '2', name: 'Sofi', text: 'Yes, each person keeps their avatar by name.', expression: 'neutral' },
  { id: '3', name: 'Eze', text: '¡Qué bueno! El mío también puede cambiar de expresión.', expression: 'surprised' },
];

export function ChatMessages() {
  return (
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
  );
}`;

export const chatStylesExample = `.chat-messages {
  display: grid;
  gap: 20px;
  padding: 24px;
  margin: 0;
  list-style: none;
}
.chat-message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
}
.chat-message > svg { flex: 0 0 56px; }
.chat-bubble {
  min-width: 0;
  padding: 14px 18px;
  border-radius: 4px 16px 16px;
  background: #262832;
  color: #f4f4f5;
  overflow-wrap: anywhere;
}
.chat-bubble strong { color: #a7e8cc; }
.chat-bubble p { margin: 6px 0 0; }`;
