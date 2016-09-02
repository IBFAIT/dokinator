require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ChatBubbleComponent from './ChatBubbleComponent.js';
import chatConv from './conversation.json';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      path: '0'
    };

  }
  render() {

    let bubbles = this.RenderChatBubbles(chatConv[this.state.path]);
    return (
      <div className="index">
        { bubbles }
      </div>
    );
  }

  RenderBubbleWithButton({path, text}) {
    return (
      <button onClick={() => this.setState({path})}>{text}</button>
    )
  }

  RenderChatBubbles({ bot, choices, title }) {
    return bot.map((bubble, key) => {
      return (
        <ChatBubbleComponent key={key} text={bubble.text} />
      )
    });
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
