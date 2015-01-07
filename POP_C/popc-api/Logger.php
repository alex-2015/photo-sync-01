<?php

require_once('Config.php');

class Logger
{
    function error($msg)
    {
        $this->log($msg, "ERROR");
    }

    function debug($msg)
    {
        $this->log($msg, "DEBUG");
    }

    private function log($rtn, $type)
    {
        $config = new Config();
        $f = fopen($config->getLogPath() . "\\pop-c-chat-api.log-" . date("Y-m-d"), "a");
        fwrite($f, "[" . $type . "][" . $_SERVER['SERVER_ADDR'] . "][" . date("H:i") . "][".round(microtime(true) * 1000)."][" . $_SERVER["SCRIPT_NAME"] . "] " . $rtn . "\n");
        fclose($f);
    }
}
