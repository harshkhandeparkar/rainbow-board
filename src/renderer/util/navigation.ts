import { ipcRenderer } from 'electron';
import ipcHandler from './ipc-handler';
import history from './history';

ipcHandler.addEventHandler('prompt-reply', 'leavePagesPromptEventHandler', (event, args) => {
  if (args.response === 1 && args.event === 'leave-pages') history.push(args.options.goTo);
})

export function openLeavePrompt(goTo: string) {
  ipcRenderer.send('prompt', {
    title: 'Leave Whiteboard?',
    message: 'If you leave the whiteboard, all the unsaved data will be LOST FOREVER.',
    buttons: ['No', 'Yes'],
    event: 'leave-pages',
    options: {
      goTo
    }
  })
}

export function go(to: string) {
  if (history.location.pathname === '/pages') {
    openLeavePrompt(to);
  }
  else history.push(to);
}
