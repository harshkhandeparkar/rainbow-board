import { app } from 'electron';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import isDev from 'electron-is-dev';

// Change the userData path in dev mode
if (isDev) {
  const devUserDataPath = path.join(app.getPath('appData'), 'rainbow-board-dev');

  if (!existsSync(devUserDataPath)) mkdirSync(devUserDataPath);

  app.setPath('userData', devUserDataPath);
}

/** PATH: Icon file */
export const iconPath = path.join(__dirname, '..', 'img', 'icon.png');
/** PATH: index.html */
export const indexFilePath = path.join(__dirname, '..', 'frontend', 'index.html');
/** PATH: splash screen html file */
export const splashHTMLFilePath = path.join(__dirname, '..', 'frontend', 'splash.html');
/** PATH: Plugins director */
export const pluginsDir =path.join(app.getPath('userData'), 'plugins');
