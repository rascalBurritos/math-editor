import Rectangle from '../../../Abstract/Rectangle';
import Point from '../../../Abstract/Point';
import { isBound } from '../BaseModel';
import { CompoundTable } from '../../../Interaction/Tables/nodeTable';
import { sort } from '../Text Block/TextBlockCompound';
import { VERTICAL_LIST_TYPE } from './VerticalListViewFactory';
/** @typedef {import('./VerticalListViewFactory').VerticalListView} VerticalListView  */

CompoundTable.register(VERTICAL_LIST_TYPE, {
  getSelectionRects,
  getInsertIndex,
  getModelIndex,
  splice,
  merge,
  getElements,
  sort,
});

/**
 * @param {Object} item
 * @return {Array}
 */
function getElements(item) {
  return item.elements;
}
/**
 * @param {VerticalListView} view
 * @param {number} leftIndex
 * @param {number} rightIndex
 * @return {Rectangle[]}
 * NOTE: inclusive, i.e. includes endpoints
 */
function getSelectionRects(view, leftIndex, rightIndex) {
  const top = view.elements.slice(0, leftIndex).reduce((acc, element) => {
    const currentMetric = element.metrics;
    const marginBottom = element.componentStyle.marginBottom;
    return acc + currentMetric.height + currentMetric.depth + marginBottom;
  }, 0);
  const height = view.elements
    .slice(leftIndex, rightIndex + 1)
    .reduce((acc, element) => {
      const marginBottom = element.componentStyle.marginBottom;
      return acc + element.metrics.height + marginBottom;
    }, 0);
  const left = 0;
  const width = view.metrics.width;
  return [new Rectangle(new Point(top, left), height, width)];
}

/**
 *
 * @param {Object} boxKey
 * @return {number}
 */
function getModelIndex(boxKey) {
  if (isBound(boxKey)) {
    console.log('invalid model index');
  }
  return boxKey.index;
}
/**
 * @param {Object} boxKey
 * @return {number}
 */
function getInsertIndex(boxKey) {
  return getModelIndex(boxKey);
}

/**
 *
 * @param {Object} model
 * @param {number} leftIndex
 * @param {number} deleteCount
 * @param  {...any} toInsert
 * @return {Object}
 */
export function splice(model, leftIndex, deleteCount, ...toInsert) {
  const modelCopy = JSON.parse(JSON.stringify(model));
  modelCopy.elements.splice(leftIndex, deleteCount, ...toInsert);
  return modelCopy;
}

/**
 * @param {Object} modelA
 * @param {Object} modelB
 * @return {Object} combo
 */
export function merge(modelA, modelB) {
  const commonModel = JSON.parse(JSON.stringify(modelA));
  const elements = modelA.elements.concat(modelB.elements);
  commonModel.elements = elements;
  return commonModel;
}
