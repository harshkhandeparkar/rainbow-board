import { BrowserWindow, App, dialog } from 'electron';
import * as EVENTS from '../../common/constants/events';
import { openDialog } from '../util/open';
import { setWindowMenu } from '../util/windowMenu';
import { menuClickEvents } from '../events/menuClickEvents';
import { ipcMainListen } from '../events/limitedIPC';

export function setIPCHandlers(
    win: BrowserWindow,
    app: App,
    isDev: boolean
) {
    ipcMainListen(EVENTS.LOCATION_CHANGED, (e, {path}) => {
        setWindowMenu(win, isDev, path);
    })

    ipcMainListen(EVENTS.RESTART, () => {
        app.relaunch();
        app.quit();
    })

    ipcMainListen(EVENTS.OPEN, (e) => {
        openDialog(win, e);
    })

    ipcMainListen(EVENTS.FIRE_MENU_EVENT, (e, {eventName, options}) => {
        menuClickEvents.fire(eventName, options);
    })

    ipcMainListen(EVENTS.MAXIMIZE_UNMAXIMIZE, (e) => {
        win.isMaximized() ? win.unmaximize() : win.maximize();
    })

    ipcMainListen(EVENTS.QUIT, (e) => {
        app.quit();
    })

    ipcMainListen(EVENTS.MINIMIZE, (e) => {
        win.minimize();
    })

    ipcMainListen(EVENTS.SET_WINDOW_TITLE, (e, {title}) => {
        win.setTitle(title);
    })

    ipcMainListen(
        EVENTS.PROMPT,
        (event, args) => {
            dialog.showMessageBox(win, {
                type: 'question',
                buttons: args.buttons,
                title: args.title,
                message: args.message
            }).then(({ response }) => {
                event.reply(
                    EVENTS.PROMPT_REPLY,
                    {
                        event: args.event,
                        response,
                        options: args.options ?? {}
                    }
                )
            })
        }
    )
}