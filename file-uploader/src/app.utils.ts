import * as crypto from 'crypto';
import * as bs58 from 'bs58';

/**
 * For ipfs file digest hash calculation
 *
 * @param buf
 * @returns
 */

export function ipfsHash(buf: Buffer): string {
    const hashFunction = Buffer.from('12', 'hex');
    const digest = crypto.createHash('sha256').update(buf).digest();
    console.log(digest.toString('hex'));

    const digestSize = Buffer.from(digest.byteLength.toString(16), 'hex');
    console.log(digestSize.toString('hex'));

    const combined = Buffer.concat([hashFunction, digestSize, digest])
    console.log(combined.toString('hex'));

    const multihash = bs58.encode(combined);
    console.log(multihash.toString());

    return multihash.toString();
}
