<?php

namespace Login\LoginBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Dictionary
 */
class Dictionary
{
    /**
     * @var string
     */
    private $dicName;

    /**
     * @var string
     */
    private $dicFontName;

    /**
     * @var integer
     */
    private $dicCreator;

    /**
     * @var \DateTime
     */
    private $dicUpdatedtime;

    /**
     * @var integer
     */
    private $dicId;

    /**
     * @var \Login\LoginBundle\Entity\Community
     */
    private $comm;


    /**
     * Set dicName
     *
     * @param string $dicName
     * @return Dictionary
     */
    public function setDicName($dicName)
    {
        $this->dicName = $dicName;

        return $this;
    }

    /**
     * Get dicName
     *
     * @return string 
     */
    public function getDicName()
    {
        return $this->dicName;
    }

    /**
     * Set dicFontName
     *
     * @param string $dicFontName
     * @return Dictionary
     */
    public function setDicFontName($dicFontName)
    {
        $this->dicFontName = $dicFontName;

        return $this;
    }

    /**
     * Get dicFontName
     *
     * @return string 
     */
    public function getDicFontName()
    {
        return $this->dicFontName;
    }

    /**
     * Set dicCreator
     *
     * @param integer $dicCreator
     * @return Dictionary
     */
    public function setDicCreator($dicCreator)
    {
        $this->dicCreator = $dicCreator;

        return $this;
    }

    /**
     * Get dicCreator
     *
     * @return integer 
     */
    public function getDicCreator()
    {
        return $this->dicCreator;
    }

    /**
     * Set dicUpdatedtime
     *
     * @param \DateTime $dicUpdatedtime
     * @return Dictionary
     */
    public function setDicUpdatedtime($dicUpdatedtime)
    {
        $this->dicUpdatedtime = $dicUpdatedtime;

        return $this;
    }

    /**
     * Get dicUpdatedtime
     *
     * @return \DateTime 
     */
    public function getDicUpdatedtime()
    {
        return $this->dicUpdatedtime;
    }

    /**
     * Get dicId
     *
     * @return integer 
     */
    public function getDicId()
    {
        return $this->dicId;
    }

    /**
     * Set comm
     *
     * @param \Login\LoginBundle\Entity\Community $comm
     * @return Dictionary
     */
    public function setComm(\Login\LoginBundle\Entity\Community $comm = null)
    {
        $this->comm = $comm;

        return $this;
    }

    /**
     * Get comm
     *
     * @return \Login\LoginBundle\Entity\Community 
     */
    public function getComm()
    {
        return $this->comm;
    }
}
