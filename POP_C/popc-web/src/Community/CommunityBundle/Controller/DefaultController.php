<?php

namespace Community\CommunityBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('CommunityCommunityBundle:Default:index.html.twig', array('name' => $name));
    }
    
    public function communityManagerAction(){
        $session = $this->getRequest()->getSession();
        return $this->render('CommunityCommunityBundle:Default:index.html.twig',array('name' => $session->get('name')));
    }
}
