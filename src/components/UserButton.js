'use strict';

import React from 'react';

// generic Styles
import genStyl from '../styles/genStyl.js';
// Component styles
const Style = {
  display: 'inline-block',
  minWidth: '10%'
}

const UserButton = ({updatePathState, text, index, path}) => (
  <div className="user-button">
    <button {...{
      onClick: e => {
        updatePathState(e, {path, index});
      }
    }}>
      { text }
    </button>
  </div>
);

UserButton.displayName = 'UserButton';

export default UserButton;
