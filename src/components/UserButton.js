'use strict';

import React from 'react';

// generic Styles
import vals from '../styles/vals.js';

const typeStyl = {
  default: {
    display: 'inline-block',
    margin: '0.5rem 0.2rem',
    padding: vals.bubblePadding,
    borderRadius: vals.bubbleBorderRadius,
    boxShadow: '0.03rem 0.07rem 0 0 rgba(180, 180, 180, 0.5)',
    backgroundColor: vals.bubbleBg
  },
  disabled: {
    color: 'rgba(0,0,0, 0.2)',
    boxShadow: '0.03rem 0.07rem 0 0 rgba(180, 180, 180, 0.1)'
  },
  past: {
    alignSelf: 'flex-end'
  }
}

const UserButton = ({updatePathState, text, index, path, type = null}) => {
  let Style = typeStyl.default; // Generic Style

  // Styles for disabled buttons
  Style = (type === 'disabled') ? {...Style, ...typeStyl.disabled} : Style;
  Style = (type === 'past') ? {...Style, ...typeStyl.past } : Style;
  // dynprops
  let dynProps = (type === null) ? {onClick: e => {updatePathState(e, {path, index})}} : {};

  return (
    <div style={Style} {...{...dynProps}}>
      {text}
    </div>
  );
}


UserButton.displayName = 'UserButton';

export default UserButton;
