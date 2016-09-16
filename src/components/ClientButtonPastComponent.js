'use strict';

import React from 'react';

import IconComponent from './IconComponent.js';

const ClientButtonPastComponent = ({text,name='DefaultName', avatar}) => (
  <div className="clientbuttonpast-component">
  <div className="bubble-inner">
    <IconComponent name={name} src={avatar.src} alt={avatar.alt} />
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
