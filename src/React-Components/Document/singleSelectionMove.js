import determineKeychain from '../../../Experiment 2/determineKeychain';

/**
 * @param {Object} prevState
 * @param {String} direction
 * @return {Object} updateState
 */
export default function singleSelectionMove(prevState, direction) {
  const oldFocus = prevState.selection.focus;
  const model = prevState.model;
  const newFocus = determineKeychain(oldFocus, model, direction);
  const anchor = prevState.selection.anchor;
  const selection = { anchor, focus: newFocus };
  return { selection };
}