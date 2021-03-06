/** @typedef {import('./Behavior.js').default} Behavior  */

import CaretHolder from '../../Experiment/CaretHolder.js';

export default class Document_Node extends CaretHolder {
  /**
   * @param {Behavior} behavior
   */
  constructor(behavior) {
    super();
    this._behavior = behavior;
    this._behavior.node = this;
  }
  /**
   * @return {Behavior}
   */
  get behavior() {
    return this._behavior;
  }
}
