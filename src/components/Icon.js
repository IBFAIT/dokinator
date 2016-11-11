'use strict';
import React    from 'react';

// Default settings for bots
import Defaults from './defaults.json';

const avatarImgs = {
  doc:  require('../images/docinator.jpg'),
  fred: require('../images/fred.png'),
  user: require('../images/user.png')
};

const Styl = {
  component: {
    flex: '0 0 20%',
    alignSelf: 'flex-start',
    disply: 'inline-block',
    minWidth: '44px',
    maxWidth: '44px',
    marginRight: '.6rem'
  },
  name: {
    position: 'relative',
    display: 'inline-block',
    right: '-4.3rem',
    top: '-1.4rem',
    color: '#888',
    fontSize: '.77rem'
  },
  img: {
    display: 'block',
    width: '40px',
    height: '40px',
    margin: '-1rem auto 0'
  }
}

const Icon = ({ id }) => {
  const {name, avatar} = Defaults.botIdentitys[id];
  return (
    <div style={Styl.component}>
      <div style={Styl.name}>
        {name}
      </div>
      <div>
        <img
          style={Styl.img}
          title={avatar.title}
          alt={avatar.alt}
          src={avatarImgs[id]}
        />
      </div>
    </div>
  );
}

Icon.displayName = 'Icon';

export default Icon;
