'use strict';

import React from 'react';


let BotSingleBubbleComponent = ({text, data}) => (
  <div className="botsinglebubble-component">
  { (typeof text == 'array') ?
    text.map((txt, key) => (<div key={key} className="text">{eval('`'+txt+'`')}</div>))
    :
    [text].map((txt, key) => (<div key={key} className="text">{eval('`'+txt+'`')}</div>))
  }

  </div>
);

BotSingleBubbleComponent.displayName = 'BotSingleBubbleComponent';

// Uncomment properties you need
// BotSingleBubbleComponent.propTypes = {};
// BotSingleBubbleComponent.defaultProps = {};

export default BotSingleBubbleComponent;
