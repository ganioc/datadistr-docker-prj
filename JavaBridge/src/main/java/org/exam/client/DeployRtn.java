package org.exam.client;
import org.exam.client.Utils.ErrCode;

public class DeployRtn {
    public ErrCode errCode;
    public   String contractAddress;

    public DeployRtn(ErrCode inCode, String address) {
        this.errCode = (inCode == null)?ErrCode.FAIL:inCode;
        this.contractAddress = (address == null)?"":address;
    }
    public  String toString(){
        return String.valueOf(this.errCode) + " "
                + this.contractAddress;
    }
}
