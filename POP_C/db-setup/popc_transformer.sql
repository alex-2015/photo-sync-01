-- phpMyAdmin SQL Dump
-- version 3.5.4
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Dec 07, 2014 at 11:49 AM
-- Server version: 5.5.28
-- PHP Version: 5.4.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `popc_transformer`
--

-- --------------------------------------------------------

--
-- Table structure for table `community`
--

CREATE TABLE IF NOT EXISTS `community` (
  `comm_id` int(255) NOT NULL AUTO_INCREMENT,
  `comm_name` varchar(50) NOT NULL,
  `comm_code` varchar(50) NOT NULL,
  `comm_creator` int(50) NOT NULL,
  `comm_updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comm_id`),
  KEY `comm_creator` (`comm_creator`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `community`
--

INSERT INTO `community` (`comm_id`, `comm_name`, `comm_code`, `comm_creator`, `comm_updatedTime`) VALUES
(1, 'Sinhala', 'SI', 1, '2014-12-06 15:43:15'),
(3, 'Tamil', 'TM', 1, '2014-12-06 17:56:17');

-- --------------------------------------------------------

--
-- Table structure for table `dictionary`
--

CREATE TABLE IF NOT EXISTS `dictionary` (
  `dic_id` int(255) NOT NULL AUTO_INCREMENT,
  `dic_name` varchar(50) NOT NULL,
  `comm_id` int(255) NOT NULL,
  `dic_font_name` varchar(50) NOT NULL,
  `dic_font_size` int(50) NOT NULL,
  `dic_creator` int(50) NOT NULL,
  `dic_updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`dic_id`),
  KEY `comm_id` (`comm_id`),
  KEY `dic_creator` (`dic_creator`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `dictionary`
--

INSERT INTO `dictionary` (`dic_id`, `dic_name`, `comm_id`, `dic_font_name`, `dic_font_size`, `dic_creator`, `dic_updatedTime`) VALUES
(1, 'Sinhala01', 1, 'kandy.ttf', 12, 1, '2014-12-07 02:05:34'),
(2, 'Tamil01', 3, 'aapc.ttf', 14, 1, '2014-12-07 02:05:39');

-- --------------------------------------------------------

--
-- Table structure for table `dictionary_entry`
--

CREATE TABLE IF NOT EXISTS `dictionary_entry` (
  `dic_en_id` int(255) NOT NULL AUTO_INCREMENT,
  `dic_id` int(255) NOT NULL,
  `dic_en_word` varchar(50) NOT NULL,
  `dic_en_key` varchar(50) NOT NULL,
  `dic_en_native` varchar(50) NOT NULL,
  `dic_en_english` varchar(50) NOT NULL,
  `dic_en_creator` int(50) NOT NULL,
  `dic_en_createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`dic_en_id`),
  KEY `dic_id` (`dic_id`),
  KEY `dic_en_creator` (`dic_en_creator`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `dictionary_entry`
--

INSERT INTO `dictionary_entry` (`dic_en_id`, `dic_id`, `dic_en_word`, `dic_en_key`, `dic_en_native`, `dic_en_english`, `dic_en_creator`, `dic_en_createdTime`) VALUES
(1, 1, 'amara', 'amr', '', 'amara', 1, '2014-12-06 15:52:58'),
(2, 1, 'kata', 'kt', '', 'mouth', 1, '2014-12-06 17:29:45'),
(3, 1, 'mala', 'ml', '', 'flower', 1, '2014-12-06 17:30:24'),
(4, 2, 'puri', 'Gu', '', 'flower', 1, '2014-12-07 02:03:14');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(255) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `user_pword` varchar(50) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_pword`, `user_email`) VALUES
(1, 'testuser', 'test123', 'test@test.com');

-- --------------------------------------------------------

--
-- Table structure for table `user_community`
--

CREATE TABLE IF NOT EXISTS `user_community` (
  `user_comm_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comm_id` int(11) NOT NULL,
  PRIMARY KEY (`user_comm_id`),
  KEY `user_id` (`user_id`),
  KEY `comm_id` (`comm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_dictionary`
--

CREATE TABLE IF NOT EXISTS `user_dictionary` (
  `user_dic_id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `comm_id` int(255) NOT NULL,
  `dic_id` int(255) NOT NULL,
  PRIMARY KEY (`user_dic_id`),
  KEY `user_id` (`user_id`,`comm_id`,`dic_id`),
  KEY `comm_id` (`comm_id`),
  KEY `dic_id` (`dic_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `community`
--
ALTER TABLE `community`
  ADD CONSTRAINT `community_ibfk_1` FOREIGN KEY (`comm_creator`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `dictionary`
--
ALTER TABLE `dictionary`
  ADD CONSTRAINT `dictionary_ibfk_2` FOREIGN KEY (`dic_creator`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `dictionary_ibfk_1` FOREIGN KEY (`comm_id`) REFERENCES `community` (`comm_id`);

--
-- Constraints for table `dictionary_entry`
--
ALTER TABLE `dictionary_entry`
  ADD CONSTRAINT `dictionary_entry_ibfk_2` FOREIGN KEY (`dic_en_creator`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `dictionary_entry_ibfk_1` FOREIGN KEY (`dic_id`) REFERENCES `dictionary` (`dic_id`);

--
-- Constraints for table `user_community`
--
ALTER TABLE `user_community`
  ADD CONSTRAINT `user_community_ibfk_2` FOREIGN KEY (`comm_id`) REFERENCES `community` (`comm_id`),
  ADD CONSTRAINT `user_community_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `user_dictionary`
--
ALTER TABLE `user_dictionary`
  ADD CONSTRAINT `user_dictionary_ibfk_3` FOREIGN KEY (`dic_id`) REFERENCES `dictionary` (`dic_id`),
  ADD CONSTRAINT `user_dictionary_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `user_dictionary_ibfk_2` FOREIGN KEY (`comm_id`) REFERENCES `community` (`comm_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
