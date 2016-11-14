'use strict';
import React from 'react';

const avatarImgs = {
  doc:  require('../images/docinator.jpg'),
  fred: require('../images/fred.png'),
}

const BotPart = ({children, botIdentity}) => {
  const {avatar, txtName, name} = botIdentity;
  return  (
    <div style={style()}>
      <div style={style('avatarPart')}>
        <div style={style('botName')}>
          {txtName}
        </div>
        <div>
          <img
            style={style('botImg')}
            title={avatar.title}
            alt={avatar.alt}
            src={avatarImgs[name]}
          />
        </div>
      </div>
      <div style={style('bubbleContainer')}>
        {children}
      </div>
    </div>
  );
}
BotPart.displayName = 'BotPart';

const style = (type) => {
  switch (type) {
    case 'bubbleContainer':
      return {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          width: '100%',
          maxWidth: '100%'
        };
      case 'avatarPart':
        return {
          flex: '0 0 20%',
          alignSelf: 'flex-start',
          disply: 'inline-block',
          minWidth: 44,
          maxWidth: 44,
          marginRight: '.6rem'
        };
      case 'botName':
        return {
          position: 'relative',
          display: 'inline-block',
          right: '-4.7rem',
          top: '-1.5rem',
          color: '#888',
          fontSize: '.77rem'
        };
      case 'botImg':
        return {
          display: 'block',
          width: 40,
          height: 40,
          margin: '-1rem auto 0'
        }
  }
  return {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: '2rem',
    marginLeft: '0.4rem',
    marginRight: '0.4rem'
  };
}

export default BotPart;
