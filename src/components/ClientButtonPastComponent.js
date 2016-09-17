'use strict';

import React from 'react';

import IconComponent from './IconComponent.js';

const ClientButtonPastComponent = ({text,name='DefaultName', avatar}) => (
  <div className="clientbuttonpast-component">
    <div className="bubble-inner">
      <div className="text">
        { text }
      </div>
    </div>
  </div>
);

ClientButtonPastComponent.displayName = 'ClientButtonPastComponent';

// Uncomment properties you need
// ClientButtonComponent.propTypes = {};
// ClientButtonComponent.defaultProps = {};

export default ClientButtonPastComponent;
