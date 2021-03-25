import { ipcRenderer } from 'electron';
import ipcHandler from './ipc-handler';
import history from './history';

ipcHandler.addEventHandler('prompt-reply', 'goHomePromptHandler', (event, args) => {
  if (args.response === 0 && args.event === 'home') history.push('/');
})

export function goHome() {
  if (history.location.pathname === '/pages') {
    ipcRenderer.send('prompt', {
      title: 'Go to Home?',
      message: 'If you go to the home page, all the unsaved data will be LOST FOREVER.',
      buttons: ['Yes', 'No'],
      event: 'home'
    })
  }
  else history.push('/');
}
