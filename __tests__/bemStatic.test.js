import React from 'react';

import Bem   from '../src/Bem';
import bem   from '../src/static';

class RegularComponent extends React.Component {
  render() {
    const { bem } = RegularComponent;

    return (
      <div className={bem.block(this.props)}>
        <div className={bem.element('child')}></div>
      </div>
    );
  }
}

const FunctionalComponent = props => {
  const { bem } = FunctionalComponent;

  return (
    <div className={bem.block(props)}>
      <div className={bem.element('child')}></div>
    </div>
  );
};

test('helper should exist for regular component', () => {
  const DecoratedComponent = bem({ block: 'testBlock' })(RegularComponent);

  expect(DecoratedComponent.bem).not.toBeUndefined();
});

test('helper should be inctance of Bem for regular component', () => {
  const DecoratedComponent = bem({ block: 'testBlock' })(RegularComponent);

  expect(DecoratedComponent.bem).toBeInstanceOf(Bem);
});

test('helper should have callable `block` method for regular component', () => {
  const DecoratedComponent = bem({ block: 'testBlock' })(RegularComponent);

  expect(typeof DecoratedComponent.bem.block).toBe('function');
});

test('helper should have `element` method for regular component', () => {
  const DecoratedComponent = bem({ block: 'testBlock' })(RegularComponent);

  expect(typeof DecoratedComponent.bem.element).toBe('function');
});

test('helper should exist for functional component', () => {
  const DecoratedComponent = bem({ block: 'testBlock' })(FunctionalComponent);

  expect(DecoratedComponent.bem).not.toBeUndefined();
});

test('helper should be inctance of Bem for functional component', () => {
  const DecoratedComponent = bem({ block: 'testBlock' })(FunctionalComponent);

  expect(DecoratedComponent.bem).toBeInstanceOf(Bem);
});

test('helper should have callable `block` method for functional component', () => {
  const DecoratedComponent = bem({ block: 'testBlock' })(FunctionalComponent);

  expect(typeof DecoratedComponent.bem.block).toBe('function');
});

test('helper should have `element` method for functional component', () => {
  const DecoratedComponent = bem({ block: 'testBlock' })(FunctionalComponent);

  expect(typeof DecoratedComponent.bem.element).toBe('function');
});