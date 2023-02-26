
import { createHash } from 'node:crypto'

exports.handler = async function (event, context) {

/**
 * Returns a SHA256 hash using SHA-3 for the given `content`.
 *
 * @see https://en.wikipedia.org/wiki/SHA-3
 *
 * @param {String} content
 *
 * @returns {String}
 */
 const event.body = { merchant_id, txn_type, primary_ref, amount, fp_timestamp

 createHash('sha3-256').update(content).digest('hex')
 
};

