'use strict';

import React from 'react';

let ClientButtonComponent = ({updatePathState, text, index, path, className = 'clientbutton-component'}) => (
  <div {...{className}}>
    <button {...{
      onClick: e => updatePathState(e, {path, index})
    }}>
      { text }
    </button>
  </div>
);

ClientButtonComponent.displayName = 'ClientButtonComponent';

export default ClientButtonComponent;
