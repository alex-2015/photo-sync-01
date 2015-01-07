<?php

namespace Login\LoginBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserCommunity
 */
class UserCommunity
{
    /**
     * @var integer
     */
    private $userId;

    /**
     * @var integer
     */
    private $commId;

    /**
     * @var integer
     */
    private $userCommId;


    /**
     * Set userId
     *
     * @param integer $userId
     * @return UserCommunity
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
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

    /**
     * Set commId
     *
     * @param integer $commId
     * @return UserCommunity
     */
    public function setCommId($commId)
    {
        $this->commId = $commId;

        return $this;
    }

    /**
     * Get commId
     *
     * @return integer 
     */
    public function getCommId()
    {
        return $this->commId;
    }

    /**
     * Get userCommId
     *
     * @return integer 
     */
    public function getUserCommId()
    {
        return $this->userCommId;
    }
}
