import Metrics from '../Types/Metrics.js';
/** @typedef {import('../Types/Math_Style.js').default} Math_Style */
/** @typedef {import('../Types/Spacing_Style.js').default} Spacing_Style */
/** @typedef {import('./Typesetter.js').default} Typesetter */

/** @typedef {Object} behaviorSpec
 *  @property {Typesetter} typesetter
 *  @property {Spacing_Style} spacingStyle
 */

/**
 * @class
 * @classdesc Specifies the appreance of a node
 */
export default class Behavior {
  _componentStyle;
  _metrics; // r
  _mathStyle; // rw
  _spacingStyle; // r
  _pxpfu; // none
  _typesetter; // none
  _component; // r

  /**
   *  @param {behaviorSpec} spec
   *  */
  constructor(spec) {
    this._componentStyle = {};
    this._metrics = new Metrics(0, 0, 0);
    this._typesetter = spec.typesetter;
    this._spacingStyle = spec.spacingStyle;
  }

  /**
   * @abstract
   * updates h,w,d, and component style
   */
  _updateMetrics() {}

  /**
   * updates the css style based on the updated h,w,d _metrics
   */
  updateComponentStyleDimensions() {
    this.componentStyle.height = this._metrics.height + this._metrics.depth;
    this.componentStyle.width = this._metrics.width;
  }

  /**
   * @return {Spacing_Style}
   */
  get spacingStyle() {
    return this._spacingStyle;
  }
  /**
   * @abstract
   * @param {Math_Style} style
   */
  set mathStyle(style) {
    this._mathStyle = style;
    this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
  }

  /**
   * @return {Metrics}
   */
  get metrics() {
    return this._metrics;
  }

  /**
   * @return {Object} represents CSS of behavior
   */
  get componentStyle() {
    return this._componentStyle;
  }
  /**
   * @param {Object} addedStyles sets the current CSS excluding
   * height and width
   */
  set componentStyle(addedStyles) {
    for (const property in addedStyles) {
      if (!['height', 'width', 'depth'].includes(property)) {
        this._componentStyle[property] = addedStyles[property];
      } else {
        console.warn('SET DIMENSION IN SET', this);
      }
    }
  }
}
