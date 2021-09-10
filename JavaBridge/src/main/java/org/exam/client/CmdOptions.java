package org.exam.client;

import com.google.devtools.common.options.Option;
import com.google.devtools.common.options.OptionsBase;

public class CmdOptions extends OptionsBase {

    @Option(
            name="help",
            abbrev = 'h',
            help = "Prints usage info",
            defaultValue = "true"
    )
    public boolean help;
    @Option(
            name="cmd",
            abbrev = 'c',
            help = "Command",
            defaultValue = ""
    )
    public String cmd;
    @Option(
            name="operation",
            abbrev = 'p',
            help = "Operation",
            defaultValue = ""
    )
    public String operation;
}
