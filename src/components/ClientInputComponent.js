'use strict';

import React from 'react';

const ClientInputComponent = ({placeholder, path, index, changeVal, handleInputfieldEnter, className = 'client-answer-input'}) => (
    <div {...{className}}>
      <input
        {...{
          placeholder: placeholder,
          onKeyPress: evt => handleInputfieldEnter({evt, path, index, changeVal})
        }}
      />
    </div>
);

ClientInputComponent.displayName = 'ClientInputComponent';

export default ClientInputComponent;
