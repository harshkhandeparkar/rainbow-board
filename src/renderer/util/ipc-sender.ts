import { ipcRenderer } from 'electron';
import { IPCRendererSendEventArgs, IPCRendererSendEvents } from '../../common/constants/events';


export function ipcRendererSend<E extends IPCRendererSendEvents>(
    event: E,
    args: IPCRendererSendEventArgs[E]
) {
    ipcRenderer.send(event, args);
}