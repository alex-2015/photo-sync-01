<?php
	include 'imageHandleFactory.php';
	
	$img1 = CreateImage('hello');
	$img2 = CreateImage('world');
	$img3 = merge($img1,$img2);
	
	$img4 = CreateImage('Udara');
	$img5 = merge($img3,$img4);
	
	header('Content-Type: image/png');
	imagepng($img5);
	imagedestroy($img5);


//CreateImage('hi');
//$img2 = CreateImage('world');

//merge($img1,$img2);


function merge($image_x, $image_y) {

 $width_x = imagesx($image_x);
 $width_y = imagesx($image_y);
 $height_x = imagesy($image_x);
 $height_y = imagesy($image_y);
 // Create new image with desired dimensions

 $image = imagecreatetruecolor($width_x+$width_y,$height_x);

 imagecopy($image, $image_x, 0, 0, 0, 0, $width_x, $height_x);
 imagecopy($image, $image_y, $width_x, $height_x-$height_y, 0, 0, $width_y, $height_y);

 // Clean up

 //imagedestroy($image);
 imagedestroy($image_x);
 imagedestroy($image_y);
  //imagejpeg($image, 'im.png');
 // imagedestroy($image_y);
 return $image;
}
