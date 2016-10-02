// Styles
require('normalize.css/normalize.css');
require('styles/App.scss');


import React from 'react';

// JSON data beeing imported
import Defaults from './defaults.json';
import Conversation from './conversation.json';

// Components
// import BotBubbleComponent from './BotBubbleComponent.js';
import BotBubbleComponent from './BotBubbleReloadedComponent.js';
import BotBubblePastComponent from './BotBubblePastReloadedComponent.js';
// import BotBubblePastComponent from './BotBubbleComponent.js';
import ClientButtonComponent from './ClientButtonComponent.js';
import ClientButtonPastComponent from './ClientButtonPastComponent.js';
import ClientInputComponent from './ClientInputComponent.js';
import ClientDisabledComponent from './ClientDisabledComponent.js';
import ClientInputPastComponent from './ClientInputPastComponent.js';
import ForwardComponent from './ForwardComponent.js';

/**
 * Main Stateful Componennt
 */
class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      // state holds the current path string
      path: 'init',
      // states that will hold user inputs
      name: null,
      email: null,
      fieber: null
    };
    this.data = Defaults;
    // This property will get the whole Conversation history appended
    this.data.conversation = [];
    this.botsTime = 0;
    this.botAnimationDone = null;
    this.answerTmId = null;
    this.Conversation = Conversation;
  }

  /**
   * Scrolling down to the bottom when new answer bubbles appear
   */
  componentDidUpdate() {
    window.scrollBy(0, document.getElementsByTagName('body')[0].scrollHeight);
  }

  shouldComponentUpdate() {
    this.botsTime = 0;
    return true;
  }

  componentDidMount() {
  }


  render() {
    return (
      <div className="index">
        <div className="conversation-bubbles">
          { this.renderPastConversation(this.data.conversation) }
        <span  ref="activePart">
          { this.renderBotBubbles(Conversation[this.state.path].bots) }
        </span>
        </div>
        <div className="conversation-part">
          <div className="user-answers" >
            { this.renderClientBubbles(Conversation[this.state.path].user.answers) }
          </div>
        </div>
      </div>
    );
  }

  /**
   * The past Conversation is beeing rendered with the this.data.conversation property
   */
  renderPastConversation(conversation) {
    return conversation.map((step, key) => {
        let stateAtPos = JSON.parse(step.stateAtPos);
        let clientBubbleParams = {
          stateAtPos,
          answer: Conversation[stateAtPos.path].user.answers[step.answerIndex],
          answerIndex: step.answerIndex
        };
      return (
        <div className="conversation-part-past" key={key}>
          { this.renderBotPastBubbles(Conversation[stateAtPos.path].bots, key) }
          <div className="user-answers-past" key={key} >
            { this.renderClientPastBubble(clientBubbleParams, key) }
          </div>
        </div>
      );
    });
  }

  renderBotPastBubbles(bubbles) {
    return bubbles.map(({id, texts}, key) => {
      let props = {
        key,
        texts,
        name: this.state.name,
        email: this.state.email,
        data: Defaults,
        classNameing: 'botbubblepast-component',
        bot: Defaults.botIdentitys[id]
      };
      return <BotBubblePastComponent {...props} />
    });
  }

  renderClientPastBubble({answer, answerIndex, stateAtPos}, key) {
    let props = { key, name: this.state.name, avatar: Defaults.user.avatar };
    switch (answer.type) {
      case 'button':
        props.text = answer.text;
        return <ClientButtonPastComponent {...props} />;
      case 'input':
        props.valueContent = stateAtPos[answer.changeVal];
        return <ClientInputPastComponent {...props} />;
      case 'forward':
        props.text = null;
        return <div></div>;
    }
  }
  updateBotsMainTimerCb(timepeice) {
    this.botsTime += timepeice;
  }
    /**
     * Bot Bubble render
     */
    renderBotBubbles(bots) {

      return bots.map(({id, texts}, key) => {
        let props = {
          key,
          index: key,
          texts,
          bots,
          name: this.state.name,
          email: this.state.email,
          data: Defaults,
          bot: Defaults.botIdentitys[id],
          tmUpdater: this.updateBotsMainTimerCb.bind(this),
          bubbleFinished: this.announceBubbleFinish.bind(this)
        };
        return (
          <BotBubbleComponent key={this.state.path} {...props} />
        );
      });
    }





  /**
   * Callbacks for Client Bubbles
   */
  updatePathState(evt, {path, answerIndex = null}) {
    this.data.conversation.push({
      stateAtPos: JSON.stringify(this.state),
      answerIndex
    });
    this.setState({
      path: path
    });
  }


  handleInputfieldEnter(evt, path, answerIndex, changeVal) {
    if(evt.key === 'Enter') {
      this.data.conversation.push({
        stateAtPos: JSON.stringify(this.state),
        answerIndex
      });
      let state = {path};
      state[changeVal] = evt.target.value;
      this.setState(state);
    }
  }



  renderClientBubbles(answers) {
    return answers.map((answer, key) => {
      let props = {
        key,
        index: key, // To be able to give key to the callback
        butAnimationsDone: this.botAnimationDone
      }
      switch (answer.type) {
        // Button Component
        case 'button':
          props.text = answer.text;
          props.path = answer.path;
          props.updatePathState = this.updatePathState.bind(this);
          return <ClientButtonComponent {...props}  />;
        // Input Component
        case 'input':
          props.path = answer.path;
          props.placeholder = answer.placeholder;
          props.changeVal = answer.changeVal;
          props.handleInputfieldEnter = this.handleInputfieldEnter.bind(this);
          return (
            <ClientInputComponent {...props} />
          );
        // Forwarder
        case 'forward':
          // this.answerTmId = this.handleForwardTimeout({path: answer.path, answerIndex: key, botAnimationDone: this.botAnimationDone});
          // this.answerTmId = setTimeout(()=>{this.updatePathState(null, {path: answer.path, answerIndex: key})}, this.botAnimationDone, this, answer, key);
          // this.handleForward({path: answer.path, answerIndex: key, botAnimationDone: props.botAnimationDone});
          // props.forwarder = this.handleForward.bind(this);
          // props.renderMoment = now();
          // props.botsTime = this.botsTime;
          // return <ForwardComponent {...props} />
        // the disabled button in context
        case 'disabled':
          props.text = answer.text;
          return <ClientDisabledComponent {...props} />;
      }
    });
  }

  handleForwardTimeout(params) {
    setTimeout(()=>{this.updatePathState(null, params)}, 1000 + params.botAnimationDone, this, params);
  }

  announceBubbleFinish({botAnimationDone, answerIndex}) {
    console.log(this.state, botAnimationDone, answerIndex);
    let ansType = this.Conversation[this.state.path].user.answers[0].type;
    if(ansType == 'forward') {
      if(this.answerTmId !== null) {
        clearTimeout(this.answerTmId);
      }
      this.answerTmId = this.handleForwardTimeout({answerIndex, botAnimationDone, path: this.Conversation[this.state.path].user.answers[0].path})
    }
    this.botAnimationDone = botAnimationDone;
  }

}

export default AppComponent;
