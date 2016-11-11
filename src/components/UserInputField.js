'use strict';

import React from 'react';

// generic Styles
import vals from '../styles/vals.js';

const Styl = {
  component: {
    display: 'inline-block',
    backgroundColor: vals.bubble.background.color,
    borderRadius: vals.bubble.border.radius,
    boxShadow: vals.bubble.boxShadow,
    padding: '.3rem',
    margin: '.5rem .2rem'
  },
  input: {
    padding: '.3rem',
    border: 'none'
  }
}

const UserInputField = ({placeholder, stepId, index, changeVal, handleInputfieldEnter}) => (
  <div style={Styl.component}>
    <input
      style={Styl.input}
      placeholder={placeholder}
      onKeyPress={evt => {handleInputfieldEnter({evt})}}
    />
  </div>
);

UserInputField.displayName = 'UserInputField';

export default UserInputField;
