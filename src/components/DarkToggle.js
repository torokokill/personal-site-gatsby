import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { ClassNames } from '@emotion/core';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import Toggle from 'react-toggle';
import './DarkToggle.css';
import { darkColors } from '../utils/colors';

function DarkToggle() {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <ClassNames>
          {({ css }) => (
            <Toggle
              checked={theme === 'dark'}
              className={css`
                margin-top: auto;
                margin-bottom: auto;

                & svg {
                  color: ${darkColors.bodyColor};
                  width: 10px;
                  height: 10px;
                }
              `}
              icons={{
                checked: <FaMoon />,
                unchecked: <FaSun />,
              }}
              onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
            />
          )}
        </ClassNames>
      )}
    </ThemeToggler>
  );
}

DarkToggle.propTypes = {};

export default DarkToggle;