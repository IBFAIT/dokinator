'use strict';

import React from 'react';

let ClientButtonPastComponent = ({text, className = 'client-part-past-button'}) => (
  <div {...{className}}>
    <div>
      { text }
    </div>
  </div>
);

ClientButtonPastComponent.displayName = 'ClientButtonPastComponent';

export default ClientButtonPastComponent;
