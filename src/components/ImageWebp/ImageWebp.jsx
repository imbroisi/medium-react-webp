import React, { Component } from 'react';

const transparentImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const testImages = {
  lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
  lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
  alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
  animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
};

/**
 * Using localStorage to memorize the compatibility test results
 * because you don't need to test again every time you visite the site.
 */
const isCompatible = JSON.parse(localStorage.getItem('thisBrowserIsWebpCompatible')) || {};

['lossy', 'alpha'].forEach(type => {

  if (isCompatible[type] === undefined) {

    const xqImg = new Image();
    xqImg.onload = () => {
      
      isCompatible[type] = (xqImg.width > 0) && (xqImg.height > 0);
      localStorage.setItem('thisBrowserIsWebpCompatible', JSON.stringify(isCompatible));

    }
    xqImg.onerror = () => {
      
      isCompatible[type] = false;
      localStorage.setItem('thisBrowserIsWebpCompatible', JSON.stringify(isCompatible));

    }
    xqImg.src = `data:image/webp;base64,${testImages[type]}`;

  }

});

class ImageWebp extends Component {

  _onLoad = (e) => {
    
    const { onLoad } = this.props;
    if (onLoad && e.target.src !== transparentImage) onLoad(e);

  }

  _onMouseMove = (e) => {
    
    const { onMouseMove } = this.props;
    if (onMouseMove && e.target.src !== transparentImage) onMouseMove(e);

  }

  _onMouseLeave = (e) => {
    
    const { onMouseLeave } = this.props;
    if (onMouseLeave && e.target.src !== transparentImage) onMouseLeave(e);

  }

  render() {

    const {
      src,
      srcWebp = null,
      className = null,
      style = null,
      width = null,
      height = null,
      alt = '',
    } = this.props;

    let actualSrc;

    if (!srcWebp) {
      
      actualSrc = src;
    
    } else if (isCompatible.alpha === undefined || isCompatible.lossy === undefined) {

      actualSrc = transparentImage;
      setTimeout(() => this.forceUpdate(), 0);

    } else {
      
      if (srcWebp.lastIndexOf('.png') === srcWebp.length - 4) {

        actualSrc = isCompatible.alpha ? srcWebp : src;

      } else {

        actualSrc = isCompatible.lossy ? srcWebp : src;

      }

    }

    return (
      <img
        src={actualSrc}
        className={className}
        style={style}
        onLoad={this._onLoad}
        onMouseMove={this._onMouseMove}
        onMouseLeave={this._onMouseLeave}
        alt={alt}
        width={width}
        height={height}
      />
    );

  }

}

export default ImageWebp;