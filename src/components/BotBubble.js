'use strict';

import React    from 'react';

const makerImages = {
  flavio:  require('../images/docinator.jpg'),
  kaspar: require('../images/fred.png')
};

// generic styles
import vals from '../styles/vals.js';

const Styl = {
  component: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    maxWidth: '80%',
    minHeight: '30px',
    padding: 0,
    marginTop: vals.bubble.margin.top,
    marginBottom: vals.bubble.margin.bottom,
    borderRadius: vals.bubble.border.radius,
    borderColor: vals.bubble.border.color,
    backgroundColor: vals.bubble.background.color,
    boxShadow: vals.bubble.boxShadow
  },
  txt: {
    flex: '1 1 auto',
    alignSelf: 'stretch',
    display: 'inline-block',
    minWidth: '5%',
    margin: 0,
    padding: vals.bubble.padding.top + ' ' + vals.bubble.padding.right
  }
}

const BotBubble = ({bubbleText, templateVars}) => {
  // ToDo: Template engine implementation
  // for now: vars to fill in with template string in eval
  const {name, email, fieber, persons} = templateVars;
  return (
    <div style={Styl.component}>
      <div style={Styl.txt}>
        {eval('`' + bubbleText + '`')}
      </div>
    </div>
  );
}

BotBubble.displayName = 'BotBubble';


export default BotBubble;
