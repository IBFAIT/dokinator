'use strict';

import React from 'react';

let ClientButtonPastComponent = ({text, className = 'clientbuttonpast-component'}) => (
  <div {...{className}}>
    <div>
      { text }
    </div>
  </div>
);

ClientButtonPastComponent.displayName = 'ClientButtonPastComponent';

export default ClientButtonPastComponent;
