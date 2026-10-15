import React from 'react';
import ReactDOM from 'react-dom';

// local
import WordAnalyzerApp from './WordAnalyzerApp';

// Styles
import './index.css';

ReactDOM.render(
  <React.StrictMode>
      <WordAnalyzerApp />
  </React.StrictMode>,
  document.getElementById('root')
);
