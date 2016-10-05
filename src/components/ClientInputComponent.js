'use strict';

import React from 'react';

const ClientInputComponent = ({placeholder, path, index, changeVal, handleInputfieldEnter}) => (
    <div className="clientinput-component">
      <input
        {...{ placeholder: placeholder, onKeyPress: (e)=>handleInputfieldEnter(e, path, index, changeVal)}}
      />
    </div>
);

ClientInputComponent.displayName = 'ClientInputComponent';

export default ClientInputComponent;
