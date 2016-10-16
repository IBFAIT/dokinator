'use strict';

import React from 'react';

const ClientDisabledComponent = ({text, className = 'client-answer-disabled'}) => (
  <div {...{className}}>
    <button>
      {text}
    </button>
  </div>
);

ClientDisabledComponent.displayName = 'ClientDisabledComponent';

export default ClientDisabledComponent;
