'use strict';
import React    from 'react';
import ReactDOM from 'react-dom';

// require('styles/IconComponent.scss');

const avatarImgs = {
  doc:  require('../images/docinator.jpg'),
  fred: require('../images/fred.png'),
  user: require('../images/user.png')
};

const IconComponent = ({id, name, avatar}) => {
  return (
    <div className="IconComponent">
      <div className="name">
        {name}
      </div>
      <div>
        <img {...{
          src: avatarImgs[id],
          alt: avatar.alt,
          title: avatar.title,
          className: 'avatarImg'
        }}
        />
      </div>
    </div>
  );
}

IconComponent.displayName = 'IconComponent';

// Uncomment properties you need
// IconComponent.propTypes = {};
// IconComponent.defaultProps = {};

export default IconComponent;
