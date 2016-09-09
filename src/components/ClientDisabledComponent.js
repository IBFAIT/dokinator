'use strict';

import React from 'react';

require('styles/ClientDisabled.scss');

let ClientDisabledComponent = ({text}) => (
  <button className="clientdisabled-component">
    {text}
  </button>
);

ClientDisabledComponent.displayName = 'ClientDisabledComponent';

// Uncomment properties you need
// ClientDisabledComponent.propTypes = {};
// ClientDisabledComponent.defaultProps = {};

export default ClientDisabledComponent;
