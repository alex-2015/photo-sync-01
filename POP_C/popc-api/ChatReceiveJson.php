<?php

class ChatReceiveJson
{

    private $apiKey;
    private $correlationId;
    private $message;
    private $sender_communityId;
    private $sender_dictionaryId;
    private $receiver_communityId;
    private $receiver_dictionaryId;
    private $time;

    /**
     * @param $apiKey
     * @param $correlationId
     * @param $message
     * @param $sender_communityId
     * @param $sender_dictionaryId
     * @param $receiver_communityId
     * @param $receiver_dictionaryId
     * @param $time
     */
    function req($apiKey,
                 $correlationId,
                 $message,
                 $sender_communityId,
                 $sender_dictionaryId,
                 $receiver_communityId,
                 $receiver_dictionaryId,
                 $time)
    {
        $this->apiKey = $apiKey;
        $this->correlationId = $correlationId;
        $this->message = $message;
        $this->sender_communityId = $sender_communityId;
        $this->sender_dictionaryId = $sender_dictionaryId;
        $this->receiver_communityId = $receiver_communityId;
        $this->receiver_dictionaryId = $receiver_dictionaryId;
        $this->time = $time;
    }

    /**
     * @return mixed
     */
    function getApiKey()
    {
        return $this->apiKey;
    }


    /**
     * @return mixed
     */
    function getCorrelationId()
    {
        return $this->correlationId;
    }

    /**
     * @return mixed
     */
    function getMessage()
    {
        return $this->message;
    }

    /**
     * @return mixed
     */
    function getReceiverCommunityId()
    {
        return $this->receiver_communityId;
    }

    /**
     * @return mixed
     */
    function getReceiverDictionaryId()
    {
        return $this->receiver_dictionaryId;
    }

    /**
     * @return mixed
     */
    function getSenderCommunityId()
    {
        return $this->sender_communityId;
    }

    /**
     * @return mixed
     */
    function getSenderDictionaryId()
    {
        return $this->sender_dictionaryId;
    }

    /**
     * @return mixed
     */
    function getTime()
    {
        return $this->time;
    }
}
