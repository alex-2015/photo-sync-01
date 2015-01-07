<?php

$msgString=$_GET['msg'];

$split_str=explode(" ",$msgString);

$size=sizeof($split_str);

$img;
$imgTemp;
$final_result;

$imgTemp1=createImage($split_str[0]);
$imgTemp2=createImage($split_str[1],'monofont.ttf');

$img=merge($img,$imgeTemp,$img);

/*for($i=0;$i<$size;$i++)
{
	//echo $split_str[$i].$i;
	if(($i%2)==0){
		$imgTemp=createImage($split_str[$i]);
	}
	else
	{
		$imgTemp=createImage($split_str[$i],'monofont.ttf');
	}
	if($i==0){
		$img=$final_result;
	}else{
		$img=merge($img,$imgeTemp,$img);
	}
	

}*/
header('Content-Type: image/png');
imagepng($img);
imagedestroy($img);

//header('Content-Type: image/png');
//imagepng($imageTemp);
//imagedestroy($imageTemp);


function merge($image_x, $image_y,$final_result) {

 // Get dimensions for specified images

 //list($width_x, $height_x) = getimagesize($filename_x);
 //list($width_y, $height_y) = getimagesize($filename_y);
 $width_x=imagesx(image_x);
 $height_x=imagesy(image_x);
 $width_y=imagesx(image_y);
 $height_y=imagesy(image_y);
 // Create new image with desired dimensions

 $image = imagecreatetruecolor($width_x + $width_y, $height_x);

 // Load images and then copy to destination image

 //$image_x = imagecreatefromjpeg($filename_x);
 //$image_y = imagecreatefromgif($filename_y);

 imagecopy($image, $image_x, 0, 0, 0, 0, $width_x, $height_x);
 imagecopy($image, $image_y, $width_x, 0, 0, 0, $width_y, $height_y);

 // Save the resulting image to disk (as JPEG)
 $final_result=$image;
 //imagejpeg($image, $image_result);

 // Clean up

 imagedestroy($image);
 imagedestroy($image_x);
 imagedestroy($image_y);
 //return $image;
}

 function CreateImage($word,$font='Impact.ttf'){
	
	// Set the content-type
	header('Content-Type: image/png');
	
	$bbox = imagettfbbox(10, 45, $font, $word);
	$width = $bbox[2]*3;
	$height = (-1)*$bbox[7]*3;
	// Create the image
	$im = imagecreatetruecolor($width, $height);

	// Create some colors
	$white = imagecolorallocate($im, 255, 255, 255);
	$grey = imagecolorallocate($im, 128, 128, 128);
	$black = imagecolorallocate($im, 0, 0, 0);
	imagefilledrectangle($im, 0, 0, 399, 29, $white);

	// Add the text
	imagettftext($im, 20, 0, 0, $height - 2, $black, $font, $word);

	// Using imagepng() results in clearer text compared with imagejpeg()
	// return imagepng($im);
	imagejpeg($im);
	imagedestroy($im);
   }

?>