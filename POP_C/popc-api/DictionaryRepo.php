<?php

require_once('DbConnector.php');
require_once('Logger.php');
class DictionaryRepo
{

    function findWordByDicIdAndWord($dicId, $word)
    {
        $logger = new Logger();
        $database = new DbConnector();
        $query = "SELECT dictionary_entry.dic_en_key, dictionary.dic_font_name, dictionary.dic_font_size
                    FROM dictionary_entry
                    INNER JOIN dictionary
                    WHERE dictionary_entry.dic_en_word='{$word}'
                    AND dictionary_entry.dic_id = dictionary.dic_id
                    AND dictionary_entry.dic_id ='{$dicId}'";

        $wordResult = $database->select($query);
        $resultCount = mysqli_num_rows($wordResult);

        if ($resultCount > 0) {
            while ($entry = mysqli_fetch_assoc($wordResult)) {
                $logger->debug("Finding key for [{$word}] in dictionary [{$dicId}]");
                return array("font" => $entry['dic_font_name'], "font-size" => $entry['dic_font_size'], "word" => $entry['dic_en_key']);
            }
        }
        return array("font" => "None", "word" => $word);
    }

    function findEnglishWordByDicIdAndWord($dicId, $word)
    {
        $logger = new Logger();
        $database = new DbConnector();
        $query = "SELECT  dictionary_entry.dic_en_english
                    FROM dictionary_entry
                    INNER JOIN dictionary
                    WHERE dictionary_entry.dic_en_word='{$word}'
                    AND dictionary_entry.dic_id = dictionary.dic_id
                    AND dictionary_entry.dic_id ='{$dicId}'";

        $wordResult = $database->select($query);
        $resultCount = mysqli_num_rows($wordResult);

        if ($resultCount > 0) {
            while ($entry = mysqli_fetch_assoc($wordResult)) {
                $logger->debug("Finding english word of [$word]");
                return $entry['dic_en_english'];
            }
        }
        $logger->debug("No english words related to [$word]");
        return $word;
    }

    function findWordByEnglishWordAndDicId($dicId, $enWord){

        $logger = new Logger();
        $database = new DbConnector();
        $query = "SELECT dictionary_entry.dic_en_key, dictionary.dic_font_name, dictionary.dic_font_size
                    FROM dictionary_entry
                    INNER JOIN dictionary
                    WHERE dictionary_entry.dic_en_english='{$enWord}'
                    AND dictionary_entry.dic_id = dictionary.dic_id
                    AND dictionary_entry.dic_id ='{$dicId}'";

        $wordResult = $database->select($query);
        $resultCount = mysqli_num_rows($wordResult);

        if ($resultCount > 0) {
            while ($entry = mysqli_fetch_assoc($wordResult)) {
                $logger->debug("Finding key for [{$enWord}] in dictionary [{$dicId}]");
                return array("font" => $entry['dic_font_name'], "font-size" => $entry['dic_font_size'], "word" => $entry['dic_en_key']);
            }
        }
        return array("font" => "None", "word" => $enWord);
    }

    function getCommunityList(){

        $logger = new Logger();
        $database = new DbConnector();
        $query = "SELECT comm_id, comm_name, comm_code FROM community";
        $communityResult = $database->select($query);
        $communities = array();

        while($entry = mysqli_fetch_assoc($communityResult)){
            array_push($communities, array("id" => $entry['comm_id'], "name" => $entry['comm_name'], "code" => $entry['comm_code']));
        }

        $logger->debug("Sending community list ".json_encode($communities));
        return $communities;
    }

    function getDictionariesByCommunity($commId){

        $logger = new Logger();
        $database = new DbConnector();
        $query = "SELECT dic_id, dic_name FROM dictionary WHERE comm_id=$commId";
        $dictionaryResult = $database->select($query);
        $dictionaries = array();

        while($entry = mysqli_fetch_assoc($dictionaryResult)){
            array_push($dictionaries, array("id" => $entry['dic_id'], "name" => $entry['dic_name']));
        }

        $logger->debug("Sending dictionary list ".json_encode($dictionaries));
        return $dictionaries;
    }
}
