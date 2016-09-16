'use strict';

import React from 'react';

let ClientInputPastComponent = ({valueContent}) => (
  <div className="clientinputpast-component">
  <div>
    <div className="icon">ClientName is very long hey </div>
    <div className="text">
      {valueContent}
    </div>
    </div>
  </div>
);

ClientInputPastComponent.displayName = 'ClientInputPastComponent';

// Uncomment properties you need
// ClientInputPastComponent.propTypes = {};
// ClientInputPastComponent.defaultProps = {};

export default ClientInputPastComponent;
