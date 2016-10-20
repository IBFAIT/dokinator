'use strict';

import React    from 'react';

import ClientButtonComponent   from './ClientButtonComponent.js';
import ClientInputComponent    from './ClientInputComponent.js';
import ClientDisabledComponent from './ClientDisabledComponent.js';



const ClientAnswerComponent = ({className = 'user-answers', botHere, style, ...props}) => {
  return (
    <div {...{className, style}}>
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
        handleForwardTimeout({answerIndex: 0});
        break;
      default:
        return <div key={key}></div>;
    }
  });
}

ClientAnswerComponent.displayName = 'ClientAnswerComponent';

export default ClientAnswerComponent;
