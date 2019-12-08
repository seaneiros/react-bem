const DEFAULT_BEM_CONFIG = {
  element: '__',
  modifier: '--',
  modifierValue: '-',
};
/**
 * Class to contain bem methods
 *
 * @class Bem
 */
class Bem {

  constructor(settings = {}) {
    const { block = 'nameless', modifiers = [], config = DEFAULT_BEM_CONFIG } = settings;

    this.blockName = block;
    this.modifiers = modifiers;
    this.config = { ...DEFAULT_BEM_CONFIG, ...config };
  }

  /**
   * Construct class from block name and modifiers
   *
   * @method block
   * @param {Object} props={}
   * @param {Object} passedModifiers={}
   * @return {String}
   */
  block(props = {}, passedModifiers = {}) {
    const classList = [];

    if (props.className) {
      classList.push(props.className);
    }

    classList.push(this.blockName);

    const modifiersFromPropsAsObject = this.modifiers.reduce( (collector, modifier) =>  ({ ...collector, [modifier]: props[modifier] }), {});
    const classListFromModifiers = modifiersFromObj(this.blockName, { ...modifiersFromPropsAsObject, ...passedModifiers }, this.config);


    classList.push(...classListFromModifiers);

    return classList.join(' ');
  }

  /**
   * Construct class from element name and modifiers
   *
   * @method element
   * @param {String} elementName
   * @param {Object} modifiers
   * @return {String}
   */
  element(elementName, modifiers = {}) {
    const { element: elementDelimiter } = this.config;
    const elementClass = `${this.blockName}${elementDelimiter}${elementName}`;
    const modifiersClasses = modifiersFromObj(elementClass, modifiers, this.config);

    return [elementClass, ...modifiersClasses].join(' ');
  }
}

export default Bem;


/* HELPERS */

/**
 * Create class name with modifier
 *
 * @method createModifier
 * @param {String} baseClass
 * @param {String} modifierName
 * @param {any} modifierValue
 * @param {any} config
 * @return {String}
 */
function createModifier(baseClass, modifierName, modifierValue = null, config = DEFAULT_BEM_CONFIG) {
  const {
    modifier: modifierDelimiter,
    modifierValue: modifierValueDelimiter,
  } = config;

  // check only null, undefined and false values to save 0 value
  if (modifierValue == null || modifierValue === false) {
    return '';
  }

  const className = `${baseClass}${modifierDelimiter}${modifierName}`;

  // if no modifier value passed or it is boolean, then return modifier class itself
  if (modifierValue === true) {
    return className;
  }

  const classList = [];

  if (Array.isArray(modifierValue)) {
    const modifierClassList = modifierValue
      .filter( value => value != null && value !== false )
      .reduce( (collector, value) => {
        collector.push(...createModifier(baseClass, modifierName, value, config).split(' '));

        return collector;
      }, []);
    
    classList.push(...modifierClassList);
  } else {
    classList.push(`${className}${modifierValueDelimiter}${modifierValue}`);
  }
  
  return [...new Set(classList)].join(' ');
}

/**
 * Get list of modifier classes
 *
 * @method modifiersFromObj
 * @param {String} baseClass
 * @param {Object} modifiers
 * @param {Object} config
 * @return {Array}
 */
function modifiersFromObj(baseClass, modifiers, config) {
  const classList = [];

  Object.keys(modifiers).forEach( modifier => {
    modifiers[modifier] != null && modifiers[modifier] !== false && classList.push(createModifier(baseClass, modifier, modifiers[modifier], config));
  });

  return classList;
}