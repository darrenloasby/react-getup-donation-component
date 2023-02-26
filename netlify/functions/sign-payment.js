import { createHash } from "node:crypto";

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
  const content = event.body.subject.split("|").unshift
  const { txn_type, primary_ref, amount, fp_timestamp } = event.body.subject;
  const content = [
    process.env.MERCHANT_NAME,
    process.env.MERCHANT_PW,
    txn_type,
    primary_ref,
    amount,
    fp_timestamp,
  ];
  let result = createHash("sha256").update(content.join("|")).digest("hex");
  return {
    statusCode: 200,
    body: JSON.stringify({ fingerprint: result }),
  };
};
