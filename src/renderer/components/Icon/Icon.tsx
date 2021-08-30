import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export function Icon(
  props: {
    options: FontAwesomeIconProps,
    customColor?: boolean
    rightMargin?: boolean
  }
): JSX.Element {
  props.options.className = (props.options.className ?? '') + (props.customColor ? '' : ' brand-text');
  props.options.size = props.options.size ?? 'lg';
  props.options.style = props.options.style ?? {};

  if (props.rightMargin) props.options.style.marginRight = '0.5rem';

  return FontAwesomeIcon(props.options) as JSX.Element;
}
