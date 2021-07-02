import { Accelerator } from 'electron';
import { IShortcutRecording } from './Shortcuts';

export function _keyToAcceleratorKeyCode(key: string, code: string) {
  switch (key.toLowerCase()) {
    case '':
    case 'alt':
    case 'shift':
    case 'control':
    case 'command':
    case 'meta':
    case 'cmd':
      return null;
    case 'arrowright':
      return 'right';
    case 'arrowleft':
      return 'left';
    case '+':
      return 'plus';
    case ' ':
      return 'space';
    default:
      switch (code) {
        case 'Digit0':
          return '0';
        case 'Digit1':
          return '1';
        case 'Digit2':
          return '2';
        case 'Digit3':
          return '3';
        case 'Digit4':
          return '4';
        case 'Digit5':
          return '5';
        case 'Digit6':
          return '6';
        case 'Digit7':
          return '7';
        case 'Digit8':
          return '8';
        case 'Digit9':
          return '9';
        default:
          return key.toLowerCase();
      }
  }
}

export function _getAcceleratorString(shortcut: IShortcutRecording): Accelerator {
  const keys = [];

  if (shortcut.ctrlKey) keys.push('CTRL');
  if (shortcut.metaKey) keys.push('CMD');
  if (shortcut.altKey) keys.push('ALT');
  if (shortcut.shiftKey) keys.push('SHIFT');

  keys.push(...shortcut.keys);
  return keys.join(' + ');
}
