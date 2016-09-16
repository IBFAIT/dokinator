'use strict';

import React from 'react';

const ClientInputComponent = ({placeholder, onChange, path, handleEnter, index}) => (
    <div className="clientinput-component">
        <input
          placeholder={placeholder}
          onChange={onChange}
          onKeyPress={(e)=>handleEnter(e, path, index)}
        />
    </div>
);

ClientInputComponent.displayName = 'ClientInputComponent';

export default ClientInputComponent;
