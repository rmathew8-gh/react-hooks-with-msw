import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './SimpleChatPreview';
import { worker } from './mocks/browser';

// Start the mock service worker
worker.start().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
