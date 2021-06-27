import React, { Component } from 'react';
import { Select } from '../Form/Select/Select';
import { Checkbox } from '../Form/Checkbox/Checkbox';
import { ColorPicker } from '../Form/ColorPicker/ColorPicker';
import { VersionFooter } from '../VersionFooter/VersionFooter';

import themeManager from '../../util/theme';
import {
  showMenuBarWhenFullscreenSetting,
  startFullscreenSetting,
  startMaximizedSetting
} from '../../../common/code/settings';

import { customAccentColorSetting } from '../../util/settings';
import { CUSTOM_ACCENT_COLOR_SETTING_DEFAULT } from '../../../common/constants/settings';

import { Header } from '../Header/Header';

export default class Settings extends Component {
  render() {
    const currentTheme = themeManager.getTheme();

    return (
      <div>
        <Header
          title="Settings"
          leftMenu={['home']}
        />
        <div className="container">
          <Select
            label="Theme"
            defaultValue={currentTheme.theme}
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

          {currentTheme.css.customizableAccentColor && (
            <ColorPicker
              label="Accent Color"
              info="Accent color for the theme."
              currentValue={currentTheme.css.highlightTextColor}
              defaultValue={CUSTOM_ACCENT_COLOR_SETTING_DEFAULT}
              onPick={(color) => {
                customAccentColorSetting.set(color);
                themeManager._themeChanged();
              }}
            />
          )}

          <Checkbox
            label="Start Maximized"
            info="Start Rainbow Board in maximized state each time."
            defaultValue={startMaximizedSetting.get()}
            onInput={(val) => startMaximizedSetting.set(val)}
          />

          <Checkbox
            label="Start Fullscreen"
            info="Start Rainbow Board in fullscreen mode each time."
            defaultValue={startFullscreenSetting.get()}
            onInput={(val) => startFullscreenSetting.set(val)}
          />

          <Checkbox
            label="Fullscreen Menubar"
            info="Show the top menubar in fullscreen mode."
            defaultValue={showMenuBarWhenFullscreenSetting.get()}
            onInput={(val) => showMenuBarWhenFullscreenSetting.set(val)}
          />
          {/*
          <Checkbox
            label={<span><a href="https://gnome.org">GNOME</a> Style Headerbar</span>}
            defaultValue={useGnomeStyleHeaderbarSetting.get()}
            onInput={(val) => {
              useGnomeStyleHeaderbarSetting.set(val);
              ipcRenderer.send(RESTART);
            }}
          /> */}
        </div>

        <VersionFooter />
      </div>
    )
  }
}
