// @ts-check
import { GitPktLine } from '../models/GitPktLine.js'

/**
 * @typedef {Object} PackTriplet
 * @property {string} oldoid
 * @property {string} oid
 * @property {string} fullRef
 */
 
/**  
 * @param {Object} args
 * @param {string[]} args.capabilities
 * @param {PackTriplet[]} args.triplets
 * @returns 
 */
export async function writeReceivePackRequest({
  capabilities = [],
  triplets = [],
}) {
  const packstream = []
  let capsFirstLine = `\x00 ${capabilities.join(' ')}`
  for (const trip of triplets) {
    packstream.push(
      GitPktLine.encode(
        `${trip.oldoid} ${trip.oid} ${trip.fullRef}${capsFirstLine}\n`
      )
    )
    capsFirstLine = ''
  }
  packstream.push(GitPktLine.flush())
  return packstream
}
