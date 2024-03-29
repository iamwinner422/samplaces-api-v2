import vine from '@vinejs/vine'

/**
 * Re-usable helper to check if the field value
 * is an object and has a matching type
 */
function hasType(value: unknown, type: string) {
  return vine.helpers.isObject(value) && value.type === type
}
export default hasType;
