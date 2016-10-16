'use strict';
import React    from 'react';

const avatarImgs = {
  doc:  require('../images/docinator.jpg'),
  fred: require('../images/fred.png'),
  user: require('../images/user.png')
};

const IconComponent = ({id, name, avatar, className = 'icon-component', subClassNames = {img: 'avatarImg', name: 'name'}}) => {
  return (
    <div {...{className}}>
      <div className={subClassNames.name}>
        {name}
      </div>
      <div>
        <img {...{
          src: avatarImgs[id],
          alt: avatar.alt,
          title: avatar.title,
          className: subClassNames.img
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
