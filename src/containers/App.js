import React from 'react';
import styled from 'styled-components';
import { updateConfig } from '../actions';
import Minesweeper from './Minesweeper';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: ${props =>
    props.selectedTheme == 'light'
      ? props.theme.colors.lightBackground
      : props.theme.colors.darkBackground};
`;

const ThemeButton = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background-color: ${props =>
    props.selectedTheme == 'light'
      ? props.theme.colors.lightMainColor
      : props.theme.colors.darkMainColor};
  box-shadow: ${props =>
    props.selectedTheme == 'light'
      ? '5px 5px 10px 10px rgba(0, 0, 0, 0.1)'
      : '5px 5px 10px 10px rgba(255,255,255, 0.1)'};
  border-radius: 50%;
  position: absolute;
  right: 2vw;
  top: 2vh;
`;

const App = ({ config, updateConfig }) => {
  function handleModeChange() {
    if (config.theme == 'light') {
      updateConfig({ theme: 'dark' });
    } else {
      updateConfig({ theme: 'light' });
    }
  }

  return (
    <AppWrapper selectedTheme={config.theme}>
      <ThemeButton selectedTheme={config.theme} onClick={handleModeChange}>
        <FontAwesomeIcon
          icon={config.theme === 'light' ? faMoon : faSun}
          style={{ color: '#4C6D7E' }}
        />
      </ThemeButton>
      <Minesweeper />
    </AppWrapper>
  );
};

const mapStateToProps = ({ config }) => {
  return { config };
};

export default connect(mapStateToProps, { updateConfig })(App);
