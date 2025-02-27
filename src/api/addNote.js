// @ts-check

import { _addNote } from '../commands/addNote.js'
import { MissingNameError } from '../errors/MissingNameError.js'
import { FileSystem } from '../models/FileSystem.js'
import * as types from '../typedefs.js'
import { assertParameter } from '../utils/assertParameter.js'
import { join } from '../utils/join.js'
import { normalizeAuthorObject } from '../utils/normalizeAuthorObject.js'
import { normalizeCommitterObject } from '../utils/normalizeCommitterObject.js'

/**
 * Add or update an object note
 *
 * @param {object} args
 * @param {types.FsClient} args.fs - a file system implementation
 * @param {types.SignCallback} [args.onSign] - a PGP signing implementation
 * @param {string} args.dir - The [working tree](dir-vs-gitdir.md) directory path
 * @param {string} [args.gitdir=join(dir,'.git')] - [required] The [git directory](dir-vs-gitdir.md) path
 * @param {string} [args.ref] - The notes ref to look under
 * @param {string} args.oid - The SHA-1 object id of the object to add the note to.
 * @param {string|Uint8Array} args.note - The note to add
 * @param {boolean} [args.force] - Over-write note if it already exists.
 * @param {types.PersonInfo} [args.author] - The details about the author.
 * @param {types.PersonInfo} [args.committer = author] - The details about the note committer, in the same format as the author parameter. If not specified, the author details are used.
 * @param {string} [args.signingKey] - Sign the note commit using this private PGP key.
 * @param {object} [args.cache] - a [cache](cache.md) object
 *
 * @returns {Promise<string>} Resolves successfully with the SHA-1 object id of the commit object for the added note.
 */

export async function addNote({
  fs: _fs,
  onSign,
  dir,
  gitdir = join(dir, '.git'),
  ref = 'refs/notes/commits',
  oid,
  note,
  force,
  author: _author,
  committer: _committer,
  signingKey,
  cache = {},
}) {
  try {
    assertParameter('fs', _fs)
    assertParameter('gitdir', gitdir)
    assertParameter('oid', oid)
    assertParameter('note', note)
    if (signingKey) {
      assertParameter('onSign', onSign)
    }
    const fs = new FileSystem(_fs)

    const author = await normalizeAuthorObject({ fs, gitdir, author: _author })
    if (!author) throw new MissingNameError('author')

    const committer = await normalizeCommitterObject({
      fs,
      gitdir,
      author,
      committer: _committer,
    })
    if (!committer) throw new MissingNameError('committer')

    return await _addNote({
      fs: new FileSystem(fs),
      cache,
      onSign,
      gitdir,
      ref,
      oid,
      note,
      force,
      author,
      committer,
      signingKey,
    })
  } catch (err) {
    err.caller = 'git.addNote'
    throw err
  }
}
