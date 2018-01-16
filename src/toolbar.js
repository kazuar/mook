import React, { Component } from 'react';

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = { view: "split"}

    this.updateView = this.updateView.bind(this);
  }

  updateView(e) {
    this.props.onClick(e);
	}

  render() {
    return (
      <div className="toolbar">
        <button type="button" id="editor" onClick={this.updateView}>editor</button>
        <button type="button" id="split" onClick={this.updateView}>split</button>
        <button type="button" id="view" onClick={this.updateView}>view</button>
      </div>
    );
  }
}

export default Toolbar;
