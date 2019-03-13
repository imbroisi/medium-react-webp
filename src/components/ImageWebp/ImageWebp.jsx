import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const transparentImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

/**
 * Using localStorage to memorize the compatibility test results.
 * So we don't need to test again every time you visite the site.
 */
const getWebpCompatibilityInfo = () => JSON.parse(localStorage.getItem('thisBrowserWebpCompatibilty'));
const saveWebpCompatibilityInfo = info => localStorage.setItem('thisBrowserWebpCompatibilty', JSON.stringify(info));

let webpCompatibilityInfo = getWebpCompatibilityInfo();

const webpCompatibilityTest = () => {

  /**
   * Test images data from https://developers.google.com/speed/webp/faq#how_can_i_detect_browser_support_for_webp
   */
  const webpTestImages = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
  };

  const webpTestImagesKeys = Object.keys(webpTestImages);
  let nCompatible = 0;
  webpCompatibilityInfo = { NONE: true };

  webpTestImagesKeys.forEach((type) => {

    /**
     * Testing compatibility for this type
     */
    const xqImg = new Image();
    xqImg.onload = () => {

      webpCompatibilityInfo[type] = (xqImg.width > 0) && (xqImg.height > 0);

      if (webpCompatibilityInfo[type]) {
      
        webpCompatibilityInfo.NONE = false;
        nCompatible += 1;

        if (nCompatible === webpTestImagesKeys.length) webpCompatibilityInfo.ALL = true;

      }

      saveWebpCompatibilityInfo(webpCompatibilityInfo);

    };
    xqImg.onerror = () => {
      
      webpCompatibilityInfo[type] = false;
      saveWebpCompatibilityInfo(webpCompatibilityInfo);

    };
    xqImg.src = `data:image/webp;base64,${webpTestImages[type]}`;

  });

};

const activateWebpCompatibility = () => {

  if (!getWebpCompatibilityInfo()) webpCompatibilityTest();

};

class ImageWebp extends PureComponent {

  actualSrc = null;

  componentDidMount = () => {

    /**
     * this.actualSrc === transparentImage signs we have to test compatibility.
     */
    if (this.actualSrc !== transparentImage) return;
    
    /**
     * webpCompatibilityInfo is common for all ImageWebp components in the project.
     *
     * Check if it is already set by another ImageWebp component.
     */
    if (!webpCompatibilityInfo) webpCompatibilityTest();

    setTimeout(() => this.forceUpdate(), 0);

  }

  onLoad = (e) => {
    
    const { onLoad } = this.props;
    if (onLoad && e.target.src !== transparentImage) onLoad(e);

  }

  onMouseMove = (e) => {
    
    const { onMouseMove } = this.props;
    if (onMouseMove && e.target.src !== transparentImage) onMouseMove(e);

  }

  onMouseLeave = (e) => {
    
    const { onMouseLeave } = this.props;
    if (onMouseLeave && e.target.src !== transparentImage) onMouseLeave(e);

  }

  render() {

    const {
      src,
      srcWebp,
      className,
      style,
      width,
      height,
      alt,
    } = this.props;

    this.actualSrc = src;

    if (srcWebp) {

      if (!webpCompatibilityInfo) {

        /**
         * Compatibility test not done yet, it will be done in componentDidMount()
         */
        this.actualSrc = transparentImage;

      } else {

        const {
          ALL,
          NONE,
          lossless,
          alpha,
          lossy,
          animation,
        } = webpCompatibilityInfo;

        if (ALL) {

          this.actualSrc = srcWebp;

        } else if (!NONE) {

          if (srcWebp.lastIndexOf('.alpha.webp') === src.length - 11) {

            if (alpha) this.actualSrc = srcWebp;

          } else if (srcWebp.lastIndexOf('.lossless.webp') === src.length - 14) {

            if (lossless) this.actualSrc = srcWebp;

          } else if (srcWebp.lastIndexOf('.animation.webp') === src.length - 15) {

            if (animation) this.actualSrcalSrc = srcWebp;

          } else if (lossy) this.actualSrc = srcWebp;

        }

      }
    
    }

    return (
      <img
        src={this.actualSrc}
        className={className}
        style={style}
        onLoad={this.onLoad}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
        alt={alt}
        width={width}
        height={height}
      />
    );

  }

}

ImageWebp.propTypes = {
  src: PropTypes.string.isRequired,
  srcWebp: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onLoad: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  alt: PropTypes.string,
};

ImageWebp.defaultProps = {
  srcWebp: null,
  className: null,
  style: null,
  width: null,
  height: null,
  onLoad: null,
  onMouseMove: null,
  onMouseLeave: null,
  alt: '',
};


export default ImageWebp;
export {
  getWebpCompatibilityInfo,
  activateWebpCompatibility,
};
