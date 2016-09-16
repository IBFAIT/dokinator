'use strict';

import React from 'react';

const ClientDisabledComponent = ({text}) => (
  <div className="clientdisabled-component">
    <button>
      {text}
    </button>
  </div>
);

ClientDisabledComponent.displayName = 'ClientDisabledComponent';

// Uncomment properties you need
// ClientDisabledComponent.propTypes = {};
// ClientDisabledComponent.defaultProps = {};

export default ClientDisabledComponent;
