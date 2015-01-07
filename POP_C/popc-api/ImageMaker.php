<?php

require_once('imageHandleFactory.php');
require_once('Logger.php');
require_once('DictionaryRepo.php');

class ImageMaker
{

    function make(
        $correlationId,
        $receiver_comm_id,
        $receiver_dic_id,
        $sender_comm_id,
        $sender_dic_id,
        $message)
    {
        $dicRepo = new DictionaryRepo();
        $logger = new Logger();
        $logger->debug("Make request received [".$correlationId."]");

        $split_str = explode(" ", $message);
        $size = sizeof($split_str);

        for ($i = 0; $i < $size; $i++) {
            $currentWord = $split_str[$i];
            if ($receiver_comm_id == $sender_comm_id) {
                $findWord = $dicRepo->findWordByDicIdAndWord($receiver_dic_id, $currentWord);

                if ($findWord['font'] != "None") {
                    $imgTemp = createImage($findWord['word'] . " ", 'fonts/' . $findWord['font'], $findWord['font-size']);
                } else {
                    $imgTemp = createImage($findWord['word'] . " ", 'fonts/monofont.ttf', 15);
                }

                if ($i == 0) {
                    $img = $imgTemp;
                } else {
                    $img = mergeImagesHorizontally($img, $imgTemp);
                }
                $logger->debug("Made chat image [".$correlationId."]. Sender and receiver are in same community");
            } else {
                $logger->debug("Sender[$sender_comm_id] and Receiver[$receiver_comm_id] are in two different communities");
                $engWord = $dicRepo->findEnglishWordByDicIdAndWord($receiver_dic_id, $currentWord);
                $logger->debug("English word of [$currentWord] is $engWord");
                $findWordInSenderDic = $dicRepo->findWordByEnglishWordAndDicId($sender_dic_id, $engWord);

                if ($findWordInSenderDic['font'] != "None") {
                    $imgTemp = createImage($findWordInSenderDic['word'] . " ",
                        'fonts/' . $findWordInSenderDic['font'],
                        $findWordInSenderDic['font-size']);
                } else {
                    $imgTemp = createImage($findWordInSenderDic['word'] . " ", 'fonts/monofont.ttf', 15);
                }

                if ($i == 0) {
                    $img = $imgTemp;
                } else {
                    $img = mergeImagesHorizontally($img, $imgTemp);
                }
                $logger->debug("Made chat image [".$correlationId."]. Sender and receiver are in two different communities");

            }
        }

        ob_start();
        imagepng($img);
        $image_data = ob_get_contents();
        ob_end_clean();
        $image_data_base64 = base64_encode($image_data);
        $logger->debug("Returning base64 at [".round(microtime(true) * 1000)."][".$correlationId."]");
        return $image_data_base64;
    }

}
