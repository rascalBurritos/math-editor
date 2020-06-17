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
  _type; // rw
  _componentStyle; // rw
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
    // this._mathStyle = style;
    // this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
  }
  /**
   * @return {Math_Style}
   */
  get mathStyle() {
    return this._mathStyle;
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
   * one key value pair
   */
  appendComponentStyle(addedStyles) {
    for (const property in addedStyles) {
      if (!['height', 'width', 'depth'].includes(property)) {
        this._componentStyle[property] = addedStyles[property];
      } else {
        console.warn('SET DIMENSION IN SET', this);
      }
    }
  }

  /**
   * @return {React.Component}
   */
  get component() {
    return this._component;
  }

  /**
   * @return {String}
   */
  get type() {
    return this._type;
  }
  /**
   * @param {String} string
   */
  set type(string) {
    this._type = string;
  }
}