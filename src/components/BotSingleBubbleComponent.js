'use strict';

import React from 'react';


let BotSingleBubbleComponent = ({text}) => (
  <div className="botsinglebubble-component">
    <div className="text">{eval('`'+text+'`')}</div>
  </div>
);

BotSingleBubbleComponent.displayName = 'BotSingleBubbleComponent';

// Uncomment properties you need
// BotSingleBubbleComponent.propTypes = {};
// BotSingleBubbleComponent.defaultProps = {};

export default BotSingleBubbleComponent;
