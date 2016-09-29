// Styles
require('normalize.css/normalize.css');
require('styles/App.scss');
const avatarImgs = {
  doc: require('../images/docinator.jpg'),
  fred:require('../images/fred.png'),
  user: require('../images/user.png')
};

import React from 'react';
import ReactDOM from 'react-dom';

// JSON data beeing imported
import Defaults from './defaults.json';
import Conversation from './conversation.json';

// Components
import BotBubbleComponent from './BotBubbleComponent.js';
import BotBubblePastComponent from './BotBubbleComponent.js';
import ClientButtonComponent from './ClientButtonComponent.js';
import ClientButtonPastComponent from './ClientButtonPastComponent.js';
import ClientInputComponent from './ClientInputComponent.js';
import ClientDisabledComponent from './ClientDisabledComponent.js';
import ClientInputPastComponent from './ClientInputPastComponent.js';

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
  }

  /**
   * Scrolling down to the bottom when new answer bubbles appear
   */
  componentDidUpdate() {
    window.scrollBy(0, document.getElementsByTagName('body')[0].scrollHeight);
    this.makeAnimation();
  }
  componentDidMount() {
    this.makeAnimation();
  }

  makeAnimation() {
    ReactDOM.findDOMNode(this.refs.activePart).childNodes.forEach((botBubbleDomComp) => {
      const iconImg = botBubbleDomComp.getElementsByClassName("avatarImg")[0];
      iconImg.className = 'avatarImg';
      iconImg.className = 'avatarImg inslideavatar';
      iconImg.style.animationName = 'inslideavatar';
      iconImg.style.animationDuration = '1000ms';
      iconImg.style.animationTimingFunction = 'ease-in';
      iconImg.style.animationDelay = '0ms';
      iconImg.addEventListener('animationend', ()=>{this.removeAnimation(iconImg, 'avatarImg')});
      const nameTxt = botBubbleDomComp.getElementsByClassName('name')[0];
      nameTxt.className = 'name inslidename';
      nameTxt.style.animationName = 'inslidename';
      nameTxt.style.animationDuration = '1000ms';
      nameTxt.style.animationTimingFunction = 'ease-in';
      nameTxt.style.animationDelay = '0ms';
      nameTxt.addEventListener('animationend', ()=>{this.removeAnimation(nameTxt, 'name')});
      const singleTextBubbles = botBubbleDomComp.getElementsByClassName('botsinglebubble-component');
      let timeConcat = 800;

      for (var i = 0; i < singleTextBubbles.length; i++) {
        let elm = singleTextBubbles[i];
        elm.style.opacity = 0;
        let txtContent = '';
        txtContent = elm.firstChild.textContent;
        elm.firstChild.textContent = '...';
        let timeRollout = txtContent.length*20;
        elm.className = 'botsinglebubble-component';
        elm.className = 'botsinglebubble-component bubbleunroll';
        elm.style.animationName = 'bubbleunroll';
        elm.style.animationDuration = '100ms';
        let delay = timeConcat + 'ms';
        elm.style.animationDelay = delay;
        elm.style.animationTimingFunction = 'ease-in';
        elm.addEventListener('animationend', () => {
            elm.style.minWidth = '40px';
            elm.style.opacity = 1;
            elm.firstChild.textContent = txtContent;
            this.removeAnimation(elm, 'botsinglebubble-component')

          });
        timeConcat += timeRollout;
      }
    });
  }
  removeAnimation(element, formerClassname) {
      element.className = formerClassname;
      element.style.animation = '';
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
    props.avatar.src = avatarImgs.user;
    switch (answer.type) {
      case 'button':
        props.text = answer.text;
        return <ClientButtonPastComponent {...props} />;
      case 'input':
        props.valueContent = stateAtPos[answer.changeVal];
        return <ClientInputPastComponent {...props} />;
    }
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
          bot: Defaults.botIdentitys[id]
        };
        props.bot.avatar.src=avatarImgs[props.bot.id];
        return (
          <BotBubbleComponent {...props} />
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
        index: key // To be able to give key to the callback
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
          setTimeout(()=>{this.setState({path:answer.path})}, 2500)
          break;
        // the disabled button in context
        case 'disabled':
          props.text = answer.text;
          return <ClientDisabledComponent {...props} />;
      }
    });
  }

}

export default AppComponent;
