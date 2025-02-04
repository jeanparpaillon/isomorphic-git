// @ts-check
import * as types from '../typedefs.js'

import { GitWalkerRepo } from '../models/GitWalkerRepo.js'
import { GitWalkSymbol } from '../utils/symbols.js'

/**
 * @param {object} args
 * @param {string} [args.ref='HEAD']
 * @returns {types.Walker}
 */
export function TREE({ ref = 'HEAD' } = {}) {
  const o = Object.create(null)
  Object.defineProperty(o, GitWalkSymbol, {
    value: function({ fs, gitdir, cache }) {
      return new GitWalkerRepo({ fs, gitdir, ref, cache })
    },
  })
  Object.freeze(o)
  return o
}
