import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import ReactMarkdown from 'react-markdown';
import assign from 'lodash.assign';
import Editor from './editor.js';
import CodeBlock from './code-block.js';

import logo from './logo.svg';
import './App.css';

require('highlight.js/styles/monokai.css');

const fs = window.require('fs');
const isDev = window.require('electron-is-dev');
const electron = window.require('electron');
const path = window.require('path');
const electron_process = electron.process;
const electron_app = electron.app;
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const dialog = remote.dialog;

class App extends Component {
  constructor(props) {
    super();

    ipc.on('file-opened', (event, file, content) => {
      this.setState({
        markdownSrc: content
      });
    });

    ipc.on('save-file', (event) => {
      dialog.showSaveDialog((filename) => {
        if(filename == undefined){
          return;
        }

        var content = this.state.markdownSrc;

        fs.writeFile(filename, content, (err) => {
          if (err) console.log(err);
          alert("The file has been successfully saved.");
        })
      });
    });

    // Open the readme file
    const file_name = path.join((isDev ? '' : window.process.resourcesPath), "README.md");
    const content = fs.readFileSync(file_name).toString();


    this.state = {
      markdownSrc: content,
      htmlMode: 'raw'
    };

    this.onMarkdownChange = this.onMarkdownChange.bind(this);
    this.onControlsChange = this.onControlsChange.bind(this);
  }

  onMarkdownChange(md) {
    this.setState({
      markdownSrc: md
    });
  }

  onControlsChange(mode) {
    this.setState({ htmlMode: mode });
  }

  render() {
    return (
      <div className="App">
        <SplitPane split="vertical" defaultSize="50%">
          <div className="editor-pane">
            <Editor className="editor" value={this.state.markdownSrc} onChange={this.onMarkdownChange}/>
          </div>
          <div className="view-pane">
            <ReactMarkdown className="result"
              source={this.state.markdownSrc}
              skipHtml={this.state.htmlMode === 'skip'}
              escapeHtml={this.state.htmlMode === 'escape'}
              renderers={assign({}, ReactMarkdown.renderers, {CodeBlock: CodeBlock})}
            />
          </div>
        </SplitPane>
      </div>
    );
  }
}

export default App;
