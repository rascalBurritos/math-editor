import Spacing_Style from '../../../Math Nodes/Types/Spacing_Style.js';
import Formula_Setter from '../../../Math Nodes/Branch Nodes/Formula/Formula_Setter.js';
import Formula_Behavior from '../../../Math Nodes/Branch Nodes/Formula/Formula_Behavior.js';
import Formula_Node from '../../../Math Nodes/Branch Nodes/Formula/Formula_Node.js';
import mathNodeFactory from '../mathNodeFactory.js';

/** @typedef {import('../mathNodeFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Formula_Node}
 */
export default function formulaFactory(mathList, fontData) {
  const spacingStyle = Spacing_Style.None;
  const mc = fontData.MATH.MathConstants;
  const typesetter = new Formula_Setter({
    upm: fontData.upm,
    scriptFactor: mc.ScriptPercentScaleDown,
    scriptscriptFactor: mc.ScriptScriptPercentScaleDown,
  });
  const formulaBehavior = new Formula_Behavior({ typesetter, spacingStyle });
  const formulaNode = new Formula_Node(formulaBehavior);
  const elementNodes = [];
  for (const listElement of mathList.elements) {
    elementNodes.push(mathNodeFactory(listElement, fontData));
  }
  formulaNode.elements = elementNodes;
  return formulaNode;
}
