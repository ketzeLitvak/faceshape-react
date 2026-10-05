import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './style.css';
import './components/playground.css';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Missing demo root element');
}

const initialPage = root.dataset.page === 'docs' ? 'docs' : 'demo';
const app = (
  <StrictMode>
    <App initialPage={initialPage} />
  </StrictMode>
);
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
