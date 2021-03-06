import React from 'react';
import './Styles/Glyph.css';

export class Glyph extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    const data = this.props.data;
    const internal = data.internalCharacterBox;
    return (
      <div className="Glyph" style={data.componentStyle}>
        {this.props.data.caret}
        <internal.component data={internal} />
      </div>
    );
  }
}
