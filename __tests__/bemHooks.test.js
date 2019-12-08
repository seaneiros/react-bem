import React        from 'react';
import { useState } from 'react';
import {
  mount,
  configure }       from 'enzyme';
import Adapter      from 'enzyme-adapter-react-16';

import useBem       from '../src/hooks';


configure({ adapter: new Adapter() });

const SimpleComponent = () => {
  const [ modifier, setModifier ] = useState(false);
  const bem = useBem({ block: 'testBlock' });

  return (
    <div className={bem.block({ modifier })} onClick={() => setModifier(!modifier)} />
  );
};

const MyComponent = props => {
  const [ modValue, setModValue ] = useState(true);
  const bem = useBem({
    block: 'testBlock',
    modifiers: [
      'modifier1',
    ],
  }, props);

  return (
    <div className={bem.block({ modifier2: modValue })} onClick={() => setModValue(!modValue)}>
      <div className={bem.element('child', { childModifier1: true })} />
    </div>
  );
};

class WrapperComponent extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      modifierValue: 0,
    };
  }

  render() {

    return (
      <div>
        <MyComponent className="externalClassName" modifier1={this.state.modifierValue} />
        <button onClick={() => this.setState( ({ modifierValue }) => ({ modifierValue: modifierValue + 1 }) )}>
          Click me
        </button>
      </div>
    );
  }
}


test('simple component should be rendered correctly without passing props to hook', () => {
  const wrapper = mount(<SimpleComponent />);

  expect(wrapper.html()).toEqual('<div class="testBlock"></div>');
});

test('simple component should be rendered correctly without passing props to hook and after inner state change', () => {
  const wrapper = mount(<SimpleComponent />);

  expect(wrapper.html()).toEqual('<div class="testBlock"></div>');
  wrapper.find('.testBlock').simulate('click');
  expect(wrapper.html()).toEqual('<div class="testBlock testBlock--modifier"></div>');
  wrapper.find('.testBlock').simulate('click');
  expect(wrapper.html()).toEqual('<div class="testBlock"></div>');
});

test('component should be rendered correctly without external props', () => {
  const wrapper = mount(<MyComponent />);

  expect(wrapper.html()).toEqual('<div class="testBlock testBlock--modifier2"><div class="testBlock__child testBlock__child--childModifier1"></div></div>');
});

test('component should be rendered correctly with external className', () => {
  const wrapper = mount(<MyComponent className="external" />);

  expect(wrapper.html()).toEqual('<div class="external testBlock testBlock--modifier2"><div class="testBlock__child testBlock__child--childModifier1"></div></div>');
});

test('component should be rendered correctly after internal state change', () => {
  const wrapper = mount(<MyComponent />);

  expect(wrapper.html()).toEqual('<div class="testBlock testBlock--modifier2"><div class="testBlock__child testBlock__child--childModifier1"></div></div>');
  wrapper.find('.testBlock').simulate('click');
  expect(wrapper.html()).toEqual('<div class="testBlock"><div class="testBlock__child testBlock__child--childModifier1"></div></div>');
});

test('wrapped component should be rendered correctly', () => {
  const wrapper = mount(<WrapperComponent />);

  expect(wrapper.find('.testBlock').html()).toEqual('<div class="externalClassName testBlock testBlock--modifier1-0 testBlock--modifier2"><div class="testBlock__child testBlock__child--childModifier1"></div></div>');
});

test('wrapped component should be rendered correctly after props change', () => {
  const wrapper = mount(<WrapperComponent />);

  expect(wrapper.find('.testBlock').html()).toEqual('<div class="externalClassName testBlock testBlock--modifier1-0 testBlock--modifier2"><div class="testBlock__child testBlock__child--childModifier1"></div></div>');
  
  wrapper.find('button').simulate('click');
  expect(wrapper.find('.testBlock').html()).toEqual('<div class="externalClassName testBlock testBlock--modifier1-1 testBlock--modifier2"><div class="testBlock__child testBlock__child--childModifier1"></div></div>');
});