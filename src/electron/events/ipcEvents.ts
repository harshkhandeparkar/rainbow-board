import { BrowserWindow, App, dialog } from 'electron';
import * as EVENTS from '../../common/constants/events';
import { openDialog } from '../util/open';
import { setWindowMenu } from '../util/windowMenu';
import { menuClickEvents } from './menuClickEvents';
import { IPCListen } from './limitedIPC';

export function setIPCHandlers(
    win: BrowserWindow,
    app: App,
    isDev: boolean
) {
    IPCListen(EVENTS.LOCATION_CHANGED, (e, {path}) => {
        setWindowMenu(win, isDev, path);
    })

    IPCListen(EVENTS.RESTART, () => {
        app.relaunch();
        app.quit();
    })

    IPCListen(EVENTS.OPEN, (e) => {
        openDialog(win, e);
    })

    IPCListen(EVENTS.FIRE_MENU_EVENT, (e, {eventName, options}) => {
        menuClickEvents.fire(eventName, options);
    })

    IPCListen(EVENTS.MAXIMIZE_UNMAXIMIZE, (e) => {
        win.isMaximized() ? win.unmaximize() : win.maximize();
    })

    IPCListen(EVENTS.QUIT, (e) => {
        app.quit();
    })

    IPCListen(EVENTS.MINIMIZE, (e) => {
        win.minimize();
    })

    IPCListen(EVENTS.SET_WINDOW_TITLE, (e, {title}) => {
        win.setTitle(title);
    })

    IPCListen(
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