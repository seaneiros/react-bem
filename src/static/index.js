import Bem   from '../Bem';

/**
 * Wrap stateless component with bem naming methods
 *
 * @method bemStateless
 * @param {Object} settings
 * @return {Function}   Decorator function
 */
export default function bemStatic(settings = {}) {
  return Component => {
    Component.bem = new Bem(settings);

    return Component;
  }
}