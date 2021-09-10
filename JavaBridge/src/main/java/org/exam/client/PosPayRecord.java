package org.exam.client;

public class PosPayRecord {
    public String berthId;
    public int amount;
    public int mode;
    public int parkingActualPayMoney;
    public String parkingRecordId;
    public int prepayLen;
    public int shouldPayAmount;
    public int zeroOwe;
    public String toString(){
        return  this.berthId + " "
                + String.valueOf(this.amount) + " "
                + String.valueOf(this.mode) + " "
                + String.valueOf(this.parkingActualPayMoney) + " "
                + this.parkingRecordId + " "
                + String.valueOf(this.prepayLen) + " "
                + String.valueOf(this.shouldPayAmount) + " "
                + String.valueOf(this.zeroOwe);
    }
}
