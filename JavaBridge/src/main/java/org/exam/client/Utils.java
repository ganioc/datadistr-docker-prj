package org.exam.client;

import java.util.Locale;

public class Utils {

    private static final String hexString = "0123456789abcdef";

    public static byte toByte(char c){
        byte b = (byte) hexString.indexOf(c);
        return b;
    }

    public enum ErrCode {
        OK,
        FAIL,
        EXISTS,
        OPERATION_FAIL
    }

    public static void sleep(int mSeconds) {
        try {
            Thread.sleep(mSeconds * 1000);
        } catch (Exception e) {

        }
    }
    public static byte[] hexStringToByte(String hex)
    {
        System.out.printf("string length: %d\n", hex.length());
        int len = (hex.length() / 2);
        byte[] result = new byte[len];
        char[] aChar = hex.toCharArray();


        for (int i = 0; i < len; i++)
        {
            int pos = i * 2;
            result[i] = (byte) (toByte(aChar[pos]) << 4 | toByte(aChar[pos + 1]));
        }
        return result;
    }
    public static String bytesToHexString(byte[] bArray) {
        int length = bArray.length;
        StringBuffer sb = new StringBuffer(length);
        String sTemp;
        for (int i = 0; i < length; i++) {
            sTemp = Integer.toHexString(0xFF & bArray[i]);
            if (sTemp.length() < 2)
                sb.append(0);
            sb.append(sTemp.toLowerCase(Locale.ENGLISH));
        }
        return sb.toString();
    }
}
