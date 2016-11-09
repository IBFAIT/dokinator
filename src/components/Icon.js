'use strict';
import React    from 'react';

import Defaults     from './defaults.json';

const avatarImgs = {
  doc:  require('../images/docinator.jpg'),
  fred: require('../images/fred.png'),
  user: require('../images/user.png')
};

const Icon = ({ id }) => {
  const {name, avatar} = Defaults.botIdentitys[id];
  return (
    <div className="icon">
      <div className="name">
        {name}
      </div>
      <div>
        <img
          className="avatarImg"
          title={avatar.title}
          alt={avatar.alt}
          src={avatarImgs[id]}
        />
      </div>
    </div>
  );
}

Icon.displayName = 'Icon';

// Uncomment properties you need
// Icon.propTypes = {};
// Icon.defaultProps = {};

export default Icon;
