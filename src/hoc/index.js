import React from 'react';

import Bem   from '../Bem';

export default function bemHoc(settings = {}) {

  return Component => {

    class BemWrapper extends React.PureComponent {
  
      constructor(props) {
        super();
  
        const bemInstance = new Bem(settings);
        const blockMethod = function block(modifiers) {
          return bemInstance.block(this.props, modifiers)
        };
  
        this.bem = {
          block: blockMethod.bind(this),
          element: bemInstance.element.bind(bemInstance),
        }
      }
  
      render() {
  
        return (
          <Component bem={this.bem} {...this.props} />
        );
      }
    }

    return BemWrapper;
  }
}