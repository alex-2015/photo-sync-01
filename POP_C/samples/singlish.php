<?php
	require '../api/imageHandleFactory.php';
	
	$msgString=$_GET['msg'];
	$split_str=explode(" ",$msgString);
	$size=sizeof($split_str);
	
	$singlishWords = array(	'machan' 	=>	'mcN',
							'ado' 		=>	'a@d~',
							'el'		=>	'ela',
							'palayan'	=>	'plyN',
							'niyamai'	=>	'Îymû');
	
	
	for($i=0;$i<$size;$i++)
	{
		if(array_key_exists($split_str[$i],$singlishWords)){
			$imgTemp=createImage($singlishWords[$split_str[$i]].' ','../api/fonts/kandy.ttf',10);
		}else{
			$imgTemp=createImage($split_str[$i].' ','../api/fonts/monofont.ttf',12,array(255,0,0));
		}
		//start concatening
		if($i==0){
			$img=$imgTemp;
		}else{
			$img=mergeImagesHorizontally($img,$imgTemp);
		}
	}
	
	header('Content-Type: image/png');
	imagepng($img);
	imagedestroy($img);
?>