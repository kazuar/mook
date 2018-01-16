import React, { Component } from 'react';
// import FaBeer from 'react-icons/fa/beer';
import MdFormatAlignLeft from 'react-icons/lib/md/format-align-left'
import MdChromeReaderMode from 'react-icons/lib/md/chrome-reader-mode'
import TiEye from 'react-icons/lib/ti/eye'

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = { view: "split"}

    this.switchToEditor = this.switchToEditor.bind(this);
    this.switchToSplit = this.switchToSplit.bind(this);
    this.switchToView = this.switchToView.bind(this);
  }

  switchToEditor(e) {
    this.props.onClick("editor")
  }

  switchToSplit(e) {
    this.props.onClick("split")
  }

  switchToView(e) {
    this.props.onClick("view")
  }

  render() {
    return (
      <div className="toolbar">
        <MdFormatAlignLeft width="22" height="22" onClick={this.switchToEditor}/>
        <MdChromeReaderMode width="22" height="22" onClick={this.switchToSplit}/>
        <TiEye width="22" height="22" onClick={this.switchToView}/>
      </div>
    );
  }
}

export default Toolbar;
