<?php

require_once('Config.php');
require_once('Logger.php');

class DbConnector
{

    function select($query)
    {
        $logger = new Logger();
        $connection = $this->connect();
        $result = mysqli_query($connection, $query);
        if (!$result) {
            $error = mysqli_error($connection);
            mysqli_close($connection);
            $logger->error(constant("E0002") . $error);
            return "E0002";
        } else {
            mysqli_close($connection);
            return $result;
        }
    }

    private function connect()
    {
        $config = new Config();
        $logger = new Logger();

        $dbHost = $config->getDbHost();
        $dbUser = $config->getDbUser();
        $dbPassword = $config->getDbPassword();
        $dbName = $config->getDbName();

        $con = mysqli_connect($dbHost, $dbUser, $dbPassword, $dbName);
        if (mysqli_connect_errno()) {
            $logger->error(constant("E0001") . mysqli_connect_error());
            return "E0001";
        } else {
            return $con;
        }
    }

}
