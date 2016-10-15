'use strict';

import React    from 'react';

import ClientButtonComponent   from './ClientButtonComponent.js';
import ClientInputComponent    from './ClientInputComponent.js';
import ClientDisabledComponent from './ClientDisabledComponent.js';



const ClientAnswerComponent = ({answers, callbacks, className = 'user-answers'}) => {
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
          handleInputfieldEnter
        }} />;
      case 'button':
        return <ClientButtonComponent key={key} {...{
          index: key,
          text,
          path,
          updatePathState
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
