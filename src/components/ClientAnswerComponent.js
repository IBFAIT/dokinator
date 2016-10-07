'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';

import ClientButtonComponent   from './ClientButtonComponent.js';
import ClientInputComponent    from './ClientInputComponent.js';
import ClientDisabledComponent from './ClientDisabledComponent.js';


class ClientAnswerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="user-answers" ref="comp">
        { this.renderClientBubbles(this.props.answers) }
      </div>
    );
  }

  renderClientBubbles(answers) {
    return answers.map((answer, key) => {
      let props = {
        key,
        index:          key
      }
      switch (answer.type) {
        // Button Component
        case 'button':
          props.text            = answer.text;
          props.path            = answer.path;
          props.updatePathState = this.props.updatePathState;
          return (
            <ClientButtonComponent {...{
              key,
              index: key,
              text: answer.text,
              path: answer.path,
              updatePathState: this.props.updatePathState
            }} />
          );
        // Input Component
        case 'input':
          return (
            <ClientInputComponent {...{
              key,
              index: key,
              path: answer.path,
              placeholder: answer.placeholder,
              changeVal: answer.changeVal,
              handleInputfieldEnter: this.props.handleInputfieldEnter
            }} />
          );
        case 'disabled':
          props.text = answer.text;
          return (
            <ClientDisabledComponent {...{
              key,
              index: key,
              text: answer.text
            }} />
          );
        case 'forward':
          this.props.handleForwardTimeout(key);
          break;
        default:
          return (
            <ClientDisabledComponent {...{
              key,
              index: key,
              text: ''
            }} />
          );
      }
    });
  }
}

ClientAnswerComponent.displayName = 'ClientAnswerComponent';

// Uncomment properties you need
// ClientAnswerComponent.propTypes = {};
// ClientAnswerComponent.defaultProps = {};

export default ClientAnswerComponent;
