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
  background-color: ${(props) =>
    props.selectedTheme === 'light'
      ? props.theme.colors.lightMainColor
      : props.theme.colors.darkMainColor};
`;

const ThemeButton = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background: ${(props) =>
    props.selectedTheme === 'light'
      ? props.theme.colors.lightMainColor
      : 'linear-gradient(144.05deg, #32383E -69.07%, #17191C 122.22%)'};
  box-shadow: ${(props) =>
    props.selectedTheme === 'light'
      ? ' -4px -2px 16px #FFFFFF, 4px 2px 16px rgba(136, 165, 191, 0.48)'
      : '-4px -2px 16px rgba(195, 200, 205, 0.08), 4px 4px 18px rgba(0, 0, 0, 0.5);'};
  border-radius: 50%;
  position: absolute;
  right: 2vw;
  top: 2vh;
`;

const App = ({ config, updateConfig }) => {
  function handleModeChange() {
    config.theme === 'light'
      ? updateConfig({ theme: 'dark' })
      : updateConfig({ theme: 'light' });
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
