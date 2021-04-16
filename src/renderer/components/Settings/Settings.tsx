import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Select } from '../Form/Select/Select';
import { Checkbox } from '../Form/Checkbox/Checkbox';
import { VersionFooter } from '../VersionFooter/VersionFooter';
import themeManager from '../../util/theme';
import {
  showMenuBarWhenFullscreenSetting,
  startFullscreenSetting,
  startMaximizedSetting,
  useGnomeStyleHeaderbarSetting
} from '../../../common/code/settings';

import { Icon } from '../Icon/Icon';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { ipcRenderer } from 'electron';

export default class Settings extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper header container">
            <span className="brand-logo center brand-text header-text">Settings</span>
            <Link to="/" title="Home">
              <Icon options={{icon: faHome}} />
            </Link>
          </div>
        </nav>
        <div className="container">
          <Select
            label="Theme:"
            defaultValue={themeManager.getTheme().theme}
            onInput={(value) => themeManager.setTheme(value)}
            options={
              Object.keys(themeManager.themes).map((theme) => {
                return {
                  value: theme,
                  label: themeManager.themes[theme]
                }
              })
            }
          />

          <Checkbox
            label="Start Maximized:"
            defaultValue={startMaximizedSetting.get()}
            onInput={(val) => startMaximizedSetting.set(val)}
          />

          <Checkbox
            label="Start Fullscreen:"
            defaultValue={startFullscreenSetting.get()}
            onInput={(val) => startFullscreenSetting.set(val)}
          />

          <Checkbox
            label="Fullscreen Menubar:"
            defaultValue={showMenuBarWhenFullscreenSetting.get()}
            onInput={(val) => showMenuBarWhenFullscreenSetting.set(val)}
          />

          <Checkbox
            label={<span><a href="https://gnome.org">GNOME</a> Style Toolbar:</span>}
            defaultValue={useGnomeStyleHeaderbarSetting.get()}
            onInput={(val) => {
              useGnomeStyleHeaderbarSetting.set(val);
              ipcRenderer.send('restart');
            }}
          />
        </div>

        <VersionFooter />
      </div>
    )
  }
}
