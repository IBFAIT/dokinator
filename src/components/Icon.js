'use strict';
import React    from 'react';

// Default settings for bots
import Defaults from './defaults.json';

const avatarImgs = {
  doc:  require('../images/docinator.jpg'),
  fred: require('../images/fred.png'),
  user: require('../images/user.png')
};

// generic Styles
import vals from '../styles/vals.js';

const Styl = {
  component: {
    flex: '0 0 20%',
    alignSelf: 'flex-start',
    disply: 'inline-block',
    minWidth: (vals.icon.img.length+4) + 'px',
    maxWidth: (vals.icon.img.length+4) + 'px',
    marginRight: '.6rem'
  },
  name: {
    position: 'relative',
    display: 'inline-block',
    right: '-4rem',
    top: '-1.1rem',
    fontSize: vals.icon.name.font.size
  },
  img: {
    display: 'block',
    width: vals.icon.img.length +'px',
    height: vals.icon.img.length + 'px',
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
