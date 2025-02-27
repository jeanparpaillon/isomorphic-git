// @ts-check
import { GitConfigManager } from '../managers/GitConfigManager.js'
import { FileSystem } from '../models/FileSystem.js'

/**
 * @param {Object} args
 * @param {FileSystem} args.fs
 * @param {string} args.gitdir
 * @param {string} args.remote
 *
 * @returns {Promise<void>}
 */
export async function _deleteRemote({ fs, gitdir, remote }) {
  const config = await GitConfigManager.get({ fs, gitdir })
  await config.deleteSection('remote', remote)
  await GitConfigManager.save({ fs, gitdir, config })
}
