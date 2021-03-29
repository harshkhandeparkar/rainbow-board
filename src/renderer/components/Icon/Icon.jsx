import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

/**
 *
 * @param {FontAwesomeIconProps} props
 * @returns
 */
export function Icon(props) {
  props = {
    size: 'lg',
    style: {},
    ...props,
    className: (props.className || '') + ' brand-text'
  }

  if (props.rightmargin) props.style.marginRight = '0.5rem';

  return new FontAwesomeIcon(props);
}
