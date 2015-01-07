<?php

namespace Login\LoginBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * User
 */
class User
{
    /**
     * @var string
     */
    private $userName;

    /**
     * @var string
     */
    private $userPword;

    /**
     * @var string
     */
    private $userEmail;

    /**
     * @var integer
     */
    private $userId;


    /**
     * Set userName
     *
     * @param string $userName
     * @return User
     */
    public function setUserName($userName)
    {
        $this->userName = $userName;

        return $this;
    }

    /**
     * Get userName
     *
     * @return string 
     */
    public function getUserName()
    {
        return $this->userName;
    }

    /**
     * Set userPword
     *
     * @param string $userPword
     * @return User
     */
    public function setUserPword($userPword)
    {
        $this->userPword = $userPword;

        return $this;
    }

    /**
     * Get userPword
     *
     * @return string 
     */
    public function getUserPword()
    {
        return $this->userPword;
    }

    /**
     * Set userEmail
     *
     * @param string $userEmail
     * @return User
     */
    public function setUserEmail($userEmail)
    {
        $this->userEmail = $userEmail;

        return $this;
    }

    /**
     * Get userEmail
     *
     * @return string 
     */
    public function getUserEmail()
    {
        return $this->userEmail;
    }

    /**
     * Get userId
     *
     * @return integer 
     */
    public function getUserId()
    {
        return $this->userId;
    }
}
