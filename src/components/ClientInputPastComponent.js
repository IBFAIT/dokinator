'use strict';

import React from 'react';

import IconComponent from './IconComponent.js';

const ClientInputPastComponent = ({valueContent, name, avatar}) => (
  <div className="clientinputpast-component">
    <div className="bubble-inner">
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
