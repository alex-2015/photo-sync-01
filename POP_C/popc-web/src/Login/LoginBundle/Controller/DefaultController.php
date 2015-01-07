<?php

namespace Login\LoginBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Login\LoginBundle\Entity\User;
use Login\LoginBundle\Modals\Login;

class DefaultController extends Controller
{
    public function indexAction(Request $request)
    {
        $session = $this->getRequest()->getSession();
        if($request->getMethod() == 'POST'){
            $session->clear();
            $username = $request->get('username');
            $password = sha1($request->get('password'));
            $remember = $request->get('remember');
            
            
            
            $em = $this->getDoctrine()->getEntityManager();
            $repositroy = $em->getRepository('LoginLoginBundle:User');
            $user = $repositroy->findOneBy(array('userName' => $username, 'userPword' => $password));
            if ($user) {
                if($remember == "yes"){
                    $login = new Login();
                    $login->setUsername($username);
                    $login->setPassword($password);
                    $session->set('login', $login);
                }
                $session->set('name',$username);
                return $this->render('LoginLoginBundle:Default:welcome.html.twig',array('name' => $username));
            }
            return $this->render('LoginLoginBundle:Default:login.html.twig');
        }else{
            if($session->has('login')){
                $login = $session->get('login');
                $username = $login->getUsername();
                $password = $login->getPassword();
                
                $em = $this->getDoctrine()->getEntityManager();
                $repositroy = $em->getRepository('LoginLoginBundle:User');
                $user = $repositroy->findOneBy(array('userName' => $username, 'userPword' => $password));
                
                if($user){
                    $session->set('name',$username);
                    return $this->render('LoginLoginBundle:Default:welcome.html.twig', array('name' => $username));
                }
            }
            return $this->render('LoginLoginBundle:Default:login.html.twig');
                                
        } 
    }
    
    public function signupAction(Request $request){
        if($request->getMethod() == 'POST'){
            $username = $request->get('username');
            $email = $request->get('email');
            $password = $request->get('password');
            
            $user = new User();
            $user->setUserName($username);
            $user->setUserEmail($email);
            $user->setUserPword(sha1($password));
            
            $em = $this->getDoctrine()->getEntityManager();
            $em->persist($user);
            $em->flush();
        }
        return $this->render('LoginLoginBundle:Default:signup.html.twig');
    }
    
    public function logoutAction(Request $request){
        $sesstion = $this->getRequest()->getSession();
        $sesstion->clear();
        return $this->render('LoginLoginBundle:Default:login.html.twig');
    }
    
    public function settingsAction(Request $request){
        $sesstion = $this->getRequest()->getSession();
        return $this->render('LoginLoginBundle:Default:settings.html.twig',array('name'=>$sesstion->get('login')->getUserName()));
    }
}
