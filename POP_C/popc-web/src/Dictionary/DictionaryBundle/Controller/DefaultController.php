<?php

namespace Dictionary\DictionaryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Login\LoginBundle\Entity\User;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('DictionaryDictionaryBundle:Default:index.html.twig', array('name' => $name));
    }
    
    public function dictionaryManagerAction(){
        $session = $this->getRequest()->getSession();
        return $this->render('DictionaryDictionaryBundle:Default:addDictionary.html.twig',array('name' => $session->get('name')));
    }
}
