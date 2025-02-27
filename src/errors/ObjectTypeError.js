// @ts-check
import * as types from '../typedefs.js'

import { BaseError } from './BaseError.js'

export class ObjectTypeError extends BaseError {
  /**
   * @param {string} oid
   * @param {types.ObjectType | undefined} actual
   * @param {types.ObjectType | undefined} [expected = undefined]
   * @param {string} [filepath]
   */
  constructor(oid, actual, expected = undefined, filepath) {
    const msg = expected
      ? `Object ${oid} ${
          filepath ? `at ${filepath}` : ''
        }was anticipated to be a ${expected} but it is a ${actual}.`
      : `Object ${oid} ${filepath ? `at ${filepath}` : ''}is a ${actual}.`

    super(msg)
    this.code = this.name = ObjectTypeError.code
    this.data = { oid, actual, expected, filepath }
  }
}
/** @type {'ObjectTypeError'} */
ObjectTypeError.code = 'ObjectTypeError'
