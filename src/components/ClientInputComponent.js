'use strict';

import React from 'react';

require('styles/ClientInput.scss');

let ClientInputComponent = ({placeholder, handleInput, path, handleEnter}) => (
    <input
      className="clientinput-component"
      placeholder={placeholder}
      onChange={handleInput}
      onKeyPress={(e)=>handleEnter(e, path)}
    />
);

ClientInputComponent.displayName = 'ClientInputComponent';

export default ClientInputComponent;
