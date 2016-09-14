'use strict';

import React from 'react';

require('styles/ClientInputPast.scss');

let ClientInputPastComponent = ({valueContent}) => (
  <div className="clientinputpast-component">
    {valueContent}
  </div>
);

ClientInputPastComponent.displayName = 'ClientInputPastComponent';

// Uncomment properties you need
// ClientInputPastComponent.propTypes = {};
// ClientInputPastComponent.defaultProps = {};

export default ClientInputPastComponent;
