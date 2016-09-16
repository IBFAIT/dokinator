'use strict';

import React from 'react';

const ClientInputComponent = ({placeholder, onChange, path, handleEnter, index}) => (
    <input
      className="clientinput-component"
      placeholder={placeholder}
      onChange={onChange}
      onKeyPress={(e)=>handleEnter(e, path, index)}
    />
);

ClientInputComponent.displayName = 'ClientInputComponent';

export default ClientInputComponent;
