import React from 'react';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

const MyIdenticon = ({ seed, size = 40 }) => {
  const avatar = createAvatar(identicon, {
    seed: seed,
    size: size,
    scale: 80,
    radius: 2,
    backgroundColor: ["0a0a0a"]
  });

  const svg = avatar.toString();

  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default MyIdenticon;