import { ipcMain, IpcMainEvent } from 'electron';
import { IPCEventHandler, IPCEventName, IPCEventArgs } from '../../common/constants/events';

export interface ITypedIpcMainEvent extends IpcMainEvent {
    reply: typeof ipcSend;
}

export function ipcListen<E extends IPCEventName>(event: E, handler: IPCEventHandler<ITypedIpcMainEvent, E>) {
    ipcMain.on(event, handler);
}

export function ipcSend<E extends IPCEventName>(
    event: E,
    args: IPCEventArgs[E]
) {
    ipcMain.emit(event, args);
}