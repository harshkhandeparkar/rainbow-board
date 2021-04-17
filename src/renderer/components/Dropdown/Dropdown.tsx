import React, { Component, createRef, RefObject } from 'react';

interface IDropdownProps {
  getTriggerBtn: (ref: RefObject<HTMLButtonElement>) => React.ReactElement<HTMLButtonElement>
}

export class Dropdown extends Component<IDropdownProps> {
  btnRef: RefObject<HTMLButtonElement> = createRef();
  dropdownRef: RefObject<HTMLDivElement> = createRef();

  state = {
    dropped: false
  }

  adjustPosition() {
    const btnRect = this.btnRef.current.getBoundingClientRect();
    const dropdownRect = this.dropdownRef.current.getBoundingClientRect();
    const dropdownLeft = btnRect.left - (dropdownRect.width - btnRect.width) / 2;
    const dropdownTop = btnRect.top + btnRect.height;

    this.dropdownRef.current.style.setProperty('left', `${dropdownLeft.toString()}px`);
    this.dropdownRef.current.style.setProperty('top', `${dropdownTop.toString()}px`);
  }

  _onResize = () => {
    this.adjustPosition();
  }

  _onClick = () => {
    this.adjustPosition();

    this.setState({
      dropped: !this.state.dropped
    })
  }

  componentDidMount() {
    this.btnRef.current.addEventListener('click', this._onClick);
    window.addEventListener('resize', this._onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
    this.btnRef.current.removeEventListener('resize', this._onClick);
  }

  render() {
    return (
      <>
        {this.props.getTriggerBtn(this.btnRef)}
        <div className="dropdown-content" ref={this.dropdownRef} style={{visibility: this.state.dropped ? 'visible' : 'hidden', position: 'absolute'}}>
          {this.props.children}
        </div>
      </>
    )
  }
}
