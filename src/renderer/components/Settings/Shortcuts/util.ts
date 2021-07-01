import { Accelerator } from 'electron';
import { IShortcutRecording } from './Shortcuts';

export function _keyToAcceleratorKeyCode(key: string) {
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
      return key.toLowerCase();
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
