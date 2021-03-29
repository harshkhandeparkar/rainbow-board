import { ipcRenderer } from 'electron';
import ipcHandler from './ipc-handler';
import history from './history';

ipcHandler.addEventHandler('prompt-reply', 'leavePagesPromptEventHandler', (event, args) => {
  if (args.response === 0 && args.event === 'leavePages') history.push(args.options.goTo);
})

export function openLeavePrompt(goTo) {
  ipcRenderer.send('prompt', {
    title: 'Leave Page?',
    message: 'If you leave this page, all the unsaved data will be LOST FOREVER.',
    buttons: ['Yes', 'No'],
    event: 'leavePages',
    options: {
      goTo
    }
  })
}

export function go(to) {
  if (history.location.pathname === '/pages') {
    openLeavePrompt(to);
  }
  else history.push(to);
}
