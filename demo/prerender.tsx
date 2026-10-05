import { StrictMode } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Character } from '../src';
import { cat, planet, robot, shark } from '../src/shapes';
import { App } from './App';

export function renderPage(page: 'demo' | 'docs') {
  return renderToString(
    <StrictMode>
      <App initialPage={page} />
    </StrictMode>,
  );
}

export function renderSocialImage() {
  const characters = [shark, planet, cat, robot].map((shape, index) =>
    renderToStaticMarkup(
      <Character
        shape={shape}
        name={`FaceShape ${index}`}
        face={{ eyes: 'bright', mouth: 'cat', eyebrows: 'none' }}
        expression="happy"
        color={index % 2 ? '#dab785' : '#82c5d2'}
        size={220}
        reducedMotion
      />,
    ),
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#191a18"/><rect x="40" y="40" width="1120" height="550" rx="30" fill="#272824" stroke="#388697" stroke-width="2"/><text x="80" y="130" font-family="sans-serif" font-size="60" font-weight="700" fill="#f1eee7">faceshape-react</text><text x="80" y="186" font-family="sans-serif" font-size="28" fill="#dab785">Avatares SVG animados para React</text>${characters.map((svg, index) => `<g transform="translate(${90 + index * 270} 245)">${svg}</g>`).join('')}<text x="80" y="545" font-family="sans-serif" font-size="24" fill="#aaa99f">Formas · Expresiones · Animaciones · Tu propio personaje</text></svg>`;
}
