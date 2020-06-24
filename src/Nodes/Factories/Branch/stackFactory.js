import nodeFactory from '../nodeFactory';
import Generalized_Fraction_Node from '../../Branch Nodes/Generalized Fraction/Generalized_Fraction_Node';
import Spacing_Style from '../../Types/Spacing_Style';
import Stack_Setter from '../../Branch Nodes/Generalized Fraction/Stack_Setter';
import Stack_Behavior from '../../Branch Nodes/Generalized Fraction/Stack_Behavior';

/** @typedef {import('../nodeFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Generalized_Fraction_Node}
 */
export default function stackFactory(mathList, fontData) {
  const spec = generateSpec(fontData);
  const typesetter = new Stack_Setter(spec);
  const spacingStyle = Spacing_Style.Ordinary;
  const behavior = new Stack_Behavior({ typesetter, spacingStyle });
  const node = new Generalized_Fraction_Node(behavior);
  node.numerator = nodeFactory(mathList.numerator, fontData);
  node.denominator = nodeFactory(mathList.denominator, fontData);
  return node;
}

/**
 * @param {Object} fontData
 * @return {Object}
 */
export function generateSpec(fontData) {
  const mc = fontData.MATH.MathConstants;
  const fp = {};
  fp.upm = fontData.upm;
  fp.scriptFactor = mc.ScriptPercentScaleDown;
  fp.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;

  fp.stackTopShiftUp = mc.StackTopShiftUp;
  fp.stackTopDisplayStyleShiftUp = mc.StackTopDisplayStyleShiftUp;
  fp.stackBottomShiftDown = mc.StackBottomShiftDown;
  fp.stackBottomDisplayStyleShiftDown = mc.StackBottomDisplayStyleShiftDown;
  fp.stackGapMin = mc.StackGapMin;
  fp.stackDisplayStyleGapMin = mc.StackDisplayStyleGapMin;
  return fp;
}
