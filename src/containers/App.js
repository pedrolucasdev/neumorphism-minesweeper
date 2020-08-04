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

  &.light {
    background-color: ${props => props.theme.colors.lightMainColor};
  }

  &.dark {
    background-color: ${props => props.theme.colors.darkMainColor};
  }
`;

const ThemeButton = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border-radius: 50%;
  position: absolute;
  right: 2vw;
  top: 2vh;

  ${AppWrapper}.light & {
    background: ${props => props.theme.colors.lightMainColor};
    box-shadow: -4px -2px 16px #ffffff, 4px 2px 16px rgba(136, 165, 191, 0.48);
  }

  ${AppWrapper}.dark & {
    background: linear-gradient(144.05deg, #32383e -69.07%, #17191c 122.22%);
    box-shadow: -4px -2px 16px rgba(195, 200, 205, 0.08),
      4px 4px 18px rgba(0, 0, 0, 0.5);
  }
`;

const App = ({ config, updateConfig }) => {
  function handleModeChange() {
    config.theme === 'light'
      ? updateConfig({ theme: 'dark' })
      : updateConfig({ theme: 'light' });
  }

  return (
    <AppWrapper className={config.theme}>
      <ThemeButton className="themeChanger" onClick={handleModeChange}>
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
