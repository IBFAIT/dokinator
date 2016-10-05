// Styles
require('normalize.css/normalize.css');
require('styles/App.scss');

import React  from 'react';
import Scroll from 'smoothscroll';

// JSON data beeing imported
import Defaults     from './defaults.json';
import Conversation from './conversation.json';

// Components
import BotBubbleComponent        from './BotBubbleReloadedComponent.js';
import BotBubblePastComponent    from './BotBubblePastReloadedComponent.js';
import ClientAnswerComponent     from './ClientAnswerComponent.js';
import ClientButtonPastComponent from './ClientButtonPastComponent.js';
import ClientInputPastComponent  from './ClientInputPastComponent.js';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      path:   'init',
      name:   null,
      email:  null,
      fieber: null
    };
    this.data                 = Defaults;
    this.data.conversationLog = [];
    this.botsTime             = 0;
    this.botAnimationDone     = null;
    this.answerTmId           = null;
    this.answerNodes          = null;
    this.Conversation         = Conversation;
    this.answersDelay         = 0;
  }

  shouldComponentUpdate() {
    this.botsTime = 0;
    return true;
  }

  render() {
    let answerProps = {
      answers:               Conversation[this.state.path].user.answers,
      updatePathState:       this.updatePathState.bind(this),
      handleInputfieldEnter: this.handleInputfieldEnter.bind(this),
      botsTime:              this.botsTime,
      giveNodes:             this.getAnswerNodes.bind(this)
    }
    return (
      <div className="index">
        <div className="conversation-bubbles">
          { this.renderPastConversation(this.data.conversationLog) }
          <span  ref="activePart">
            { this.renderBotBubbles(Conversation[this.state.path].bots) }
          </span>
        </div>
        <div className="conversation-part">
          <ClientAnswerComponent {...answerProps} />
          { /*<div className="user-answers" >
            { this.renderClientBubbles(Conversation[this.state.path].user.answers) }
            </div>*/ }
        </div>
      </div>
    );
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
        texts,
        bots,
        key:            this.state.path,
        index:          key,
        name:           this.state.name,
        email:          this.state.email,
        data:           Defaults,
        bot:            Defaults.botIdentitys[id],
        tmUpdater:      this.updateBotsMainTimerCb.bind(this),
        bubbleFinished: this.handleBotAnimFinished.bind(this)
      };
      return (
        <BotBubbleComponent {...props} />
      );
    });
  }

  handleBotAnimFinished({botAnimationDone, answerIndex}) {
    let ansType = this.Conversation[this.state.path].user.answers[0].type;
    if(ansType == 'forward') {
      if(this.answerTmId !== null) {
        clearTimeout(this.answerTmId);
      }
      this.answerTmId = this.handleForwardTimeout({
        answerIndex,
        botAnimationDone,
        path: this.Conversation[this.state.path].user.answers[0].path
      });
      return true;
    }
    this.botAnimationDone = botAnimationDone;

    getAnswerNodes(nodes) {
      this.answerNodes = nodes;
    }

    setClientAnswerAppear(botAnimationDone) {
      if(this.answerDelay === 0) {
        this.answerDelayId = '';
        this.answerDelay = new Promise((resolve)=>{this.answerDelayId = setTimeout(resolve, botAnimationDone, this)});
      } else {
        clearTimeout(this.answerDelayId);
        this.answerDelay = new Promise((resolve)=>{this.answerDelayId = setTimeout(resolve, botAnimationDone, this)});
      }
      this.answerDelay.then(() => {
        this.answerNodes.comp.classList.remove('nope');
        this.answerNodes.comp.classList.remove('noDimensions');
        this.answerNodes.comp.style.animationDuration = '1700ms';
        this.answerNodes.comp.style.animationDelay = '0ms';
        this.answerNodes.comp.classList.add('raiseAnswer');
        console.log(this.answerNodes.comp);
        this.answerNodes.comp.addEventListener('animationstart', (evt) => {
          Scroll(evt.target.firstChild.lastChild);
          // window.scrollBy(0, document.getElementsByTagName('body')[0].scrollHeight);
        });
        this.answerNodes.comp.addEventListener('animationend', (evt) => {
          evt.target.classList.remove('raiseAnswer');
          evt.target.classList.add('answerRisen');
          Scroll(evt.target.firstChild.lastChild);
          // window.scrollBy(0, document.getElementsByTagName('body')[0].scrollHeight);
        });

      });
    }

      handleForwardTimeout(params) {
        setTimeout(()=>{this.updatePathState(null, params)}, 1000 + params.botAnimationDone, this, params);
      }
  /**
   * The past Conversation is beeing rendered with the this.data.conversationLog property
   */
  renderPastConversation(conversation) {
    return conversation.map((step, key) => {
        let stateAtPos = JSON.parse(step.stateAtPos);
        let clientBubbleParams = {
          stateAtPos,
          answer:      Conversation[stateAtPos.path].user.answers[step.answerIndex],
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
        name:         this.state.name,
        email:        this.state.email,
        data:         Defaults,
        classNameing: 'botbubblepast-component',
        bot:          Defaults.botIdentitys[id]
      };
      return <BotBubblePastComponent {...props} />
    });
  }

  renderClientPastBubble({answer, answerIndex, stateAtPos}, key) {
    let props = {
      key,
      name:   this.state.name,
      avatar: Defaults.user.avatar
    };
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

  /**
   * Callbacks for Client Bubbles
   */
  updatePathState(evt, {path, answerIndex = null}) {
    this.data.conversationLog.push({
      stateAtPos: JSON.stringify(this.state),
      answerIndex
    });
    this.setState({
      path: path
    });
  }

  handleInputfieldEnter(evt, path, answerIndex, changeVal) {
    if(evt.key === 'Enter') {
      this.data.conversationLog.push({
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
        index:             key, // To be able to give key to the callback
        butAnimationsDone: this.botAnimationDone,
        safeAppearWait:    3000
      }
      switch (answer.type) {
        // Button Component
        case 'button':
          props.text            = answer.text;
          props.path            = answer.path;
          props.updatePathState = this.updatePathState.bind(this);
          return <ClientButtonComponent {...props}  />;
        // Input Component
        case 'input':
          props.path                  = answer.path;
          props.placeholder           = answer.placeholder;
          props.changeVal             = answer.changeVal;
          props.handleInputfieldEnter = this.handleInputfieldEnter.bind(this);
          return (
            <ClientInputComponent {...props} />
          );
        // Forwarder
        case 'forward':
          break;
        case 'disabled':
          props.text = answer.text;
          return <ClientDisabledComponent {...props} />;
      }
    });
  }
}

export default AppComponent;
