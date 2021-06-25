import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { Component } from 'react';
import { Icon } from '../../Icon/Icon';

interface IBottomToolbarProps {
  active?: boolean;
  title: string;
  shortcutString?: string;
  onClick: () => void;
  icon: IconProp;
  relativePosition?: boolean;
}

export class BottomToolbarButton extends Component<IBottomToolbarProps> {
  render() {
    return (
      <button
        className={`btn-flat ${this.props.active ? 'active' : ''} brand-text`}
        title={`${this.props.title}${this.props.shortcutString ? ` (${this.props.shortcutString})` : ''}`}
        onClick={() => this.props.onClick()}
        style={this.props.relativePosition ? {position: 'relative'} : {}}
      >
        {this.props.children}
        <Icon options={{icon: this.props.icon}} />
      </button>
    )
  }
}
