'use strict';

import React from 'react';

import IconComponent from './IconComponent.js';

const ClientInputPastComponent = ({valueContent, name, avatar}) => (
  <div className="clientinputpast-component">
  <div>
      <IconComponent name={name} src={avatar.src} alt={avatar.alt} />
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
