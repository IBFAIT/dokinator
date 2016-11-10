'use strict';

import React    from 'react';

const makerImages = {
  flavio:  require('../images/docinator.jpg'),
  kaspar: require('../images/fred.png')
};

// generic styles
import genStyl from '../styles/genStyl.js';

const Styl = {
  component: {
    marginTop: '0.2rem',
    marginBottom: '0.2rem',
    opacity: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: '80%',
    minHeight: '30px',
    padding: '0',
    borderRadius: '.3rem',
    backgroundColor: '#fff',
    boxShadow: '.01rem .05rem 0 0 rgba(180, 180, 180, 0.5)',
    alignSelf: 'flex-start'
  },
  txt: {
    flex: '1 1 auto',
    alignSelf: 'stretch',
    display: 'inline-block',
    minWidth: '5%',
    margin: 0,
    padding: '.6rem .5rem'
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
