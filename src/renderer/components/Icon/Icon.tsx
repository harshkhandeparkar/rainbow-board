import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export function Icon(
  props: {
    options: FontAwesomeIconProps,
    rightMargin?: boolean
  }
): JSX.Element {
  props.options.className = (props.options.className || '') + ' brand-text';
  props.options.size = props.options.size || 'lg';

  if (props.rightMargin) props.options.style.marginRight = '0.5rem';

  return FontAwesomeIcon(props.options) as JSX.Element;
}
