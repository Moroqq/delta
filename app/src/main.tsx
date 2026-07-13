import React from 'react';
import { createRoot } from 'react-dom/client';

// шрифты в бандле — работают офлайн, без сетевых запросов к Google Fonts
import '@fontsource/golos-text/400.css';
import '@fontsource/golos-text/500.css';
import '@fontsource/golos-text/600.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';

import { App } from './App';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
