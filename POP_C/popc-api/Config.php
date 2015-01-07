<?php

class Config {

    private $databaseHost = "127.0.0.1";
    private $databaseUser = "user";
    private $databasePassword = "password";
    private $databaseName = "popc_transformer";
    private $hostAddress = "";
     private $logPath = "C:\\popc_logs";
    private $allowedApiKeys = array("12yui3244", "12wep9344");

    function getDbHost(){
        return $this->databaseHost;
    }

    function getDbUser(){
        return $this->databaseUser;
    }

    function getDbPassword(){
        return $this->databasePassword;
    }

    function getDbName(){
        return $this->databaseName;
    }

    function getLogPath(){
        return $this->logPath;
    }

    function getApiKeys(){
        return $this->allowedApiKeys;
    }
}
