// @ts-check
import * as types from '../typedefs.js'

import { GitWalkerIndex } from '../models/GitWalkerIndex.js'
import { GitWalkSymbol } from '../utils/symbols.js'

/**
 * @returns {types.Walker}
 */
export function STAGE() {
  const o = Object.create(null)
  Object.defineProperty(o, GitWalkSymbol, {
    value: function({ fs, gitdir, cache }) {
      return new GitWalkerIndex({ fs, gitdir, cache })
    },
  })
  Object.freeze(o)
  return o
}
