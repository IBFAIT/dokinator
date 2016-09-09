require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

// JSON Data
import Data from './defaults.json';
import chatConv from './conversation.json';

//.DS_Store
import BotBubbleComponent from './BotBubbleComponent.js';
import ClientButtonComponent from './ClientButtonComponent.js';
import ClientInputComponent from './ClientInputComponent.js';
import ClientDisabledComponent from './ClientDisabledComponent.js';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      path: 'init',
      name: 'Jane Doe',
      email: 'myemail.com',
      conversation: []
    };
    this.data = Data;
  }
  render() {
    return (
      <div className="index">
        { this.renderBotBubbles(chatConv[this.state.path].bots) }
        <div className="user-answers" >
          { this.renderClientBubbles(chatConv[this.state.path].user.answers) }
        </div>
      </div>
    );
  }

  updatePathState(evt, props) {
    this.setState({path: props.path});
  }

  handleNameInput(inputValue) {
    this.setState({name: inputValue.target.value});
  }

  handleEmailInput(inputValue) {
    this.setState({email: inputValue.target.value});
  }

  handleFieberInput(inputValue) {
    this.setState({fieber: inputValue.target.value});
  }

  getCallbackForChangeVal(changeVal) {
    switch (changeVal) {
      case 'name':
        return this.handleNameInput;
      case 'email':
        return this.handleEmailInput;
      case 'fieber':
        return this.handleFieberInput;
      default:
        return this.handleNameInput;
    }
  }
  handleEnter(enter, path) {
    if(enter.key === 'Enter') {
      this.setState({path: path});
    }
  }

  renderClientBubbles(answers) {
    return answers.map((answer, key) => {
      switch (answer.type) {
        case 'button':
          return <ClientButtonComponent key={key} text={answer.text} path={answer.path} updatePathState={this.updatePathState.bind(this)} />;
        case 'input':
          const callback = this.getCallbackForChangeVal(answer.changeVal);
          return (
            <ClientInputComponent key={key} placeholder={answer.placeholder} path={answer.path} changeVal={answer.changeVal} onChange={callback.bind(this)} handleEnter={this.handleEnter.bind(this)}
            />
          );
        case 'forward':
          setTimeout(()=>{this.setState({path:answer.path})}, 2500)
          break;
        case 'disabled':
          return <ClientDisabledComponent key={key} text={answer.text} />;
        default:
          return null;
      }
    });
  }

  renderBotBubbles(bots) {
    return bots.map(({id, text}, key) => {
      return (
        <BotBubbleComponent
          key={key}
          bot={Data.botIdentitys[id]}
          text={text}
          name={this.state.name}
          email={this.state.email}
          data={Data}
        />
      );
    });
  }

  RenderBubbleWithButton({path, text}) {
    return (
      <button onClick={() => this.setState({path})}>{text}</button>
    )
  }

}

AppComponent.defaultProps = {
};

export default AppComponent;
