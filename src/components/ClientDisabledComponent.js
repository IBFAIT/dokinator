'use strict';

import React from 'react';

const ClientDisabledComponent = ({text, className = 'clientdisabled-component'}) => (
  <div {...{className}}>
    <button>
      {text}
    </button>
  </div>
);

ClientDisabledComponent.displayName = 'ClientDisabledComponent';

export default ClientDisabledComponent;
