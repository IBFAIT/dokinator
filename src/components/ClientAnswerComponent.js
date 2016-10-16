'use strict';

import React    from 'react';

import { Component, Children, PropTypes } from 'react';
import { Motion, spring, presets } from 'react-motion';

import ClientButtonComponent   from './ClientButtonComponent.js';
import ClientInputComponent    from './ClientInputComponent.js';
import ClientDisabledComponent from './ClientDisabledComponent.js';



const ClientAnswerComponent = ({className = 'user-answers', botHere, ...props}) => {
  return (
    <div {...{className}}>

      <Motion style={{x: spring(botHere ? 600 : 0)}}>
        {({x}) =>
          <div style={{borderRadius: 4,
            backgroundColor: '#ccc',
            position: 'relative',
            width: 650,
          height: 50}}>
            <div style={Object.assign({}, {
              position: 'absolute',
              width: 50,
              height: 50,
              borderRadius: 4,
              backgroundColor: 'yellow'
            }, {
              WebkitTransform: `translate3d(${x}px, 0, 0)`,
              transform: `translate3d(${x}px, 0, 0)`,
            })} />
          </div>
        }
      </Motion>
      { renderClientBubbles(props) }
    </div>
  );
}

const renderClientBubbles = ({
  answers,
  callbacks,
  subClassNames = {
    clientInputComponent: 'clientinput-component',
    clientButtonComponent: 'clientbutton-component',
    clientAnswerComponent: 'clientdisabled-component'
  }
}) => {
  const {handleInputfieldEnter, handleForwardTimeout, updatePathState} = callbacks;
  return answers.map(({type, text, path, placeholder, changeVal}, key) => {
    switch (type) {
      case 'input':
        return <ClientInputComponent key={key} {...{
          placeholder,
          path,
          text,
          changeVal,
          index: key,
          handleInputfieldEnter,
          className: subClassNames.clientInputComponent
        }} />;
      case 'button':
        return <ClientButtonComponent key={key} {...{
          index: key,
          text,
          path,
          updatePathState,
          className: subClassNames.clientButtonComponent
        }} />;
      case 'disabled':
        return <ClientDisabledComponent key={key} {...{
          index: key,
          text,
          className: subClassNames.clientAnswerComponent
        }} />;
      case 'forward':
        handleForwardTimeout({answerIndex: key});
        break;
      default:
        return <div key={key}></div>;
    }
  });
}

ClientAnswerComponent.displayName = 'ClientAnswerComponent';

export default ClientAnswerComponent;
