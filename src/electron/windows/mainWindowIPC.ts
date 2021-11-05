import { BrowserWindow, App, dialog } from 'electron';
import * as EVENTS from '../../common/constants/events';
import { openDialog } from '../util/open';
import { setWindowMenu } from '../util/windowMenu';
import { menuClickEvents } from '../events/menuClickEvents';
import { ipcListen } from '../events/limitedIPC';

export function setIPCHandlers(
    win: BrowserWindow,
    app: App,
    isDev: boolean
) {
    ipcListen(EVENTS.LOCATION_CHANGED, (e, {path}) => {
        setWindowMenu(win, isDev, path);
    })

    ipcListen(EVENTS.RESTART, () => {
        app.relaunch();
        app.quit();
    })

    ipcListen(EVENTS.OPEN, (e) => {
        openDialog(win, e);
    })

    ipcListen(EVENTS.FIRE_MENU_EVENT, (e, {eventName, options}) => {
        menuClickEvents.fire(eventName, options);
    })

    ipcListen(EVENTS.MAXIMIZE_UNMAXIMIZE, (e) => {
        win.isMaximized() ? win.unmaximize() : win.maximize();
    })

    ipcListen(EVENTS.QUIT, (e) => {
        app.quit();
    })

    ipcListen(EVENTS.MINIMIZE, (e) => {
        win.minimize();
    })

    ipcListen(EVENTS.SET_WINDOW_TITLE, (e, {title}) => {
        win.setTitle(title);
    })

    ipcListen(
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