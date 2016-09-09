'use strict';

import React from 'react';

require('styles/ClientInputPast.scss');

let ClientInputPastComponent = ({valueContent}) => (
  <input
    className="clientinputpast-component"
    value={valueContent}
  />
);

ClientInputPastComponent.displayName = 'ClientInputPastComponent';

// Uncomment properties you need
// ClientInputPastComponent.propTypes = {};
// ClientInputPastComponent.defaultProps = {};

export default ClientInputPastComponent;
