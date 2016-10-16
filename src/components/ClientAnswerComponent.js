'use strict';

import React    from 'react';

import ClientButtonComponent   from './ClientButtonComponent.js';
import ClientInputComponent    from './ClientInputComponent.js';
import ClientDisabledComponent from './ClientDisabledComponent.js';

// require('styles/ClientAnswerComponent.scss');


const ClientAnswerComponent = ({answers, callbacks, className = 'client-answer-component'}) => {
  return (
    <div {...{className}}>
      { renderClientBubbles({answers, callbacks}) }
    </div>
  );
}

const renderClientBubbles = ({answers, callbacks}) => {
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
          className: 'input-field'
        }} />;
      case 'button':
        return <ClientButtonComponent key={key} {...{
          index: key,
          text,
          path,
          updatePathState,
          className: 'answer-button'
        }} />;
      case 'disabled':
        return <ClientDisabledComponent key={key} {...{
          index: key,
          text
        }} />;
      case 'forward':
        console.log('forward ran');
        handleForwardTimeout({answerIndex: key});
        break;
      default:
        return <div key={key}></div>;
    }
  });
}

ClientAnswerComponent.displayName = 'ClientAnswerComponent';

export default ClientAnswerComponent;
