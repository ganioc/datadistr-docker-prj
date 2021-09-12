package org.exam;

import org.exam.client.PosClient;
import org.exam.contract.StoreKey;
import org.fisco.bcos.sdk.abi.tools.TopicTools;
import org.fisco.bcos.sdk.client.Client;
import org.fisco.bcos.sdk.crypto.CryptoSuite;
import org.fisco.bcos.sdk.eventsub.EventLogParams;
import org.fisco.bcos.sdk.eventsub.EventSubscribe;

import java.util.ArrayList;

public class ContractHook {
    static String privateKey="27ec1168988b7a7a6df13574ea2fc444252c0668e01934f4a4488e62e3374384";
    private int mStartBlock;
    private  String mContractAddress;

    public ContractHook(int startBlock, String contract){
        System.out.println("ContractHook constructor()");
        // PosClient posClient = new PosClient(1, privateKey);
        mStartBlock = startBlock;
        mContractAddress = contract;




    }
    public void start(){
        System.out.println("ContractHook start().");
        PosClient posClient = new PosClient(1, privateKey);

        EventLogParams eventLogParams = new EventLogParams();
        eventLogParams.setFromBlock(String.valueOf(mStartBlock));
        eventLogParams.setToBlock("latest");

        System.out.println("watching address");
        ArrayList<String> addresses = new ArrayList<>();
        addresses.add(mContractAddress);
        eventLogParams.setAddresses(addresses);

        System.out.println("watching topics");
        ArrayList<Object> topics = new ArrayList<>();
//        ArrayList<Object> topicIdx0 = new ArrayList<>();
        CryptoSuite invalidCryptoSuite =
                new CryptoSuite(posClient.getClient().getCryptoSuite().getCryptoTypeConfig());
        TopicTools topicTools = new TopicTools(invalidCryptoSuite);

        topics.add(topicTools.stringToTopic("EventSetRequest(address,address,bytes)"));
        eventLogParams.setTopics(topics);

        Client client = posClient.getClient();
        EventSubscribe eventSubscribe = EventSubscribe.build(
                client.getGroupManagerService(),
                client.getEventResource(),
                client.getGroupId()
        );

        SubscribeCallback subscribeCallback = new SubscribeCallback(
                client,
                StoreKey.ABI,
                "EventSetRequest"
        );

        String registerId = eventSubscribe.subscribeEvent(eventLogParams,subscribeCallback);

        System.out.println("registerId: " + registerId);

        try{
            subscribeCallback.semaphore.acquire(1);
            subscribeCallback.semaphore.release();
        }catch (InterruptedException e){
            System.out.println("System error:");
            System.out.println(e);
            Thread.currentThread().interrupt();
        }
    }
}
