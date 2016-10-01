'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

require('styles/animations.scss');

const avatarImgs = {
  doc: require('../images/docinator.jpg'),
  fred:require('../images/fred.png'),
  user: require('../images/user.png')
};

class IconComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const name = ReactDOM.findDOMNode(this.refs.botName);
    const img = ReactDOM.findDOMNode(this.refs.avatarImg);
    
  }

  render() {
    return (
      <div className="icon-component">
        <div className="name" ref="botName">{this.props.name}</div>
        <div><img src={avatarImgs[this.props.botId]} alt={this.props.alt} className="avatarImg" ref="avatarImg" /></div>
      </div>
    );

  }
}

IconComponent.displayName = 'IconComponent';

// Uncomment properties you need
// IconComponent.propTypes = {};
// IconComponent.defaultProps = {};

export default IconComponent;
