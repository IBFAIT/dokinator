'use strict';

import React from 'react';

// generic Styles
import genStyl from '../styles/genStyl.js';

const UserInputField = ({placeholder, path, index, changeVal, handleInputfieldEnter}) => (
      <input
        style={genStyl.inputOrButton}
        placeholder={placeholder}
        onKeyPress={evt => {handleInputfieldEnter({evt, path, index, changeVal})}}
      />
);

UserInputField.displayName = 'UserInputField';

export default UserInputField;
