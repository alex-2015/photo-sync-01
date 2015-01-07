<?php
 
function createImage($word,$font='fonts/impact.ttf',$fontSize=20,$fontColor=array(0,0,0),$backgroundColor=array(255,255,255)){  
	$bbox = imagettfbbox($fontSize, 45, $font, $word);
	$width = ($bbox[2] - $bbox[0])*1.3;
	$height = ($bbox[0] - $bbox[6])*1.3;
	// Create the image
	$im = imagecreatetruecolor($width, $height);
	// Create some colors
	$bgColor = imagecolorallocate($im, $backgroundColor[0], $backgroundColor[1], $backgroundColor[2]);
	$fgColor = imagecolorallocate($im, $fontColor[0], $fontColor[1], $fontColor[2]);
	imagefill($im, 0, 0, $bgColor);
	// Add the text
	imagettftext($im, $fontSize, 0, 0, $height - 2, $fgColor, $font, $word);
  
	// Using imagepng() results in clearer text compared with imagejpeg()
	return $im;
}
	 
function mergeImagesHorizontally($image_x, $image_y) {
  
   	$width_x = imagesx($image_x);
   	$width_y = imagesx($image_y);
   	
	$height_x = imagesy($image_x);
   	$height_y = imagesy($image_y);
   	// Create new image with desired dimensions
  
   	$image = imagecreatetruecolor($width_x+$width_y,max($height_x,$height_y));
   	$transparent = imagecolorallocate($image, 253, 249, 121);		//just a random uncommon color
	imagecolortransparent($image, $transparent);
    imagefill($image, 0, 0, $transparent);
	
   
   	imagecopy($image, $image_x, 0, 0, 0, 0, $width_x, $height_x);
	imagecopy($image, $image_y, $width_x, $height_x-$height_y, 0, 0, $width_y, $height_y);
  
     // Clean up  
	//imagedestroy($image);
	imagedestroy($image_x);
	imagedestroy($image_y);
	//imagejpeg($image, 'im.jpg');
	return $image;
}

function mergeImagesVertically($image_x, $image_y) {
	$width_x = imagesx($image_x);
   	$width_y = imagesx($image_y);
   	
	$height_x = imagesy($image_x);
   	$height_y = imagesy($image_y);
	
	$image = imagecreatetruecolor(max($width_x,$width_y),$height_x + $height_y);
	$white = imagecolorallocate($image, 255, 255, 255);
    imagefill($image, 0, 0, $white);
	
	imagecopy($image, $image_x, 0, 0, 0, 0, $width_x, $height_x);
	imagecopy($image, $image_y, 0, $height_x, 0, 0, $width_y, $height_y);
	
	// Clean up  
	//imagedestroy($image);
	imagedestroy($image_x);
	imagedestroy($image_y);
	//imagejpeg($image, 'im.jpg');
	return $image;
}
?>