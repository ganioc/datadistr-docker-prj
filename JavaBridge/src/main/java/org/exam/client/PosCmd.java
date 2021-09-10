package org.exam.client;

import com.google.devtools.common.options.OptionsParser;

import java.util.Collections;

public class PosCmd {
    static String privateKey = "cdc7cc95755f19aa8168e2b0c3dd89d556be87b60608835549c0aee38d156640";
    static String contractAddress = "0xa1fe97cb847fa8cd60d6a38133c710c7ed5eefdf";

    private void insertPIn(){
        System.out.println("insertPIn()");
    }

    private static void printUsage(OptionsParser parser) {
        System.out.println("Usage: java -jar server.jar OPTIONS");
        System.out.println(parser.describeOptions(Collections.<String, String>emptyMap(),
                OptionsParser.HelpVerbosity.LONG));
    }

    public static void main(String[] args){
        OptionsParser parser = OptionsParser.newOptionsParser(CmdOptions.class);
        parser.parseAndExitUponError(args);
        CmdOptions options = parser.getOptions(CmdOptions.class);

        if(options.cmd.isEmpty() || options.operation.isEmpty()){
            printUsage(parser);
            return;
        }

        System.out.println("Hello PosCmd");
        System.out.println(args.length);
        System.out.println("args ->");
        System.out.printf("cmd: %s\n", options.cmd);
        System.out.printf("operation: %s\n", options.operation);

        if(options.cmd.equals("storekey") && options.operation.equals("setencrypt")){
            // CmdStoreKeyInsertEncrypt.SetEncrypt();
            System.out.printf("storekey setencrypt unavailable");
        }else if(options.cmd.equals("storekey")   && options.operation.equals("getencrypt")){
            // CmdStoreKeyInsertEncrypt.GetEncrypt("0x315411ff94c1663ed0bd3ccd6e902648108bd3cd");
            System.out.printf("storekey getencrypt unavailable");
        }else{
            System.out.println("Unknown.");
        }

//
//        PosClient posClient = new PosClient(1, privateKey);
//
//        int rtn = posClient.getIndex(contractAddress);
//
//        System.out.println("index is: " + rtn);
//
//        posClient.stop();
    }
}
