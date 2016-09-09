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
        { this.renderClientBubbles(chatConv[this.state.path].user.answers) }
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
    this.setState({name: inputValue.target.value});
  }

  handleEnter(enter, path) {
    if(enter.key === "Enter") {
      this.setState({path: path});
    }
  }

  renderClientBubbles(answers) {
    return answers.map((answer, key) => {
      switch (answer.type) {
        case 'button':
          return <ClientButtonComponent key={key} text={answer.text} path={answer.path} updatePathState={this.updatePathState.bind(this)} />;
        case 'input':
          if(answer.changeVal == 'name') {
            return (
              <ClientInputComponent
                key={key}
                placeholder={answer.placeholder}
                path={answer.path}
                changeVal={answer.changeVal}
                handleInput={this.handleNameInput.bind(this)}
                handleEnter={this.handleEnter.bind(this)}
              />
            );
          }
          if(answer.changeVal == 'email') {
            return (
              <ClientInputComponent
                key={key}
                placeholder={answer.placeholder}
                path={answer.path}
                changeVal={answer.changeVal}
                handleInput={this.handleEmailInput.bind(this)}
                handleEnter={this.handleEnter.bind(this)}
              />
            );
          }
        case 'forward':
          return null;
        case 'disabled':
          return <ClientDisabledComponent key={key} />;
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
