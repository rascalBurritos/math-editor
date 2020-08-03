import docListOne from '../../Test/docListOne';
import '../../Test/nodeImports';
/**
 * @return {Object} document state
 */
export default function documentStartup() {
  // vertical list -> textblock -> textGlyph
  const starterKeychain = [
    { isCaret: false, index: 1 },
    { isCaret: false, index: 1 },
    { isCaret: true, index: 4 },
  ];
  const selection = { anchor: starterKeychain, focus: starterKeychain };
  return { model: docListOne, selection };
}
