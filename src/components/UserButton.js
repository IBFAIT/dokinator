'use strict';

import React from 'react';

// generic Styles
import genStyl from '../styles/genStyl.js';

const typeStyl = {
  disabled: {
    color: 'rgba(0,0,0, 0.2)',
    boxShadow: '0.03rem 0.07rem 0 0 rgba(180, 180, 180, 0.1)'
  },
  past: {
    alignSelf: 'flex-end'
  }
}

const UserButton = ({updatePathState, text, index, path, type = null}) => {
  let Style = genStyl.inputOrButton; // Generic Style

  // Styles for disabled buttons
  Style = (type === 'disabled') ? {...Style, ...typeStyl.disabled} : Style;
  Style = (type === 'past') ? {...Style, ...typeStyl.past } : Style;
  // dynprops
  let dynProps = (type === null) ? {onClick: e => {updatePathState(e, {path, index})}} : {};

  return (
    <button style={Style} {...{...dynProps}}>
      {text}
    </button>
  );
}

UserButton.displayName = 'UserButton';

export default UserButton;
