// local
import Form from './components/Form';
import theme from './theme';

// redux
import { Provider } from 'react-redux';
import configureStore from './redux/store';

// ui
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

// Styles
import './WordAnalyzerApp.css';

function WordAnalyzerApp() {
  return (
    <Provider store={configureStore()}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='AppWrapper'>
          <Form />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default WordAnalyzerApp;
