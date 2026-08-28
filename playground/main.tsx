import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/styles/index.css';
import './playground.css';
import { Playground } from './Playground';

const container = document.getElementById('root');
if (!container) throw new Error('playground: #root not found');

createRoot(container).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
);
