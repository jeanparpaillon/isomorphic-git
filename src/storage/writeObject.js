// @ts-check
import * as types from '../typedefs.js'

import { FileSystem } from '../models/FileSystem.js'
import { GitObject } from '../models/GitObject.js'
import { writeObjectLoose } from '../storage/writeObjectLoose.js'
import { deflate } from '../utils/deflate.js'
import { shasum } from '../utils/shasum.js'

/**
 *  Resolves successfully with the SHA-1 object id of the written object
 * 
 * @param {object} args
 * @param {FileSystem} args.fs
 * @param {string} args.gitdir
 * @param {types.ObjectType} args.type
 * @param {Uint8Array} args.object
 * @param {'content'|'wrapped'|'deflated'} [args.format = 'content']
 * @param {string} [args.oid = undefined]
 * @param {boolean} [args.dryRun = false]
 * 
 * @returns { Promise<string>}
 */
export async function _writeObject({
  fs,
  gitdir,
  type,
  object,
  format = 'content',
  oid = undefined,
  dryRun = false,
}) {
  if (format !== 'deflated') {
    if (format !== 'wrapped') {
      object = GitObject.wrap({ type, object })
    }
    oid = await shasum(object)
    object = Buffer.from(await deflate(object))
  } else {
    if (oid === undefined) {
      throw new Error('When writing a deflated object, an oid is required')
    }
  }
  if (!dryRun) {
    await writeObjectLoose({ fs, gitdir, object, format: 'deflated', oid })
  }
  return oid
}
