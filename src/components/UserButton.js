'use strict';

import React from 'react';

// generic Styles
import vals from '../styles/vals.js';

const typeStyl = {
  default: {
    display: 'inline-block',
    margin: '0.5rem 0.2rem',
    padding: vals.bubble.padding.top,
    borderRadius: vals.bubble.border.radius,
    boxShadow: vals.bubble.boxShadow,
    backgroundColor: vals.bubble.background.color,
    fontSize: vals.bubble.font.size,
    lineHeight: vals.bubble.lineHeight,
    paddingTop: vals.bubble.padding.top,
    paddingRight: vals.bubble.padding.right,
    paddingBottom: vals.bubble.padding.bottom,
    paddingLeft: vals.bubble.padding.left,
    color: vals.user.button.color,
    backgroundColor: vals.user.button.background.color
  },
  disabled: {
    color: 'rgba(0,0,0, 0.2)'
  },
  past: {
    alignSelf: 'flex-end',
    backgroundColor: vals.bubble.background.color,
    color: vals.bubble.color
  }
}

const UserButton = ({updatePathState, text, index, path, type = null}) => {
  let Style = typeStyl.default; // Generic Style

  // Styles for disabled buttons
  Style = (type === 'disabled') ? {...Style, ...typeStyl.disabled} : Style;
  Style = (type === 'past') ? {...Style, ...typeStyl.past} : Style;
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
