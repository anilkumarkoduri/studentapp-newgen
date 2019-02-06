CREATE DATABASE  IF NOT EXISTS `devops_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `devops_db`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: localhost    Database: devops_db
-- ------------------------------------------------------
-- Server version	5.5.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `rd_institute`
--

DROP TABLE IF EXISTS `rd_institute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rd_institute` (
  `institute_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`institute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rd_institute`
--

LOCK TABLES `rd_institute` WRITE;
/*!40000 ALTER TABLE `rd_institute` DISABLE KEYS */;
INSERT INTO `rd_institute` VALUES (1,'Kernel Technologies','Kernel Technologies',1,'2019-02-04 11:00:20'),(2,'Versant IT','Versant IT',1,'2019-02-04 11:00:20'),(3,'Raghu Devops','Raghu Devops',1,'2019-02-04 11:00:20');
/*!40000 ALTER TABLE `rd_institute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rd_student`
--

DROP TABLE IF EXISTS `rd_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rd_student` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(55) NOT NULL,
  `last_name` varchar(55) NOT NULL,
  `email` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `location` varchar(55) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `institute_id` int(11) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `INST_STUD_FK_idx` (`institute_id`),
  CONSTRAINT `INST_STUD_FK` FOREIGN KEY (`institute_id`) REFERENCES `rd_institute` (`institute_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rd_student`
--

LOCK TABLES `rd_student` WRITE;
/*!40000 ALTER TABLE `rd_student` DISABLE KEYS */;
INSERT INTO `rd_student` VALUES (1,'Srinivasulu','Kummitha','skummitha@gmail.com','1986-04-18','Hyderabad','9490892526',3,1,'2019-02-04 19:08:13'),(2,'Raju','Doneudi','rdonepudi@gmail.com','1986-04-18','Hyderabad','9490892526',2,1,'2019-02-04 19:10:32'),(3,'Sri','Kiran','skiran@gmail.com','1986-04-18','Hyderabad','9490892526',2,1,'2019-02-04 19:11:06');
/*!40000 ALTER TABLE `rd_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rd_user`
--

DROP TABLE IF EXISTS `rd_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rd_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `active` varchar(1) NOT NULL DEFAULT 'Y',
  `institute_id` int(11) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `INST_USER_FK_idx` (`institute_id`),
  CONSTRAINT `INST_USER_FK` FOREIGN KEY (`institute_id`) REFERENCES `rd_institute` (`institute_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rd_user`
--

LOCK TABLES `rd_user` WRITE;
/*!40000 ALTER TABLE `rd_user` DISABLE KEYS */;
INSERT INTO `rd_user` VALUES (1,'admin@kernel.com','123456','Administrator','Y',1,1,'2019-02-04 11:00:20'),(2,'admin@versantit.com','123456','Administrator','Y',2,1,'2019-02-04 11:00:20'),(3,'admin@rds.com','123456','Administrator','Y',3,1,'2019-02-04 11:00:20');
/*!40000 ALTER TABLE `rd_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-05  0:42:03
