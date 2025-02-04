// @ts-check
import * as types from '../typedefs.js'

/**
 * @param {any} remote
 * @param {string | undefined} prefix
 * @param {boolean} symrefs
 * @param {boolean} peelTags
 * @returns {types.ServerRef[]}
 */
export function formatInfoRefs(remote, prefix, symrefs, peelTags) {
  const refs = []
  for (const [key, value] of remote.refs) {
    if (prefix && !key.startsWith(prefix)) continue

    if (key.endsWith('^{}')) {
      if (peelTags) {
        const _key = key.replace('^{}', '')
        // Peeled tags are almost always listed immediately after the original tag
        const last = refs[refs.length - 1]
        const r = last.ref === _key ? last : refs.find(x => x.ref === _key)
        if (r === undefined) {
          throw new Error('I did not expect this to happen')
        }
        r.peeled = value
      }
      continue
    }
    /** @type types.ServerRef */
    const ref = { ref: key, oid: value }
    if (symrefs) {
      if (remote.symrefs.has(key)) {
        ref.target = remote.symrefs.get(key)
      }
    }
    refs.push(ref)
  }
  return refs
}
