'use strict';

import React from 'react';

import IconComponent from './IconComponent.js';
import BotSingleBubbleComponent from './BotChildBubbleReloadedComponent.js';

class BotBubbleReloadedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.totalBotTime = 0;
  }

  render() {
    return (
      <div className="botbubble-component">
        <IconComponent
          name={this.props.bot.name}
          src={this.props.bot.avatar.src}
          alt={this.props.bot.avatar.alt}
          botId={this.props.bot.id}
        />
        <div className="botbubble-container">
          {this.renderIndividualBubbles(this.props.texts)}
        </div>
      </div>
    );
  }

  renderIndividualBubbles(texts) {
    let waitAccu = 0;
    return texts.map((text, key) =>{
      if(Array.isArray(text)) {
        const rand = Math.floor(Math.random()*text.length);
        this.props.texts[key] = text[rand];
        text = text[rand];
      }
      let textChunks = text.split(' ');
      const textApppearTime =  (text.length-textChunks.length)*100;
      let props = {
        key,
        text,
        textChunks,
        data: this.props.data,
        index: this.props.index,
        name: this.props.name,
        email: this.props.email,
        textApppearTime,
        wait: waitAccu
      };
      waitAccu += (textApppearTime + 200);
      if(key+1 == texts.length) {
        this.props.tmUpdater(waitAccu);
      }
      return <BotSingleBubbleComponent {...props} />
    });
  }
}

BotBubbleReloadedComponent.displayName = 'BotBubbleReloadedComponent';

// Uncomment properties you need
// BotBubbleReloadedComponent.propTypes = {};
// BotBubbleReloadedComponent.defaultProps = {};

export default BotBubbleReloadedComponent;
