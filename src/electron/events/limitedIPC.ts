import { ipcMain, IpcMainEvent } from 'electron';
import { IPCEventHandler, IPCEventName } from '../../common/constants/events';

export function IPCListen<E extends IPCEventName>(event: E, handler: IPCEventHandler<IpcMainEvent, E>) {
    ipcMain.on(event, handler);
}