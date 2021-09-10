package org.exam.client;

public class PosOutRecord {
    public String berthId;
    public long outTime;
    public int shouldPayMoney;
    public String id;
    public String outPicHash;

    public  String toString(){
        return this.berthId + " "
                + this.outTime + " "
                + String.valueOf(this.shouldPayMoney) + " "
                + this.id + " "
                + this.outPicHash;
    }
}
