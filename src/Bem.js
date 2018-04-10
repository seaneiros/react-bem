
/**
 * Class to contain bem methods
 *
 * @class Bem
 */
class Bem {

  constructor(settings = {}) {
    const { block = 'nameless', modifiers = [] } = settings;

    this.blockName = block;
    this.modifiers = modifiers;
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
    const classListFromModifiers = modifiersFromObj(this.blockName, { ...modifiersFromPropsAsObject, ...passedModifiers });


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
    const
      elementClass = `${this.blockName}__${elementName}`,
      modifiersClasses = modifiersFromObj(elementClass, modifiers);

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
 * @return {String}
 */
function createModifier(baseClass, modifierName, modifierValue = null) {
  
  // check only null, undefined and false values to save 0 value
  if (modifierValue == null || modifierValue === false) {
    return '';
  }

  const className = `${baseClass}--${modifierName}`;

  // if no modifier value passed or it is boolean, then return modifier class itself
  if (modifierValue === true) {
    return className;
  }

  const classList = [className];

  if (Array.isArray(modifierValue)) {
    const modifierClassList = modifierValue
      .filter( value => value != null && value !== false )
      .reduce( (collector, value) => {
        collector.push(...createModifier(baseClass, modifierName, value).split(' '));

        return collector;
      }, []);
    
    classList.push(...modifierClassList);
  } else {
    classList.push(`${className}-${modifierValue}`);
  }
  
  return [...new Set(classList)].join(' ');
}

/**
 * Get list of modifier classes
 *
 * @method modifiersFromObj
 * @param {String} baseClass
 * @param {Object} modifiers
 * @return {Array}
 */
function modifiersFromObj(baseClass, modifiers) {
  const classList = [];

  Object.keys(modifiers).forEach( modifier => {
    !!modifiers[modifier] && classList.push(createModifier(baseClass, modifier, modifiers[modifier]));
  });

  return classList;
}