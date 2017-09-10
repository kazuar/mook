
import React, { Component } from 'react';
import hljs from 'highlight.js';

class CodeBlock extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.highlightCode();
  }

  componentDidUpdate() {
      this.highlightCode();
  }

  highlightCode() {
      hljs.highlightBlock(this.refs.code);
  }

  render() {
    return (
      <pre>
        <code ref='code' className={this.props.language}>
          {this.props.literal}
        </code>
      </pre>
    );
  }
}

export default CodeBlock;
