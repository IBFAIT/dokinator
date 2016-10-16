'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';
import Scroll   from 'smoothscroll';

const makerImages = {
  flavio:  require('../images/docinator.jpg'),
  kaspar: require('../images/fred.png')
};

const BotBubbleComponent = ({text, templateVars, className = 'botsinglebubble-component', subClassNames = {txtContainer: 'text'}}) => {
  // ToDo: Template engine implementation
  // for now: vars to fill in with template string in eval
  const {name, email, fieber, persons} = templateVars;
  return (
    <div {...{className}}>
      <div className={subClassNames.txtContainer}>
        {eval('`' + text + '`')}
      </div>
    </div>
  );
}

BotBubbleComponent.displayName = 'BotBubbleComponent';


export default BotBubbleComponent;
