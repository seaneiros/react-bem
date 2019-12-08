import {
  useState,
  useEffect } from 'react';
import Bem    from '../Bem';


function useBem(settings, props = {}) {
  const bemInstance = new Bem(settings);
  const { className } = props;
  const { modifiers = [] } = settings;
  const [ bem, setBem ] = useState({
    block: modifiersMap => bemInstance.block(props, modifiersMap),
    element: bemInstance.element.bind(bemInstance),
  });

  useEffect(() => {
    setBem({
      block: modifiersMap => bemInstance.block(props, modifiersMap),
      element: bemInstance.element.bind(bemInstance),
    });
  }, [ className, ...modifiers.map( m => props[m] ) ]);

  return bem;
}

export default useBem;