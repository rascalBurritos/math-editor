import Document_Node from '../../../Abstract/Document_Node.js';
import CaretNode from '../../../../Experiment/CaretNode.js';
/** @typedef {import('./Formula_Behavior').default} Formula_Behavior */

/**
 * @class
 */
export default class Formula_Node extends Document_Node {
  /**
   * @param {Formula_Behavior} formulaBehavior
   */
  constructor(formulaBehavior) {
    super(formulaBehavior);
    /**
     * List of descendants from left to right
     */
    this._elements = [];
  }

  /**
   *
   */
  update() {
    this.updateBehavior();
    // this.linkCaretNodes();
  }

  /**
   * Updates the behavior if there is a change in the elements
   **/
  updateBehavior() {
    this._behavior.elementBehaviors = this._elements.map((element) => {
      return element.behavior;
    });
  }

  /**
   * add Document Node to end of elements
   * @param {Document_Node} node node to be pushed
   */
  push(node) {
    this._elements.push(node);
    this.update();
  }

  /**
   * @param {Document_Node[]} elementArray Node array to
   *  set elements to
   */
  set elements(elementArray) {
    this._elements = elementArray;
    this.update();
  }
  /**
   *
   */
  linkCaretNodes() {
    /**
     * first left one is fine
     * merge first right one and second left one
     * continue until reach last right one
     * last right one is fine
     *
     */
    if (this._elements.length === 0) return;
    this.leftCaretNode = this._elements[0].leftCaretNode;
    this.rightCaretNode = this._elements.slice(-1)[0].rightCaretNode;
    const parent = this;
    const lcn = { parent, index: 0 };
    this.leftCaretNode.change(lcn);
    const rcn = { parent, index: this._elements.length };
    this.rightCaretNode.change(rcn);

    for (const [indexOfElement, element] of this._elements
      .slice(0, -1)
      .entries()) {
      // this makes the left right and the right left point to the same things
      const middleMan = new CaretNode({ parent, index: indexOfElement + 1 });
      const leftOfMiddle = element.rightCaretNode.left;
      middleMan.linkLeftTo(leftOfMiddle);
      const rightOfMiddle = this._elements[indexOfElement + 1].leftCaretNode
        .right;
      middleMan.linkRightTo(rightOfMiddle);

      element.rightCaretNode = middleMan;
      this._elements[indexOfElement + 1].leftCaretNode = middleMan;

      middleMan.middleman = 'middle';
    }
  }
}
