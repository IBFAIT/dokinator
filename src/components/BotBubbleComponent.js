'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';
import Scroll   from 'smoothscroll';

const makerImages = {
  flavio:  require('../images/docinator.jpg'),
  kaspar: require('../images/fred.png')
};

const BotBubbleComponent = ({text, templateVars}) => {
  // ToDo: Template engine implementation
  // for now: vars to fill in with template string in eval
  const {name, email, fieber} = templateVars;
  console.log(templateVars);
  return (
    <div className='botsinglebubble-component'>
      <div className='text'>
        {eval('`' + text + '`')}
      </div>
    </div>
  );
}

BotBubbleComponent.displayName = 'BotBubbleComponent';


export default BotBubbleComponent;
