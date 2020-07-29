import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from 'styled-components';
import theme from './utils/theme';
import { Helmet } from 'react-helmet';
import GlobalStyle from './utils/globals';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Fragment>
        <Helmet>
          <title>Neumorphism Minesweeper</title>
          <meta
            name="description"
            content="A neumorphism minesweeper application"
          />
        </Helmet>
        <App />
        <GlobalStyle />
      </Fragment>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
