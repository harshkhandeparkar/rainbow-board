import { ipcMain, IpcMainEvent } from 'electron';
import { IPCEventHandler, IPCEventName, IPCEventArgs } from '../../common/constants/events';

export interface ITypedIpcMainEvent extends IpcMainEvent {
    reply: typeof ipcMainSend;
}

export function ipcMainListen<E extends IPCEventName>(event: E, handler: IPCEventHandler<ITypedIpcMainEvent, E>) {
    ipcMain.on(event, handler);
}

export function ipcMainSend<E extends IPCEventName>(
    event: E,
    args: IPCEventArgs[E]
) {
    ipcMain.emit(event, args);
}