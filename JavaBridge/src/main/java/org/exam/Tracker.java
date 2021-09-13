package org.exam;

import com.thetransactioncompany.jsonrpc2.JSONRPC2Request;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Response;
import com.thetransactioncompany.jsonrpc2.client.JSONRPC2Session;
import org.exam.client.PosClient;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class Tracker {
    private static String HOST;
    private static int PORT;
    private static String URL;
    private static  int START_BLOCK;
    private  static  String CONTRACT;

    public static void main(String[] args) throws MalformedURLException {
        System.out.println("Hello");

        String envHost = System.getenv("HOST");
        HOST = (envHost == null) ? "192.168.0.199" : envHost;
        String envPort = System.getenv("PORT");
        PORT = (envPort == null) ? 3000 : Integer.valueOf(envPort);
        String envUrl = System.getenv("URL");
        URL = (envUrl == null) ? "/tasks/rpc/v2/" : envUrl;

        String envStartBlock = System.getenv("START_BLOCK");
        START_BLOCK = (envStartBlock == null)? 300:Integer.valueOf(envStartBlock);
        String envContract = System.getenv("CONTRACT");
        CONTRACT = (envContract == null)?"0xeeaf757f5c7d151992a61c95aba6efcf9a6f9bc7":envContract;


        System.out.printf("Host: %s\nPort: %s\nUrl: %s\n", HOST, String.valueOf(PORT), URL);

        JsonRpc jsonRpc = new JsonRpc(HOST, PORT, URL);

        MonitorTask task = new MonitorTask(jsonRpc);
        task.start();

        ContractHook contractHook = new ContractHook(START_BLOCK, CONTRACT);

        contractHook.start();
    }
}
