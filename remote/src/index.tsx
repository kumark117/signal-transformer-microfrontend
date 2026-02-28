import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './SignalTransformer';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App multiplier={1} onResult={() => {}} onClear={() => {}} />
  </React.StrictMode>
);
