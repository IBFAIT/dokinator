'use strict';
import React from 'react';

const Bubble = ({children, onClick = 0, type}) => {
  return <div style={style(type)} onClick={onClick}>
      {children}
    </div>;
}

Bubble.displayName = 'Bubble';

const style = (type) => {
  const basic = {
        alignSelf: 'flex-start',
        maxWidth: '80%',
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
        paddingBottom: '.7rem',
        paddingLeft: '.9rem',
        lineHeight: 1.6,
        backgroundColor: '#fff',
        boxShadow: '0px 1px 1px rgba(0,0,0,0.2)'
    };

  switch (type) {
    case 'input':
      return {...basic, ...{
        display: 'inline-block',
        alignSelf: 'center'
      }};
    case 'disabled':
      return {...basic, ...{
        display: 'inline-block',
        backgroundColor: 'rgba(193, 193, 193, 0.5)'
      }};
    case 'button':
      return {...basic, ...{
        display: 'inline-block',
        backgroundColor: '#008ABC',
        color: '#fff',
        alignSelf: 'center'
      }};
    case 'past':
      return {...basic, ...{
        marginTop: '1rem',
        alignSelf: 'flex-end',
        backgroundColor: '#008ABC',
        color: '#fff'
      }};
  }
  return basic;
}

export default Bubble;
