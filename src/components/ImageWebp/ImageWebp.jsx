import React, { Component } from 'react';

const transparentImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

class ImageWebp extends Component {

  /**
   * Using localStorage to memorize the compatibility test results.
   * So you don't need to test again every time you visite the site.
   */
  isCompatible = JSON.parse(localStorage.getItem('thisBrowserWebpCompatibilty')) || {};

  haveToTestCompatibility = false;

  componentDidMount = () => {

    if (!this.haveToTestCompatibility) return;

    this._testCompatibility();

    // image loading is async, so you must render Component again
    setTimeout(() => this.forceUpdate(), 0);

  }

  _testCompatibility = () => {

    /**
     * Test images from https://developers.google.com/speed/webp/faq#how_can_i_detect_browser_support_for_webp
     */
    const webpTestImages = {
      lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
      lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
      alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
      animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };

    // this.isCompatible = JSON.parse(localStorage.getItem('thisBrowserWebpCompatibilty')) || {};

    Object.keys(webpTestImages).forEach(type => {

      if (this.isCompatible[type] !== undefined) return; // already defined, go next type

      /**
       * Testing compatibility for this type
       */
      const xqImg = new Image();
      xqImg.onload = () => {
        
        this.isCompatible[type] = (xqImg.width > 0) && (xqImg.height > 0);
        localStorage.setItem('thisBrowserWebpCompatibilty', JSON.stringify(this.isCompatible));

      }
      xqImg.onerror = () => {
        
        this.isCompatible[type] = false;
        localStorage.setItem('thisBrowserWebpCompatibilty', JSON.stringify(this.isCompatible));

      }
      xqImg.src = `data:image/webp;base64,${webpTestImages[type]}`;

    });

  }

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
    
    } else if (!this.isCompatible.alpha || !this.isCompatible.lossy) {

      /**
       * Compatibility test not done yet.
       * It will be ok in the next render cycle.
       */
      this.haveToTestCompatibility = true;
       
      /**
       * For now let's render a transparent image.
       */
      actualSrc = transparentImage;

    } else {
      
      if (srcWebp.lastIndexOf('.png') === srcWebp.length - 4) {

        actualSrc = this.isCompatible.alpha ? srcWebp : src;

      } else {

        actualSrc = this.isCompatible.lossy ? srcWebp : src;

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