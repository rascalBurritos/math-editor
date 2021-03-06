import MathBehavior from '../../../Abstract/MathBehavior.js';
import Scripts from '../../../React-Components/Math/Scripts.js';
import Math_Style from '../../Types/Math_Style.js';

/** @typedef {import('../../../Abstract/MathBehavior').behaviorSpec} behaviorSpec  */

export default class Scripts_Behavior extends MathBehavior {
  _superBehavior;
  _nucleusBehavior;
  _subBehavior;
  _containerStyle;

  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this._component = Scripts;
    this.type = 'Scripts';
  }

  /**
   * @override
   * @return {boolean}
   */
  _isValid() {
    const scriptsBehavior = this;
    return (
      this._isStyleValid() &&
      doesNucleusExist() &&
      (this._doesSubscriptExist() || this._doesSuperscriptExist())
    );
    /**
     * @return {boolean}
     */
    function doesNucleusExist() {
      return scriptsBehavior._nucleusBehavior !== undefined;
    }
  }

  /**
   * @override
   */
  _preSetterSequence() {
    const scriptsBehavior = this;
    updateScriptStyles();

    /**
     * changes Styles of Sub and Script according
     * to the current style
     */
    function updateScriptStyles() {
      scriptsBehavior._nucleusBehavior.mathStyle = scriptsBehavior._mathStyle.copy();
      if (scriptsBehavior._doesSubscriptExist()) {
        scriptsBehavior._subBehavior.mathStyle = getScriptStyle(false);
      }
      if (scriptsBehavior._doesSuperscriptExist()) {
        scriptsBehavior._superBehavior.mathStyle = getScriptStyle(true);
      }
      /**
       * @param {boolean} isSuperscript
       * @return {Math_Style}
       */
      function getScriptStyle(isSuperscript) {
        const currentStyle = scriptsBehavior._mathStyle.copy();
        const styleMap = {
          D: 'S',
          T: 'S',
          S: 'SS',
          SS: 'SS',
        };
        const isCramped = isSuperscript ? currentStyle.cramped : true;
        return new Math_Style(
          styleMap[currentStyle.type],
          scriptsBehavior._mathStyle.fontSize,
          isCramped
        );
      }
    }
  }
  /**
   * @override
   * @return {Array}
   */
  _generateSetterDependencies() {
    return [this._nucleusBehavior, this._superBehavior, this._subBehavior];
  }

  /**
   * @override
   * @param {Object} settings
   */
  _postSetterSequence(settings) {
    const scriptsBehavior = this;
    updateNucleusComponentStyle();
    updateScriptsComponentStyle();
    /**
     * changes scriptsComponentStyle h,w, and top margin
     */
    function updateScriptsComponentStyle() {
      scriptsBehavior._containerStyle = settings.scriptsComponentStyle;
      if (scriptsBehavior._doesSuperscriptExist()) {
        scriptsBehavior.superBehavior.appendComponentStyle(
          settings.superscriptComponentStyle
        );
      }
      if (scriptsBehavior._doesSubscriptExist()) {
        scriptsBehavior.subBehavior.appendComponentStyle(
          settings.subscriptComponentStyle
        );
      }
    }
    /**
     * changes the component styles of super,sub, nuclues
     */
    function updateNucleusComponentStyle() {
      scriptsBehavior._nucleusBehavior.appendComponentStyle(
        settings.nucleusComponentStyle
      );
    }
  }

  /**
   * @override
   * @param {Object} settings
   */
  _updateMetrics(settings) {
    this._metrics = settings.scriptContainerMetrics;
  }

  /**
   * @return {boolean}
   */
  _doesSuperscriptExist() {
    return this._superBehavior !== undefined;
  }
  /**
   * @return {boolean}
   */
  _doesSubscriptExist() {
    return this._subBehavior !== undefined;
  }

  /**
   * @return {Object}
   */
  get containerStyle() {
    return this._containerStyle;
  }

  /**
   * @param {MathBehavior} behavior
   */
  set superBehavior(behavior) {
    this._superBehavior = behavior;
    this.update();
  }
  /**
   * @return {MathBehavior} behavior
   */
  get superBehavior() {
    return this._superBehavior;
  }
  /**
   * @param {MathBehavior} behavior
   */
  set nucleusBehavior(behavior) {
    this._nucleusBehavior = behavior;
    this.update();
  }
  /**
   * @return {MathBehavior} behavior
   */
  get nucleusBehavior() {
    return this._nucleusBehavior;
  }
  /**
   * @param {MathBehavior} behavior
   */
  set subBehavior(behavior) {
    this._subBehavior = behavior;
    this.update();
  }
  /**
   * @return {MathBehavior} behavior
   */
  get subBehavior() {
    return this._subBehavior;
  }
}
