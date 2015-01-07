<?php

namespace Dictionary\DictionaryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Community
 */
class Community
{
    /**
     * @var string
     */
    private $commName;

    /**
     * @var string
     */
    private $commCode;

    /**
     * @var integer
     */
    private $commCreator;

    /**
     * @var \DateTime
     */
    private $commUpdatedtime;

    /**
     * @var integer
     */
    private $commId;


    /**
     * Set commName
     *
     * @param string $commName
     * @return Community
     */
    public function setCommName($commName)
    {
        $this->commName = $commName;

        return $this;
    }

    /**
     * Get commName
     *
     * @return string 
     */
    public function getCommName()
    {
        return $this->commName;
    }

    /**
     * Set commCode
     *
     * @param string $commCode
     * @return Community
     */
    public function setCommCode($commCode)
    {
        $this->commCode = $commCode;

        return $this;
    }

    /**
     * Get commCode
     *
     * @return string 
     */
    public function getCommCode()
    {
        return $this->commCode;
    }

    /**
     * Set commCreator
     *
     * @param integer $commCreator
     * @return Community
     */
    public function setCommCreator($commCreator)
    {
        $this->commCreator = $commCreator;

        return $this;
    }

    /**
     * Get commCreator
     *
     * @return integer 
     */
    public function getCommCreator()
    {
        return $this->commCreator;
    }

    /**
     * Set commUpdatedtime
     *
     * @param \DateTime $commUpdatedtime
     * @return Community
     */
    public function setCommUpdatedtime($commUpdatedtime)
    {
        $this->commUpdatedtime = $commUpdatedtime;

        return $this;
    }

    /**
     * Get commUpdatedtime
     *
     * @return \DateTime 
     */
    public function getCommUpdatedtime()
    {
        return $this->commUpdatedtime;
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
}
