package org.exam.client;

import io.ipfs.api.IPFS;
import io.ipfs.api.MerkleNode;
import io.ipfs.api.NamedStreamable;
import io.ipfs.multihash.Multihash;

import java.io.File;

public class IPFSClient {

    private String url;
    private IPFS ipfs;

    public IPFSClient(String ip, String port) {
        this.ipfs = new IPFS("/ip4/" + ip + "/tcp/" + port);
    }

    public byte[] getByHash(String hash) {
        Multihash filePointer = Multihash.fromBase58(hash);
        try {
            byte[] fileContents = this.ipfs.cat(filePointer);
            return fileContents;
        } catch (Exception e) {
            byte[] out = {};
            return out;
        }
    }
    private String push(NamedStreamable.FileWrapper file){
        try {
            MerkleNode addResult = ipfs.add(file).get(0);
            Multihash pointer = addResult.hash;

            return pointer.toString();
        } catch (Exception e) {
            return "";
        }
    }
    private String push(NamedStreamable.ByteArrayWrapper file){
        try {
            MerkleNode addResult = ipfs.add(file).get(0);
            Multihash pointer = addResult.hash;

            return pointer.toString();
        } catch (Exception e) {
            return "";
        }
    }

    public String pushFile(String filename) {
        NamedStreamable.FileWrapper file = new NamedStreamable.FileWrapper(new File(filename));
        return this.push(file);
    }
    // Push already exist file will get the same HASH code
    public String pushFile(String filename, byte [] bytes) {
        NamedStreamable.ByteArrayWrapper file = new NamedStreamable.ByteArrayWrapper(filename, bytes);
        return this.push(file);
    }

}
