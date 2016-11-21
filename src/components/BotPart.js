'use strict';
import React from 'react';

const avatarImgs = {
  doc:  require('../images/docinator.jpg'),
  fred: require('../images/fred.png'),
  beat: require('../images/fred.png')
}

const BotPart = ({children, botIdentity, type}) => {
  const {avatar, txtName, name} = botIdentity;
  return  (
    <div style={style({part: null})}>
      <div style={style({part: 'avatarPart', type})}>
        <div style={style({part: 'botName', type})}>
          {txtName}
        </div>
        <div>
          <img
            style={style({part: 'botImg', type})}
            title={avatar.title}
            alt={avatar.alt}
            src={avatarImgs[name]}
          />
        </div>
      </div>
      <div style={style({part: 'bubbleContainer'})}>
        {children}
      </div>
    </div>
  );
}
BotPart.displayName = 'BotPart';

const style = ({part = null, type}) => {
  switch (part) {
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
        const nameAnim = (type=='speaking') ? {
            animationName: 'nameAnimation',
            animationDelay: 0,
            animationDuration: '900ms'
          } : {};
        return {
          ...nameAnim,
          position: 'relative',
          display: 'inline-block',
          right: '-4.7rem',
          top: '-1.5rem',
          color: '#888',
          fontSize: '.77rem'
        };
      case 'botImg':
        const imgAnim = (type == 'speaking') ? {
            animationName: 'imgAnimation',
            animationDelay: 0,
            animationDuration: '1100ms'
          } : {};
        return {
          ...imgAnim,
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
