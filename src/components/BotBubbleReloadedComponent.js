'use strict';

import React from 'react';

import IconComponent            from './IconComponent.js';
import BotSingleBubbleComponent from './BotChildBubbleReloadedComponent.js';

class BotBubbleReloadedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.totalBotTime = 800;
    this.letterDelay  = 50;
  }

  /**
   * Reset local Components time counter
   */
  shouldComponentUpdate() {
    this.totalBotTime = 0;
    return true;
  }

  /**
   * Reset local Components time counter
   */
  componentWillUpdate() {
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
          botTime={this.totalBotTime}
          present={true}
        />
        <div className="botbubble-container" ref="BotBubbleContainer">
          {this.renderIndividualBubbles(this.props.texts)}
        </div>
      </div>
    );
  }

  renderIndividualBubbles(texts) {
    return texts.map((text, key) => {
      // Handle random Bot bubble feature
      if(Array.isArray(text)) {
        const rand            = Math.floor(Math.random()*text.length);
        this.props.texts[key] = text[rand];
        text                  = text[rand];
      }

      // const textChunks      = text.split(' ');
      // const textApppearTime = (text.length-textChunks.length)*this.letterDelay;
      const textApppearTime = text.length*this.letterDelay;
      let props = {
        key,
        text,
        // textChunks,
        textApppearTime,
        data:        this.props.data,
        index:       this.props.index,
        name:        this.props.name,
        email:       this.props.email,
        wait:        this.totalBotTime,
        letterDelay: this.letterDelay
      };

      this.totalBotTime += (textApppearTime + 200); // add extra 200ms for safety

      // Last element, pass up time result with callbacks
      if(key+1 == texts.length) {
        this.props.tmUpdater(this.totalBotTime);
        this.props.bubbleFinished({
          botAnimationDone: this.totalBotTime,
          answerIndex:      this.props.index
        });
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
