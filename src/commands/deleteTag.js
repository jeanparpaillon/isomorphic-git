// @ts-check
import { GitRefManager } from '../managers/GitRefManager.js'
import { FileSystem } from '../models/FileSystem.js'

/**
 * Delete a local tag ref
 *
 * @param {Object} args
 * @param {FileSystem} args.fs
 * @param {string} args.gitdir
 * @param {string} args.ref - The tag to delete
 *
 * @returns {Promise<void>} Resolves successfully when filesystem operations are complete
 *
 * @example
 * await git.deleteTag({ dir: '$input((/))', ref: '$input((test-tag))' })
 * console.log('done')
 *
 */
export async function _deleteTag({ fs, gitdir, ref }) {
  ref = ref.startsWith('refs/tags/') ? ref : `refs/tags/${ref}`
  await GitRefManager.deleteRef({ fs, gitdir, ref })
}
