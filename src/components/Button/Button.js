import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Waves from '../Waves';

const Button = props => {
  const [cursorPos, setCursorPos] = useState({});

  const handleClick = e => {
    e.stopPropagation();
    // Waves - Get Cursor Position
    let cursorPos = {
      top: e.clientY,
      left: e.clientX,
      time: Date.now()
    };
    setCursorPos(cursorPos);
  };

  let {
    action,
    active,
    block,
    circle,
    className,
    color,
    disabled,
    download,
    flat,
    innerRef,
    outline,
    role,
    size,
    social,
    tag: Tag,
    target,
    type,
    rounded,
    ...attributes
  } = props;

  const classes = classNames(
    color !== '' && `btn-${color}`,
    'btn',
    'Ripple-parent',
    className,
    {
      active,
      'btn-circle': circle,
      'btn-block': block,
      'btn-action': action,
      [`btn-${social}`]: social,
      [`btn-${size}`]: size,
      disabled
    }
  );

  if (attributes.href && Tag === 'button') {
    Tag = 'a';
  }

  return (
    <Tag
      data-test='button'
      type={Tag === 'button' && !type ? 'button' : type}
      target={target}
      role={Tag === 'a' && !role ? 'button' : role}
      className={classes}
      ref={innerRef}
      onMouseUp={handleClick}
      onTouchStart={handleClick}
      {...attributes}
      download={download}
      disabled={disabled}
    >
      {props.children}
      {!disabled && (
        <Waves cursorPos={cursorPos} outline={outline} flat={flat || rounded} />
      )}
    </Tag>
  );
};

Button.defaultProps = {
  color: 'default',
  tag: 'button'
};

Button.propTypes = {
  action: PropTypes.bool,
  active: PropTypes.bool,
  block: PropTypes.bool,
  children: PropTypes.node,
  circle: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  download: PropTypes.string,
  flat: PropTypes.bool,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  onClick: PropTypes.func,
  role: PropTypes.string,
  size: PropTypes.string,
  social: PropTypes.string,
  tag: PropTypes.string,
  target: PropTypes.string,
  type: PropTypes.string
};

export default Button;
export { Button as MDBBtn };
