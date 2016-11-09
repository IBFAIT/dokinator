'use strict';

import React    from 'react';

const makerImages = {
  flavio:  require('../images/docinator.jpg'),
  kaspar: require('../images/fred.png')
};

const BotBubble = ({text, templateVars}) => {
  // ToDo: Template engine implementation
  // for now: vars to fill in with template string in eval
  const {name, email, fieber, persons} = templateVars;
  return (
    <div className="bot-bubble">
      <div className="text">
        {eval('`' + text + '`')}
      </div>
    </div>
  );
}

BotBubble.displayName = 'BotBubble';


export default BotBubble;
