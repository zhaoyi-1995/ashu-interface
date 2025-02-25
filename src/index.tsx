// import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@pages/App';
import './style.css';
import './wdyr';

const container = document.getElementById('app')!;

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
