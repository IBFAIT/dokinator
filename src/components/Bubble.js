'use strict';

import React from 'react';


let StylVariants = {
  default: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        maxWidth: '80%',
        minHeight: '30px',
        color: '#000',
        borderRadius: '.3rem',
        borderWidth: '.01rem',
        borderColor: '#000',
        fontSize: '1rem',
        marginTop: '.5rem',
        marginRight: '.5rem',
        marginBottom: '.5rem',
        marginLeft: '.5rem',
        paddingTop: '.6rem',
        paddingRight: '.7rem',
        paddingBottom: '.3rem',
        paddingLeft: '.9rem',
        lineHeight: 1.6,
        backgroundColor: '#fff',
        boxShadow: '0px 1px 1px rgba(0,0,0,0.2)'
    },
    disabled: {
      display: 'inline-block'
    },
    input: {
      display: 'inline-block'
    },
    userPast: {
      display: 'inline-block'
    }
}

const Styl = ({type, userPast}) => {
  if(userPast) {
    StylVariants.default = {...StylVariants.default, ...StylVariants.userPast};
  }
  switch (type) {
    case 'default':
      return StylVariants.default;
    case 'input':
      return {...StylVariants.default, ...StylVariants.input};
    case 'disabled':
      return {...StylVariants.default, ...StylVariants.disabled};
    case 'forward':
      return {display: 'none'};
    default:
      return StylVariants.default;

  }
}

const Bubble = ({children, onClick = 0, type = 'default', userPast}) => {
  return <div style={Styl({userPast, type})} onClick={onClick}>
      {children}
    </div>;
}

Bubble.displayName = 'Bubble';

export default Bubble;
