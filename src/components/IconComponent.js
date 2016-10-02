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
    this.elms = {};
  }

  componentDidMount() {
    if(this.props.present) {

        this.elms.name = (typeof this.elms.name == 'undefined') ? ReactDOM.findDOMNode(this.refs.botName): this.elms.name;
        this.elms.img = (typeof this.elms.img == 'undefined') ? ReactDOM.findDOMNode(this.refs.avatarImg): this.elms.img;
      this.imgAppear();
      this.nameAppear();
    }
  }
  componentDidUpdate() {
    if(this.props.present === true) {

        this.elms.name = (typeof this.elms.name == 'undefined') ? ReactDOM.findDOMNode(this.refs.botName): this.elms.name;
        this.elms.img = (typeof this.elms.img == 'undefined') ? ReactDOM.findDOMNode(this.refs.avatarImg): this.elms.img;
      this.imgAppear();
      this.nameAppear();
    }
  }

  shouldComponentUpdate() {
    if(this.props.present === true) {
      this.hide();

      this.elms.name.classList.add('nameNotAppeared');
    }
    return true;
  }
  imgAppear() {
    this.hide();
    this.elms.img.style.animationDuration = '600ms';
    this.elms.img.style.animationDelay = '0ms';
    this.elms.img.classList.add('slideInLeft');

    this.elms.img.style.display = 'inline-block';
    this.elms.img.addEventListener('animationstart', (evt) => {
      evt.target.classList.remove('nope');
      evt.target.classList.remove('noDimensions');
      evt.target.classList.add('initialDimensions');
    });
    this.elms.img.addEventListener('animationend', (evt) => {
      evt.target.classList.remove('initialDimensions');
      evt.target.classList.remove('slideInLeft');
        evt.target.style.opacity = '1';
    });
  }

  nameAppear() {

    this.elms.name.classList.add('nameAppear');
    this.elms.name.classList.remove('nameApppeared');
    this.elms.name.classList.remove('nameNotAppeared');
    this.elms.name.style.animationDuration = '1200ms';
    this.elms.name.style.animationDelay = '1000ms';

    console.log('name appear ran' , this.elms.name);
    this.elms.name.addEventListener('animationstart', (evt) => {

    });
    this.elms.name.addEventListener('animationend', (evt) => {
      evt.target.classList.remove('nameAppear');
      evt.target.classList.add('nameApppeared');
    });
  }

  hide() {
    this.elms.img.classList.remove('slideInLeftDone');
    this.elms.img.classList.add('nope');
    this.elms.img.classList.add('noDimensions');

    // this.elms.name.classList.remove('nameAppearEd');
    // this.elms.name.classList.add('nope');
    // this.elms.name.classList.add('noDimensions');
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
