<?php

require_once('Config.php');
require_once('Logger.php');
require_once('index.php');
require_once('statusCodes.php');
require_once('ChatReceiveJson.php');
require_once('ChatResponseJson.php');
require_once('ApiKeyManager.php');
require_once('Response.php');
require_once('ImageMaker.php');
require_once('DictionaryRepo.php');

$config = new Config();
$api = new ApiKeyManager();
$chat = new ChatReceiveJson();
$chatResp = new ChatResponseJson();
$image = new ImageMaker();
$response = new Response();
$dicRepo = new DictionaryRepo();
$logger = new Logger();

$action = $_GET['do'];

if ($action != null) {

    $apiKey = $_POST['api_key'];
    $validate = $api->validateKey($apiKey);

    if ($validate == "S1000") {
        if ($action == 'chat') {
            $correlationId = $_POST['correlation_id'];
            $message = $_POST['message'];
            $sender_communityId = $_POST['receiver_communityId'];
            $sender_dictionaryId =  $_POST['receiver_dictionaryId'];
            $receiver_communityId = $_POST['sender_communityId'] ;
            $receiver_dictionaryId = $_POST['sender_dictionaryId'];
            $time = $_POST['time'];
            $logger->debug("Received chat request [".$correlationId."]");

            $chat->req($apiKey,
                $correlationId,
                $message,
                $sender_communityId,
                $sender_dictionaryId,
                $receiver_communityId,
                $receiver_dictionaryId,
                $time);
            $img = $image->make($chat->getCorrelationId(),
                $chat->getReceiverCommunityId(),
                $chat->getReceiverDictionaryId(),
                $chat->getSenderCommunityId(),
                $chat->getSenderDictionaryId(),
                $chat->getMessage());
            $logger->debug("Sending response to chat app [".$correlationId."]");
            $response->send($chatResp->resp("S1000", S1000, $img));
        } else if ($action == 'communities') {
            $communityList = $dicRepo->getCommunityList();
            $response->send($chatResp->resp("S1000", S1000, $communityList));
        } else if($action == 'dictionaries') {
            $communityId = $_POST['community'];
            $dictionaryList = $dicRepo->getDictionariesByCommunity($communityId);
            $response->send($chatResp->resp("S1000", S1000, $dictionaryList));
        } else {
            $response->send($chatResp->resp("E0005", E0005, "None"));
        }
    } else {
        $response->send($chatResp->resp("E0007", E0007, "None"));
    }
} else {
    $response->send($chatResp->resp("E0005", E0005, "None"));
}