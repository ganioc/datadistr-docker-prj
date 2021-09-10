package org.exam.client;

public class PosInRecord {
    public String berthId;
    public long inTime;
    public int inTimeType;
    public int inType;
    public String plateId;
    public int prepayLen;
    public int prepayMoney;
    public int vehicleType;
    public String inPicHash;

    public String toString(){
        return this.berthId + " "
                + this.inTime + " "
                + String.valueOf(this.inTimeType) + " "
                + String.valueOf(this.inType) + " "
                + this.plateId + " "
                + String.valueOf(this.prepayLen) + " "
                + String.valueOf(this.prepayMoney) + " "
                + String.valueOf(this.vehicleType) + " "
                + this.inPicHash;
    }
}