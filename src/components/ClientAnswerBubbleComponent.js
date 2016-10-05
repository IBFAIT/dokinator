'use strict';

import React from 'react';

import IconComponent from './IconComponent.js';

const ClientAnswerBubble = ({text,name='DefaultName', avatar}) => (
  <div className="clientbuttonpast-component">
    <div>
      <IconComponent {...{name, src: avatar.src, alt: avatar.alt}} />
      <div className="text">
        { text }
      </div>
    </div>
  </div>
);

ClientAnswerBubble.displayName = 'ClientAnswerBubble';

// Uncomment properties you need
// ClientButtonComponent.propTypes = {};
// ClientButtonComponent.defaultProps = {};

export default ClientAnswerBubble;
