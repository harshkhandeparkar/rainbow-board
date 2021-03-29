import { BrowserWindow } from 'electron';
import { splashHTMLFilePath, iconPath } from '../constants/paths';

export function makeSplashScreen() {
  const splashWin = new BrowserWindow({
    width: 400,
    height: 400,
    center: true,
    resizable: false,
    frame: false,
    show: false,
    icon: iconPath
  })

  splashWin.removeMenu();
  splashWin.loadFile(splashHTMLFilePath);

  splashWin.webContents.on('did-finish-load', () => {
    splashWin.show();
  })

  return splashWin;
}
