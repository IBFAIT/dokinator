'use strict';

import React from 'react';

let ClientButtonPastComponent = ({text, className = 'clientbuttonpast-component', subClassNames = { text: 'text'}}) => (
  <div {...{className}}>
    <div className={subClassNames.text}>
      { text }
    </div>
  </div>
);

ClientButtonPastComponent.displayName = 'ClientButtonPastComponent';

export default ClientButtonPastComponent;
