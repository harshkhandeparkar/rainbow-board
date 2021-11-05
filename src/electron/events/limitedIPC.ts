import { ipcMain, IpcMainEvent } from 'electron';
import {
    IPCEventHandler,
    IPCMainReceiveEvents,
    IPCMainReceiveEventArgs,
    IPCMainSendEvents,
    IPCMainSendEventArgs
} from '../../common/constants/events';

export interface ITypedIpcMainEvent extends IpcMainEvent {
    reply: typeof ipcMainSend;
}

export function ipcMainListen
<E extends IPCMainReceiveEvents>(
    event: E,
    handler: IPCEventHandler<ITypedIpcMainEvent, IPCMainReceiveEventArgs, E>
) {
    ipcMain.on(event, handler);
}

export function ipcMainSend<E extends IPCMainSendEvents>(
    event: E,
    args: IPCMainSendEventArgs[E]
) {
    ipcMain.emit(event, args);
}