require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ChatBubbleComponent from './ChatBubbleComponent.js';
import {botIdentitys, user} from './defaults.json';
import chatConv from './conversation.json';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      path: '0'
    };
    this.user = user;
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

  RenderChatBubbles({ bots, user, title }) {
    return bots.map((bub, key) => {
      return (
        <ChatBubbleComponent key={key} text={bub.text} user={this.user} />
      )
    });
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
