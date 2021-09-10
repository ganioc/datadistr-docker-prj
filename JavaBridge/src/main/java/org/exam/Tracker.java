package org.exam;

import com.thetransactioncompany.jsonrpc2.JSONRPC2Request;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Response;
import com.thetransactioncompany.jsonrpc2.client.JSONRPC2Session;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class Tracker {
    private static String HOST;
    private static int PORT;
    private static String URL;
    private static String PRIVATE_KEY; // admin account
    private static String CONTRACT_ADDRESS;
    private static JsonRpc jsonRpc;
    private static int DEFAULT_START_BLOCK;

    public static void main(String[] args) {

        String envHost=System.getenv("HOST");
        System.out.printf("HOST: %s\n", envHost);
        HOST = (envHost == null)? "192.168.0.199":envHost;

        String envPort = System.getenv("PORT") ;
        System.out.printf("PORT: %s\n", envPort);
        PORT = (envPort == null)?3000:Integer.valueOf(envPort);

        String envUrl = System.getenv("URL");
        System.out.printf("URL: %s\n", envUrl);
        URL = (envUrl == null)?"/tasks/rpc/v2/":envUrl;

        String envPrivateKey = System.getenv("PRIVATE_KEY");
        System.out.printf("PRIVATE_KEY: %s\n", envPrivateKey);
        PRIVATE_KEY = (envPrivateKey == null)?
                "27ec1168988b7a7a6df13574ea2fc444252c0668e01934f4a4488e62e3374384"
                :envPrivateKey;

        String envContractAddress= System.getenv("CONTRACT_ADDRESS");
        System.out.printf("CONTRACT_ADDRESS: %s\n", envContractAddress);
        CONTRACT_ADDRESS = (envContractAddress == null)?
                "0xeeaf757f5c7d151992a61c95aba6efcf9a6f9bc7"
                :envContractAddress;

        String envDefaultStartBlock = System.getenv("START_BLOCK");
        System.out.printf("DEFAULT_START_BLOCK: %s\n", envDefaultStartBlock);
        DEFAULT_START_BLOCK = (envDefaultStartBlock == null)?123 :Integer.valueOf(envDefaultStartBlock);

        System.out.println("=============================================================");
        System.out.printf("Host: %s\nPort: %s\nUrl: %s\nPriv: %s\nContract: %s\nStart Block: %s\n",
                HOST, String.valueOf(PORT),
                URL,
                PRIVATE_KEY,
                CONTRACT_ADDRESS,
                String.valueOf(DEFAULT_START_BLOCK));
        System.out.println("==============================================================");
        // contract address


        try {
            jsonRpc = new JsonRpc(HOST, PORT, URL);
        } catch (MalformedURLException e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }

        MonitorTask task = new MonitorTask(jsonRpc);
//        task.start();


    }
}
