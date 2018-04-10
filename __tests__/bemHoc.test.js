import React   from 'react';
import {
  configure,
  mount,
  shallow,
  render }     from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import bem     from '../src/hoc';

configure({ adapter: new Adapter() });

const incomingProps = {
  modifier1: true,
  modifier2: 'value',
  modifier3: [0, 1, 2, 3, undefined, '4'],
  modifier4: null,
  modifier5: true,
};

const inputModifiers = {
  modifier1: true,
  modifier2: 'value',
  modifier3: [0, 1, 2, 3, undefined, '4'],
  modifier4: null,
};

class RegularComponent extends React.Component {
  render() {
    const { bem } = this.props;

    return (
      <div className={bem.block(inputModifiers)}>
        <div className={bem.element('element', inputModifiers)}></div>
      </div>
    );
  }
}

const WrappedRegularComponent = bem({
  block: 'testBlock',
  modifiers: [
    'modifier1',
    'modifier2',
    'modifier3',
    'modifier4',
    'modifier5',
  ],
})(RegularComponent);

const FunctionalComponent = props => {
  const { bem } = props;

  return (
    <div className={bem.block(inputModifiers)}>
      <div className={bem.element('element', inputModifiers)}></div>
    </div>
  );
};

const WrappedFunctionalComponent = bem({
  block: 'testBlock',
  modifiers: [
    'modifier1',
    'modifier2',
    'modifier3',
    'modifier4',
    'modifier5',
  ],
})(FunctionalComponent);

test('helper should exist for regular component', () => {
  const wrapper = shallow(<WrappedRegularComponent />);

  expect(wrapper.prop('bem')).not.toBeUndefined();
});

test('helper should have callable `block` method for regular component', () => {
  const wrapper = shallow(<WrappedRegularComponent />);

  expect(typeof wrapper.prop('bem').block).toBe('function');
});

test('helper should have callable `element` method for regular component', () => {
  const wrapper = shallow(<WrappedRegularComponent />);

  expect(typeof wrapper.prop('bem').element).toBe('function');
});

test('result html should contain block node for regular component', () => {
  const wrapper = mount(<WrappedRegularComponent />);

  expect(wrapper.contains(<div class="testBlock"></div>));
});

test('result html should be correct for regular component without incoming props', () => {
  const wrapper = mount(<WrappedRegularComponent />);

  expect(wrapper.html()).toEqual('<div class="testBlock testBlock--modifier1 testBlock--modifier2 testBlock--modifier2-value testBlock--modifier3 testBlock--modifier3-0 testBlock--modifier3-1 testBlock--modifier3-2 testBlock--modifier3-3 testBlock--modifier3-4"><div class="testBlock__element testBlock__element--modifier1 testBlock__element--modifier2 testBlock__element--modifier2-value testBlock__element--modifier3 testBlock__element--modifier3-0 testBlock__element--modifier3-1 testBlock__element--modifier3-2 testBlock__element--modifier3-3 testBlock__element--modifier3-4"></div></div>');
});

test('result html should be correct for regular component with incoming props', () => {
  const wrapper = mount(<WrappedRegularComponent {...incomingProps} />);

  expect(wrapper.html()).toEqual('<div class="testBlock testBlock--modifier1 testBlock--modifier2 testBlock--modifier2-value testBlock--modifier3 testBlock--modifier3-0 testBlock--modifier3-1 testBlock--modifier3-2 testBlock--modifier3-3 testBlock--modifier3-4 testBlock--modifier5"><div class="testBlock__element testBlock__element--modifier1 testBlock__element--modifier2 testBlock__element--modifier2-value testBlock__element--modifier3 testBlock__element--modifier3-0 testBlock__element--modifier3-1 testBlock__element--modifier3-2 testBlock__element--modifier3-3 testBlock__element--modifier3-4"></div></div>');
});

test('helper should exist for functional component', () => {
  const wrapper = shallow(<WrappedFunctionalComponent />);

  expect(wrapper.prop('bem')).not.toBeUndefined();
});

test('helper should have callable `block` method for functional component', () => {
  const wrapper = shallow(<WrappedFunctionalComponent />);

  expect(typeof wrapper.prop('bem').block).toBe('function');
});

test('helper should have callable `element` method for functional component', () => {
  const wrapper = shallow(<WrappedFunctionalComponent />);

  expect(typeof wrapper.prop('bem').element).toBe('function');
});

test('result html should contain block node for functional component', () => {
  const wrapper = mount(<WrappedFunctionalComponent />);

  expect(wrapper.contains(<div class="testBlock"></div>));
});

test('result html should be correct for functional component without incoming props', () => {
  const wrapper = mount(<WrappedFunctionalComponent />);

  expect(wrapper.html()).toEqual('<div class="testBlock testBlock--modifier1 testBlock--modifier2 testBlock--modifier2-value testBlock--modifier3 testBlock--modifier3-0 testBlock--modifier3-1 testBlock--modifier3-2 testBlock--modifier3-3 testBlock--modifier3-4"><div class="testBlock__element testBlock__element--modifier1 testBlock__element--modifier2 testBlock__element--modifier2-value testBlock__element--modifier3 testBlock__element--modifier3-0 testBlock__element--modifier3-1 testBlock__element--modifier3-2 testBlock__element--modifier3-3 testBlock__element--modifier3-4"></div></div>');
});

test('result html should be correct for functional component with incoming props', () => {
  const wrapper = mount(<WrappedFunctionalComponent {...incomingProps} />);

  expect(wrapper.html()).toEqual('<div class="testBlock testBlock--modifier1 testBlock--modifier2 testBlock--modifier2-value testBlock--modifier3 testBlock--modifier3-0 testBlock--modifier3-1 testBlock--modifier3-2 testBlock--modifier3-3 testBlock--modifier3-4 testBlock--modifier5"><div class="testBlock__element testBlock__element--modifier1 testBlock__element--modifier2 testBlock__element--modifier2-value testBlock__element--modifier3 testBlock__element--modifier3-0 testBlock__element--modifier3-1 testBlock__element--modifier3-2 testBlock__element--modifier3-3 testBlock__element--modifier3-4"></div></div>');
});