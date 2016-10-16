'use strict';

import React from 'react';

const ClientInputPastComponent = ({placeholder, path, index, changeVal, handleInputfieldEnter, className = 'client-answer-input'}) => (
    <div {...{className}}>
      <input
        {...{
          placeholder: placeholder,
          onKeyPress: evt => handleInputfieldEnter({evt, path, index, changeVal})
        }}
      />
    </div>
);

ClientInputPastComponent.displayName = 'ClientInputPastComponent';

export default ClientInputPastComponent;
