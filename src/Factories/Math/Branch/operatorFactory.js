import Spacing_Style from '../../../Math Nodes/Types/Spacing_Style';
import mathNodeFactory from '../mathNodeFactory';
import Operator_Setter from '../../../Math Nodes/Branch Nodes/Operator/Operator_Setter';
import Operator_Behavior from '../../../Math Nodes/Branch Nodes/Operator/Operator_Behavior';
import Operator_Node from '../../../Math Nodes/Branch Nodes/Operator/Operator_Node';
import variantGlyphFactory from '../Leaf/variantGlyphFactory';

/** @typedef {import('../mathNodeFactory').MathList} MathList */
/** @typedef {import('../../../Abstract/Document_Node').default} Document_Node */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Operator_Node} fontData
 */
export default function operatorFactory(mathList, fontData) {
  const setterSpec = getSetterSpec(fontData);
  const typesetter = new Operator_Setter(setterSpec);
  // spacing style is set in operator setter? NO!
  const spacingStyle = Spacing_Style.Operator;
  const behavior = new Operator_Behavior({ typesetter, spacingStyle });
  const node = new Operator_Node(behavior);
  node.nucleus = generateNucleus();
  if (mathList.lowerLimit !== undefined) {
    node.lowerLimit = mathNodeFactory(mathList.lowerLimit, fontData);
  }
  if (mathList.upperLimit !== undefined) {
    node.upperLimit = mathNodeFactory(mathList.upperLimit, fontData);
  }
  return node;

  /**
   * @return {Document_Node}
   */
  function generateNucleus() {
    const nucleusMathList = {
      type: 'Variant_Glyph',
      unicode: mathList.unicode,
      spacingStyle: Spacing_Style.None,
    };
    return variantGlyphFactory(nucleusMathList, fontData);
  }
}

/**
 * @param {Object} fontData
 * @return {Object}
 */
export function getSetterSpec(fontData) {
  const mc = fontData.MATH.MathConstants;
  const fp = {};
  fp.upm = fontData.upm;
  fp.scriptFactor = mc.ScriptPercentScaleDown;
  fp.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;
  fp.fontData = fontData;
  fp.displayOperatorMinHeight = mc.DisplayOperatorMinHeight;
  return fp;
}
