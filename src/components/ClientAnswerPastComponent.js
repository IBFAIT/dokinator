'use strict';

import React    from 'react';

import ClientButtonPastComponent   from './ClientButtonPastComponent.js';


const ClientAnswerPastComponent = (props) => {
  console.log(props);
  return (
    <div {...{className: props.className}}>
      { renderClientBubble(props) }
    </div>
  );
}

const renderClientBubble = ({step, answer, stateAtPos, index, className = 'clientbuttonpast-component'}) => {
  if(answer.length == 1 && answer[0].type == 'forward') {
    return <div></div>;
  }
  if (answer[index].type == 'input') {
    return <ClientButtonPastComponent {...{
      className,
      text: stateAtPos.usersInput
    }} />;
  } else {
    return <ClientButtonPastComponent {...{
      index,
      className,
      text: answer[index].text
    }} />;
  }
}

ClientAnswerPastComponent.displayName = 'ClientAnswerPastComponent';

export default ClientAnswerPastComponent;
