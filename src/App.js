import React, { Component } from 'react';

import ImageWebp from './components/ImageWebp/ImageWebp';

import anaIvanovicJpg from './images/ana-ivanovic.jpg';
import anaIvanovicWebp from './images/ana-ivanovic.webp';
import penguinPng from './images/penguin.png';
import penguinWebp from './images/penguin_lossyalpha.webp';
import rosePng from './images/rose.png';
import roseWebp from './images/rose_lossyalpha.webp';

import './App.css';

class App extends Component {

  state = {
    AnaTitle: '(jpg)',
    PenguinTitle: '(png)',
    RoseTitle: '(png)',
  };

  _checkImageLoadedIsWebp = (e) => (e.target.src.lastIndexOf('.webp') === e.target.src.length - 5);
  
  _setTitleAna = (e) => {
    
    if (this._checkImageLoadedIsWebp(e)) this.setState({ AnaTitle: '(webp lossy)' }); 
 
  }
  
  _setTitlePenguin = (e) => {
    
    if (this._checkImageLoadedIsWebp(e)) this.setState({ PenguinTitle: '(webp lossy transparency)' }); 

  }
  
  _setTitleRose = (e) => {
    
    if (this._checkImageLoadedIsWebp(e)) this.setState({ RoseTitle: '(webp lossy transparency)' }); 

  }

  render() {

    const {
      AnaTitle,
      PenguinTitle,
      RoseTitle,
    } = this.state;

    return (
      <div className="App">

        <div className="App-title">
          Webp images demo
        </div>

        <div className="App-container">

          { /* ----- Without webp ----- */ }
          
          <div className="App-col">
          
            <div className="App-item">
              <img
                src={anaIvanovicJpg}
                width="600"
                height="600"
                alt=""
              />
              <div> Ana Ivanovic (jpg)</div>
            </div>
      
            <div className="App-item">
              <img
                src={penguinPng}
                width="386"
                height="395"
                alt=""
              />
              <div> Penguin (png with transparency)</div>
            </div>

            <div className="App-item">
              <img
                src={rosePng}
                width="400"
                height="401"
                alt=""
              />
              <div> Rose (png with transparency)</div>
            </div>

          </div>

          { /* ----- With webp ----- */ }

          <div className="App-col">
          
            <div className="App-item">
              <ImageWebp
                srcWebp={anaIvanovicWebp}
                src={anaIvanovicJpg}
                width="600"
                height="600"
                onLoad={this._setTitleAna}
              />
              <div> Ana Ivanovic {AnaTitle}</div>
            </div>
      
            <div className="App-item">
              <ImageWebp
                srcWebp={penguinWebp}
                src={penguinPng}
                width="386"
                height="395"
                onLoad={this._setTitlePenguin}
              />
              <div> Penguin {PenguinTitle}</div>
            </div>

            <div className="App-item">
              <ImageWebp
                srcWebp={roseWebp}
                src={rosePng}
                width="400"
                height="401"
                onLoad={this._setTitleRose}
              />
              <div> Rose {RoseTitle}</div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default App;
