import { app } from 'electron';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import isDev from 'electron-is-dev';

if (isDev) {
  const devUserDataPath = path.join(app.getPath('appData'), 'rainbow-board-dev');
  if (!existsSync(devUserDataPath)) mkdirSync(devUserDataPath);

  app.setPath('userData', devUserDataPath);
}

export const iconPath = path.join(__dirname, '..', 'public', 'logo-no-shadow.png');
export const indexFilePath = path.join(__dirname, '..', 'public', 'index.html');
export const splashHTMLFilePath = path.join(__dirname, '..', 'public', 'splash.html');
export const pluginsDir =path.join(app.getPath('userData'), 'plugins');
