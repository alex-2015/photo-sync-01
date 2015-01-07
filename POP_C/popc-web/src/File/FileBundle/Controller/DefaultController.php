<?php

namespace File\FileBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Document;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('FileFileBundle:Default:index.html.twig', array('name' => $name));
    }
    
    public function uploadAction(Request $request)
    {
        if($request->getMethod() == 'POST'){
            $image = $request->files->get('img');
            $uploadedURL = '';
            if(($image instanceof UploadedFile) && ($image->getError() == 0)){
                
                if(!($image->getSize() < 200000000)){
                    $orinalName = $file->getClientOriginalName();
                    $name_array = explode('.',$orinalName);
                    $file_type = $name_array[sizeof($name_array) - 1];
                    $valid_filetypes = array('jpg','jpeg','bmp','png');
                    if(in_array($valid_filetypes, $file_type)){
                        $document = new Document();
                        $document->setFile($image);
                        $document->setSubDirectory('uploads');
                        $document->processFile();
                        $uploadedURL=$uploadedURL = $document->getUploadDirectory() . DIRECTORY_SEPARATOR . $document->getSubDirectory() . DIRECTORY_SEPARATOR . $image->getBasename();
                    }else{
                        $status = 'failed';
                        $message = 'Invalid File Type';
                    }
                }else{
                    $status = 'failed';
                    $message = 'Size exceeds limit. Uploaded file sie is';
                }
                return $this->render('LoginLoginBundle:Default:settings.html.twig',array('status'=>$status,'message'=>$message,'uploadedURL'=>$uploadedURL));
            }else{
                $status = 'failed';
                $message = 'File Error';
                return $this->render('LoginLoginBundle:Default:settings.html.twig',array('status'=>$status,'message'=>$message,'uploadedURL'=>$uploadedURL));
            }
        }
    }
}
