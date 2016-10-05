'use strict';

import React from 'react';
const dots = require('../images/images/dots.svg');

let BotSingleBubbleComponent = ({text, data, name, email}) => (
  <div className="botsinglebubble-component">
    <div className="text">{
      eval('`'+text+'`')}</div>
  </div>
);

BotSingleBubbleComponent.displayName = 'BotSingleBubbleComponent';

// Uncomment properties you need
// BotSingleBubbleComponent.propTypes = {};
// BotSingleBubbleComponent.defaultProps = {};

export default BotSingleBubbleComponent;
