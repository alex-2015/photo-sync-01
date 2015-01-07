<?php

require_once('statusCodes.php');

class ChatResponseJson
{

    private $statusCode = "E0005";
    private $statusDesc = E0005;
    private $result = "None";

    function resp($statusCode, $statusDesc, $result)
    {
        $this->statusCode = $statusCode;
        $this->statusDesc = $statusDesc;
        $this->result = $result;
        return $this->json();
    }

    private function json()
    {
        return array(
            "statusCode" => $this->statusCode,
            "statusDesc" => $this->statusDesc,
            "result" => $this->result
        );
    }
}
