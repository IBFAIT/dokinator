'use strict';

import React from 'react';

const UserInputField = ({placeholder, path, index, changeVal, handleInputfieldEnter}) => (
    <div className="user-input-field">
      <input
        placeholder={placeholder}
        onKeyPress={evt => {handleInputfieldEnter({evt, path, index, changeVal})}}
      />
    </div>
);

UserInputField.displayName = 'UserInputField';

export default UserInputField;
