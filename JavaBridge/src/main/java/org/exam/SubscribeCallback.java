package org.exam;

import org.exam.client.Utils;
import org.fisco.bcos.sdk.abi.ABICodec;
import org.fisco.bcos.sdk.abi.ABICodecException;
import org.fisco.bcos.sdk.client.Client;
import org.fisco.bcos.sdk.eventsub.EventCallback;
import org.fisco.bcos.sdk.model.EventLog;

import java.util.List;
import java.util.concurrent.Semaphore;

public class SubscribeCallback implements EventCallback {
    public transient Semaphore semaphore = new Semaphore(1, true);
    private Client mClient;
    private String mAbi;
    private String mEvent;

    public SubscribeCallback(Client client, String abi, String event){
        mClient = client;
        mAbi = abi;
        mEvent = event;

        try{
            semaphore.acquire(1);

        } catch (InterruptedException e){
            System.out.println("Interrupt error");
            Thread.currentThread().interrupt();
        }
    }
    @Override
    public void onReceiveLog(int status, List<EventLog> logs){
        if(status != 0){
            System.out.println("Wrong Log status " + status);
            return;
        }
        String str = "status in onReceiveLog : " + status;
        System.out.println(str);
        semaphore.release();

        // decode the event
        if(logs != null) {
            for (EventLog log : logs) {
                System.out.printf("BlockNumber: %s\n", log.getBlockNumber());
                System.out.printf("TxIndex: %s\n", log.getTransactionIndex());
                System.out.println(log.getData());

                ABICodec abiCodec = new ABICodec(mClient.getCryptoSuite());
                try {
                    List<Object> list = abiCodec.decodeEvent(mAbi, mEvent, log);
                    System.out.printf("decode event log content: %s\n", list);
                    System.out.printf("user:%s\n", list.get(0).toString());
                    System.out.printf("addrHash: %s\n", list.get(1).toString());
                    // byte[] hashId = (byte[])list.get(2);
                    Object obj = list.get(2);
                    System.out.printf("get(2) len: %s\n", obj.toString().length());
                    System.out.printf("get(2) %s\n", obj.toString());
                    byte[] objBytes = obj.toString().getBytes();
//                    for(int i=0; i< objBytes.length; i++){
//                            System.out.printf("%x\n", objBytes[i]);
//                    }
                    System.out.printf("addr %s\n", obj.getClass().toString());
                    System.out.printf("name %s\n", obj.getClass().getName());

                } catch (ABICodecException e) {
                    System.out.println("decode event log error");
                    System.out.println(e);
                    System.out.println(e.getMessage());
                }
            }
        }
    }
}
