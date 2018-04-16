import Bem from '../src/Bem';

test('can create block class', () => {
  const bem = new Bem({ block: 'testBlock' });

  expect(bem.block()).toBe('testBlock');
});

test('can create default block class without config', () => {
  const bem = new Bem();

  expect(bem.block()).toBe('nameless');
});

test('can create block class with modifiers from props', () => {
  const bem = new Bem({
    block: 'testBlock',
    modifiers: [
      'modifier1',
      'modifier2',
      'modifier3',
      'modifier4',
    ],
  });

  const incomingProps = {
    modifier1: true,
    modifier2: 'value',
    modifier3: [0, 1, 2, 3, undefined, '4'],
    modifier4: null,
  };

  expect(bem.block(incomingProps)).toBe([
    'testBlock',
    'testBlock--modifier1',
    'testBlock--modifier2-value',
    'testBlock--modifier3-0',
    'testBlock--modifier3-1',
    'testBlock--modifier3-2',
    'testBlock--modifier3-3',
    'testBlock--modifier3-4',
  ].join(' '));
});

test('can create block class with passed modifiers', () => {
  const bem = new Bem({
    block: 'testBlock',
  });

  const inputModifiers = {
    modifier1: true,
    modifier2: 'value',
    modifier3: [0, 1, 2, 3, undefined, '4'],
    modifier4: null,
  };

  expect(bem.block({}, inputModifiers)).toBe([
    'testBlock',
    'testBlock--modifier1',
    'testBlock--modifier2-value',
    'testBlock--modifier3-0',
    'testBlock--modifier3-1',
    'testBlock--modifier3-2',
    'testBlock--modifier3-3',
    'testBlock--modifier3-4',
  ].join(' '));
});

test('can catch className from props', () => {
  const bem = new Bem({
    block: 'testBlock',
  });

  const incomingProps = {
    className: 'classFromProps',
  };

  expect(bem.block(incomingProps)).toBe('classFromProps testBlock');
});

test('can create block class with all params', () => {
  const bem = new Bem({
    block: 'testBlock',
    modifiers: [
      'modifier1',
      'modifier2',
    ],
  });

  const incomingProps = {
    className: 'classFromProps',
    modifier1: true,
    modifier2: null,
  };

  const inputModifiers = {
    modifier3: 'value',
    modifier4: [1, 2, , 4],
  };

  expect(bem.block(incomingProps, inputModifiers)).toBe([
    'classFromProps',
    'testBlock',
    'testBlock--modifier1',
    'testBlock--modifier3-value',
    'testBlock--modifier4-1',
    'testBlock--modifier4-2',
    'testBlock--modifier4-4',
  ].join(' '));
});

test('can create block class with all params and custom delimiters', () => {
  const bem = new Bem({
    block: 'testBlock',
    modifiers: [
      'modifier1',
      'modifier2',
    ],
    config: {
      modifier: '::',
      modifierValue: '_',
    },
  });

  const incomingProps = {
    className: 'classFromProps',
    modifier1: true,
    modifier2: null,
  };

  const inputModifiers = {
    modifier3: 'value',
    modifier4: [1, 2, , 4],
  };

  expect(bem.block(incomingProps, inputModifiers)).toBe([
    'classFromProps',
    'testBlock',
    'testBlock::modifier1',
    'testBlock::modifier3_value',
    'testBlock::modifier4_1',
    'testBlock::modifier4_2',
    'testBlock::modifier4_4',
  ].join(' '));
});

test('can create element class', () => {
  const bem = new Bem({
    block: 'testBlock',
  });

  expect(bem.element('element')).toBe('testBlock__element');
});

test('can create element class with modifiers', () => {
  const bem = new Bem({
    block: 'testBlock',
  });

  const inputModifiers = {
    modifier1: true,
    modifier2: false,
    modifier3: 'value',
    modifier4: [0, 1, 2, , 4],
  };

  expect(bem.element('element', inputModifiers)).toBe([
    'testBlock__element',
    'testBlock__element--modifier1',
    'testBlock__element--modifier3-value',
    'testBlock__element--modifier4-0',
    'testBlock__element--modifier4-1',
    'testBlock__element--modifier4-2',
    'testBlock__element--modifier4-4',
  ].join(' '));
});

test('can create element class with modifiers and custom delimiters', () => {
  const bem = new Bem({
    block: 'testBlock',
    config: {
      element: '~~',
      modifier: '::',
    },
  });

  const inputModifiers = {
    modifier1: true,
    modifier2: false,
    modifier3: 'value',
    modifier4: [0, 1, 2, , 4],
  };

  expect(bem.element('element', inputModifiers)).toBe([
    'testBlock~~element',
    'testBlock~~element::modifier1',
    'testBlock~~element::modifier3-value',
    'testBlock~~element::modifier4-0',
    'testBlock~~element::modifier4-1',
    'testBlock~~element::modifier4-2',
    'testBlock~~element::modifier4-4',
  ].join(' '));
});