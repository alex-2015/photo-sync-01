<?php

require_once('Config.php');
require_once('Logger.php');

class ApiKeyManager
{

    /**
     * @param $apiKey
     * @return string
     */
    function validateKey($apiKey)
    {
        $config = new Config();
        $logger = new Logger();

        if (in_array($apiKey, $config->getApiKeys())) {
            return "S1000";
        } else {
            $logger->debug("Invalid API Key [" . $apiKey . "]");
            return "E0007";
        }
    }
}
