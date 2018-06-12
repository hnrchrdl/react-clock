// @flow

import React from 'react';

type Props = {
  onClick: () => void,
  text: string,
  active: boolean
};

function Button({ onClick, text, active }: Props) {
  return (
    <span className={`button${active ? ' active' : ''}`} onClick={onClick}>
      {text}
    </span>
  );
}

Button.defaultProps = {
  active: false
};

export default Button;
