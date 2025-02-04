// @ts-check
import { GitObject } from '../models/GitObject.js'
import { shasum } from '../utils/shasum.js'

/**
 *
 * @typedef {object} HashObjectResult - The object returned has the following schema:
 * @property {string} oid - The SHA-1 object id
 * @property {Buffer<ArrayBufferLike>} object - The wrapped git object (the thing that is hashed)
 *
 */

/**
 * 
 * @param {*} param0 
 * @returns {Promise<HashObjectResult>}
 */
export async function hashObject({
  type,
  object,
  format = 'content',
  oid = undefined,
}) {
  if (format !== 'deflated') {
    if (format !== 'wrapped') {
      object = GitObject.wrap({ type, object })
    }
    oid = await shasum(object)
  }
  return { oid, object }
}
