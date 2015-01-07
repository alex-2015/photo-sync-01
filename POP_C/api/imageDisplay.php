<?php
	require 'imageHandleFactory.php';
	
	$msgString=$_GET['msg'];
	$split_str=explode(" ",$msgString);
	$size=sizeof($split_str);
	
	for($i=0;$i<$size;$i++)
	{
		//echo $split_str[$i].$i;
		if(($i%2)==0){
			$imgTemp=createImage($split_str[$i],'fonts/kandy.ttf',10);
		}
		else
		{
			$imgTemp=createImage($split_str[$i],'fonts/monofont.ttf',12,array(255,0,0));
		}
		if($i==0){
			$img=$imgTemp;
		}else{
			$img=mergeImagesHorizontally($img,$imgTemp);
		}
	}


	
	header('Content-Type: image/png');
	imagepng($img);
	imagedestroy($img);


//CreateImage('hi');
//$img2 = CreateImage('world');

//merge($img1,$img2);






?>