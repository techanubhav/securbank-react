import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import { isUniversalEditorEmbed } from './universalEditor';
import "@adobe/universal-editor-cors";

if (isUniversalEditorEmbed()) {
  document.documentElement.classList.add('ue-iframe');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(sendToVercelAnalytics);
