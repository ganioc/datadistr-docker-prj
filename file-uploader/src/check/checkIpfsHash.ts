import { ipfsHash } from '../app.utils';

console.log(ipfsHash(Buffer.from('hello world')));

console.log(ipfsHash(Buffer.from('version 1 of my text')));
