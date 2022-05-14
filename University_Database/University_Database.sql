-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: University_Database
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `University_Database`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `University_Database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `University_Database`;

--
-- Table structure for table `Batch`
--

DROP TABLE IF EXISTS `Batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Batch` (
  `Year` year NOT NULL,
  PRIMARY KEY (`Year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Batch`
--

LOCK TABLES `Batch` WRITE;
/*!40000 ALTER TABLE `Batch` DISABLE KEYS */;
INSERT INTO `Batch` VALUES (2019),(2020),(2021);
/*!40000 ALTER TABLE `Batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Book_Issued_To`
--

DROP TABLE IF EXISTS `Book_Issued_To`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Book_Issued_To` (
  `StudentID` int NOT NULL,
  `BookID` int NOT NULL,
  `Librarian` varchar(50) NOT NULL,
  PRIMARY KEY (`StudentID`,`BookID`),
  KEY `BookID` (`BookID`),
  CONSTRAINT `Book_Issued_To_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Book_Issued_To_ibfk_2` FOREIGN KEY (`BookID`) REFERENCES `Books` (`BookID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Book_Issued_To`
--

LOCK TABLES `Book_Issued_To` WRITE;
/*!40000 ALTER TABLE `Book_Issued_To` DISABLE KEYS */;
INSERT INTO `Book_Issued_To` VALUES (201951000,100,'Chitranshi Srivastava'),(201951001,101,'Chitranshi Srivastava'),(201952000,103,'Chitranshi Srivastava'),(201952000,104,'Chitranshi Srivastava'),(201952000,105,'Chitranshi Srivastava'),(201952001,106,'Chitranshi Srivastava'),(201952002,104,'Chitranshi Srivastava'),(202051000,102,'Chitranshi Srivastava'),(202051000,111,'Chitranshi Srivastava'),(202051001,111,'Chitranshi Srivastava'),(202051002,103,'Chitranshi Srivastava'),(202052000,102,'Chitranshi Srivastava'),(202053000,104,'Chitranshi Srivastava'),(202053000,105,'Chitranshi Srivastava'),(202054000,107,'Chitranshi Srivastava'),(202055000,100,'Chitranshi Srivastava'),(202055000,109,'Chitranshi Srivastava'),(202055001,108,'Chitranshi Srivastava'),(202154000,102,'Chitranshi Srivastava'),(202154000,108,'Chitranshi Srivastava');
/*!40000 ALTER TABLE `Book_Issued_To` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Books`
--

DROP TABLE IF EXISTS `Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Books` (
  `BookID` int NOT NULL,
  `Book_Name` varchar(100) NOT NULL,
  `Copies` int DEFAULT NULL,
  PRIMARY KEY (`BookID`),
  UNIQUE KEY `Book_Name` (`Book_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Books`
--

LOCK TABLES `Books` WRITE;
/*!40000 ALTER TABLE `Books` DISABLE KEYS */;
INSERT INTO `Books` VALUES (100,'Discrete Mathematics and Its Application',72),(101,'Let Us C',20),(102,'Introduction To Algorithms',38),(103,'OS Concepts',19),(104,'Probability and Statistics',27),(105,'Sapiens: A Brief History To Humankind',45),(106,'Database System Concepts',51),(107,'Introduction To Linear Algebra',43),(108,'Linear Algebra and Its Applications',42),(109,'Concepts of Physics',12),(110,'Integrated Electronics',46),(111,'Computer Organisation and Architecture',45),(112,'The Alchemist',10),(113,'Killing Pablo',2),(114,'Why I am a Hindu?',1),(115,'The Merchant of Venice',2);
/*!40000 ALTER TABLE `Books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Books_Author`
--

DROP TABLE IF EXISTS `Books_Author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Books_Author` (
  `BookID` int NOT NULL,
  `Author` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`BookID`),
  CONSTRAINT `Books_Author_ibfk_1` FOREIGN KEY (`BookID`) REFERENCES `Books` (`BookID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Books_Author`
--

LOCK TABLES `Books_Author` WRITE;
/*!40000 ALTER TABLE `Books_Author` DISABLE KEYS */;
INSERT INTO `Books_Author` VALUES (100,'Kenneth Rosen'),(101,'Yashvant Kanetkar'),(102,'Thomas H. Cormen'),(103,'Abraham Silberschatz'),(104,'Michael Baron'),(105,'Yuval Noah Harari'),(106,'Henry Korth'),(107,'Gilbert Strang'),(108,'David C. Lay'),(109,'HC Verma'),(110,'Jacob Millman'),(111,'William Stallings'),(112,'Paulo Coelho'),(113,'Mark Bowden'),(114,'Shashi Tharoor'),(115,'William Shakespeare');
/*!40000 ALTER TABLE `Books_Author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Branch`
--

DROP TABLE IF EXISTS `Branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Branch` (
  `Branch_Name` varchar(100) NOT NULL,
  `Duration_in_Years` int NOT NULL,
  `Number_Of_Courses` int NOT NULL,
  PRIMARY KEY (`Branch_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Branch`
--

LOCK TABLES `Branch` WRITE;
/*!40000 ALTER TABLE `Branch` DISABLE KEYS */;
INSERT INTO `Branch` VALUES ('Agriculture',5,27),('Computer Science and Engineering',4,37),('Electronics and Communication Engineering',4,38),('Information Technology',4,36),('Maths',5,46),('Physics',5,43);
/*!40000 ALTER TABLE `Branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Branch_Has_Course`
--

DROP TABLE IF EXISTS `Branch_Has_Course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Branch_Has_Course` (
  `Branch_Name` varchar(100) NOT NULL,
  `CourseID` int NOT NULL,
  PRIMARY KEY (`Branch_Name`,`CourseID`),
  KEY `CourseID` (`CourseID`),
  CONSTRAINT `Branch_Has_Course_ibfk_1` FOREIGN KEY (`Branch_Name`) REFERENCES `Branch` (`Branch_Name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Branch_Has_Course_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Branch_Has_Course`
--

LOCK TABLES `Branch_Has_Course` WRITE;
/*!40000 ALTER TABLE `Branch_Has_Course` DISABLE KEYS */;
INSERT INTO `Branch_Has_Course` VALUES ('Physics',101),('Physics',102),('Computer Science and Engineering',201),('Electronics and Communication Engineering',201),('Information Technology',201),('Maths',201),('Computer Science and Engineering',202),('Information Technology',202),('Maths',202),('Computer Science and Engineering',301),('Information Technology',301),('Computer Science and Engineering',302),('Information Technology',302),('Computer Science and Engineering',303),('Electronics and Communication Engineering',303),('Information Technology',303),('Computer Science and Engineering',304),('Information Technology',304),('Electronics and Communication Engineering',401),('Computer Science and Engineering',402),('Electronics and Communication Engineering',402),('Information Technology',402),('Computer Science and Engineering',403),('Electronics and Communication Engineering',403),('Information Technology',403),('Information Technology',501),('Physics',501),('Maths',502);
/*!40000 ALTER TABLE `Branch_Has_Course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Club`
--

DROP TABLE IF EXISTS `Club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Club` (
  `Club_Name` varchar(20) NOT NULL,
  `Budget_in_INR` int DEFAULT NULL,
  PRIMARY KEY (`Club_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Club`
--

LOCK TABLES `Club` WRITE;
/*!40000 ALTER TABLE `Club` DISABLE KEYS */;
INSERT INTO `Club` VALUES ('Coding',20000),('Dot',15000),('Encore',10000),('FinOptimus',30000),('Masquerade',10000),('Mod5',12000),('Obscura',25000);
/*!40000 ALTER TABLE `Club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Course`
--

DROP TABLE IF EXISTS `Course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Course` (
  `CourseID` int NOT NULL,
  `Course_Name` varchar(100) NOT NULL,
  `Credits` int DEFAULT '0',
  PRIMARY KEY (`CourseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Course`
--

LOCK TABLES `Course` WRITE;
/*!40000 ALTER TABLE `Course` DISABLE KEYS */;
INSERT INTO `Course` VALUES (101,'Thermodynamics',20),(102,'Waves and SHM',18),(201,'Linear Algebra and Matrices',23),(202,'Discrete Mathematics',22),(301,'Object-Oriented Programming',21),(302,'Database Management System',19),(303,'Operating Systems',21),(304,'Data Structures and Algorithms',25),(401,'Semiconductors',19),(402,'Digital Logic Design',21),(403,'Computer Architecture',21),(501,'Science, Technology and Society',19),(502,'Economics',21);
/*!40000 ALTER TABLE `Course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Faculty`
--

DROP TABLE IF EXISTS `Faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Faculty` (
  `FacultyID` int NOT NULL,
  `Faculty_Name` varchar(100) NOT NULL,
  `Date_Of_Birth` date NOT NULL,
  `Salary_in_INR` int DEFAULT NULL,
  `Designation` varchar(50) NOT NULL,
  `Gender` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`FacultyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Faculty`
--

LOCK TABLES `Faculty` WRITE;
/*!40000 ALTER TABLE `Faculty` DISABLE KEYS */;
INSERT INTO `Faculty` VALUES (100000,'Ashish Ranjan','1972-03-07',350000,'Assistant Professor','Male'),(100001,'Ankit Mittal','1988-12-01',650000,'Professor','Male'),(100002,'Deepshikha Gupta','1987-02-28',450000,'Professor','Female'),(100003,'Abhishek Singh','1992-07-05',400000,'Assistant Professor','Male'),(100004,'Soumya Gupta','1993-08-27',250000,'Assistant Professor','Female'),(100005,'Narendra Rathi','1973-11-08',550000,'Professor','Male'),(100006,'Pawan Kumar Modi','1965-07-27',375000,'Visiting Faculty','Male'),(100007,'Amit Kumar','1990-06-24',655000,'Professor','Male'),(100008,'Ishan Pandey','1989-03-09',422000,'Professor','Male');
/*!40000 ALTER TABLE `Faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Grades`
--

DROP TABLE IF EXISTS `Grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Grades` (
  `ReportID` int NOT NULL AUTO_INCREMENT,
  `CPI` double(8,6) DEFAULT NULL,
  PRIMARY KEY (`ReportID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Grades`
--

LOCK TABLES `Grades` WRITE;
/*!40000 ALTER TABLE `Grades` DISABLE KEYS */;
INSERT INTO `Grades` VALUES (3,9.124112),(4,8.134131),(5,7.134134),(6,9.135133),(7,7.893731),(8,6.500332),(9,9.753843),(10,7.075357),(11,8.946739),(12,5.933533),(13,6.295829),(14,8.768482),(15,9.848292),(16,8.349334),(17,9.863113);
/*!40000 ALTER TABLE `Grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hostel`
--

DROP TABLE IF EXISTS `Hostel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Hostel` (
  `Type` varchar(100) NOT NULL,
  `Fees_Per_Semester_in_INR` int DEFAULT NULL,
  `Capacity` int DEFAULT NULL,
  PRIMARY KEY (`Type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hostel`
--

LOCK TABLES `Hostel` WRITE;
/*!40000 ALTER TABLE `Hostel` DISABLE KEYS */;
INSERT INTO `Hostel` VALUES ('2 Person AC',25000,200),('2 Person Non AC',18000,200),('3 Person AC',23000,150),('3 Person Non AC',15000,200);
/*!40000 ALTER TABLE `Hostel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mess`
--

DROP TABLE IF EXISTS `Mess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Mess` (
  `Type` varchar(50) NOT NULL,
  `Fees_Per_Semester_in_INR` int DEFAULT NULL,
  PRIMARY KEY (`Type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mess`
--

LOCK TABLES `Mess` WRITE;
/*!40000 ALTER TABLE `Mess` DISABLE KEYS */;
INSERT INTO `Mess` VALUES ('Non-Veg Premium',23000),('Non-Veg Regular',18000),('Veg Premium',20000),('Veg Regular',15000);
/*!40000 ALTER TABLE `Mess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Section`
--

DROP TABLE IF EXISTS `Section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Section` (
  `Section_No` int NOT NULL,
  `Branch_Name` varchar(100) NOT NULL,
  `Semester` int NOT NULL,
  PRIMARY KEY (`Section_No`,`Branch_Name`,`Semester`),
  KEY `Branch_Name` (`Branch_Name`),
  CONSTRAINT `Section_ibfk_1` FOREIGN KEY (`Branch_Name`) REFERENCES `Branch` (`Branch_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Section`
--

LOCK TABLES `Section` WRITE;
/*!40000 ALTER TABLE `Section` DISABLE KEYS */;
INSERT INTO `Section` VALUES (1,'Computer Science and Engineering',3),(1,'Computer Science and Engineering',4),(1,'Computer Science and Engineering',5),(1,'Computer Science and Engineering',6),(2,'Computer Science and Engineering',3),(2,'Computer Science and Engineering',4),(1,'Electronics and Communication Engineering',3),(1,'Electronics and Communication Engineering',4),(1,'Information Technology',3),(1,'Information Technology',4),(1,'Information Technology',5),(1,'Information Technology',6),(1,'Maths',1),(1,'Maths',2),(1,'Maths',3),(1,'Maths',4),(1,'Physics',3),(1,'Physics',4);
/*!40000 ALTER TABLE `Section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student`
--

DROP TABLE IF EXISTS `Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student` (
  `StudentID` int NOT NULL,
  `Date_Of_Birth` date NOT NULL,
  `Gender` varchar(20) NOT NULL,
  `Batch` year NOT NULL,
  UNIQUE KEY `StudentID` (`StudentID`),
  KEY `Batch` (`Batch`),
  CONSTRAINT `Student_ibfk_1` FOREIGN KEY (`Batch`) REFERENCES `Batch` (`Year`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student`
--

LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */;
INSERT INTO `Student` VALUES (201951000,'2000-07-15','Male',2019),(201951001,'1999-12-11','Female',2019),(201952000,'1999-06-02','Female',2019),(201952001,'1999-04-24','Male',2019),(201952002,'2000-05-13','Female',2019),(202051000,'2002-03-17','Male',2020),(202051001,'2001-11-04','Male',2020),(202051002,'2001-11-04','Female',2020),(202052000,'2002-01-02','Male',2020),(202053000,'2001-09-17','Female',2020),(202054000,'2001-09-11','Female',2020),(202055000,'2001-08-17','Female',2020),(202055001,'2001-08-21','Male',2020),(202154000,'2001-10-10','Male',2021);
/*!40000 ALTER TABLE `Student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student_Address`
--

DROP TABLE IF EXISTS `Student_Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student_Address` (
  `StudentID` int NOT NULL,
  `Street` varchar(50) DEFAULT NULL,
  `City` varchar(30) NOT NULL,
  `State` varchar(30) NOT NULL,
  `Postal_Code` varchar(10) NOT NULL,
  PRIMARY KEY (`StudentID`),
  CONSTRAINT `Student_Address_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student_Address`
--

LOCK TABLES `Student_Address` WRITE;
/*!40000 ALTER TABLE `Student_Address` DISABLE KEYS */;
INSERT INTO `Student_Address` VALUES (201951000,'Mahavir Street','Patna','Bihar','800002'),(201951001,'Main Road','Vellore','Tamil Nadu','632009'),(201952000,'Ashok Marg','Hyderabad','Andhra Pradesh','500001'),(201952001,'Bandra','Mumbai','Maharashtra','475001'),(201952002,'Howrah Bridge','Kolkata','West Bengal','700006'),(202051000,'Kapoorthala','Lakhimpur','Uttar Pradesh','262701'),(202051001,'Oel','Hargaon','Uttar Pradesh','262710'),(202051002,'Sector 6, Kapoorthala','Lucknow','Uttar Pradesh','226022'),(202052000,'MG Road','Nagpur','Maharashtra','440007'),(202053000,'Ashok Marg, Hazratganj','Lucknow','Uttar Pradesh','226001'),(202054000,'LDA Colony','Lucknow','Uttar Pradesh','226002'),(202055000,'Church Street','Aizawl','Mizoram','796005'),(202055001,'MG Road','Gangtok','Sikkim','737135'),(202154000,'Koba-Ambapur Road','Ahmedabad','Gujarat','382421');
/*!40000 ALTER TABLE `Student_Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student_Branch`
--

DROP TABLE IF EXISTS `Student_Branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student_Branch` (
  `StudentID` int NOT NULL,
  `Branch_Name` varchar(100) NOT NULL,
  PRIMARY KEY (`StudentID`),
  KEY `Branch_Name` (`Branch_Name`),
  CONSTRAINT `Student_Branch_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Student_Branch_ibfk_2` FOREIGN KEY (`Branch_Name`) REFERENCES `Branch` (`Branch_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student_Branch`
--

LOCK TABLES `Student_Branch` WRITE;
/*!40000 ALTER TABLE `Student_Branch` DISABLE KEYS */;
INSERT INTO `Student_Branch` VALUES (201951000,'Computer Science and Engineering'),(201951001,'Computer Science and Engineering'),(202051000,'Computer Science and Engineering'),(202051001,'Computer Science and Engineering'),(202051002,'Computer Science and Engineering'),(202053000,'Electronics and Communication Engineering'),(201952000,'Information Technology'),(201952001,'Information Technology'),(201952002,'Information Technology'),(202052000,'Information Technology'),(202054000,'Maths'),(202154000,'Maths'),(202055000,'Physics'),(202055001,'Physics');
/*!40000 ALTER TABLE `Student_Branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student_Club`
--

DROP TABLE IF EXISTS `Student_Club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student_Club` (
  `StudentID` int NOT NULL,
  `Club_Name` varchar(20) NOT NULL,
  `Designation` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`StudentID`,`Club_Name`),
  KEY `Club_Name` (`Club_Name`),
  CONSTRAINT `Student_Club_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Student_Club_ibfk_2` FOREIGN KEY (`Club_Name`) REFERENCES `Club` (`Club_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student_Club`
--

LOCK TABLES `Student_Club` WRITE;
/*!40000 ALTER TABLE `Student_Club` DISABLE KEYS */;
INSERT INTO `Student_Club` VALUES (201951000,'Coding','Secretary'),(201951001,'Encore','Secretary'),(201951001,'Masquerade','Secretary'),(201952000,'Mod5','Secretary'),(201952002,'Dot','Secretary'),(201952002,'Encore','Member'),(202051000,'Masquerade','Member'),(202051002,'Coding','Joint-Secretary'),(202051002,'Dot','Joint-Secretary'),(202051002,'Mod5','Member'),(202052000,'Mod5','Joint-Secretary'),(202054000,'Masquerade','Joint-Secretary'),(202055000,'Encore','Joint-Secretary'),(202055000,'Mod5','Member'),(202055001,'Encore','Member'),(202154000,'Dot','Member'),(202154000,'Masquerade','Member'),(202154000,'Mod5','Member');
/*!40000 ALTER TABLE `Student_Club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student_Hostel`
--

DROP TABLE IF EXISTS `Student_Hostel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student_Hostel` (
  `StudentID` int NOT NULL,
  `Type` varchar(100) DEFAULT NULL,
  `Fee_Status` varchar(20) DEFAULT NULL,
  `Room` int DEFAULT NULL,
  PRIMARY KEY (`StudentID`),
  KEY `Type` (`Type`),
  CONSTRAINT `Student_Hostel_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Student_Hostel_ibfk_2` FOREIGN KEY (`Type`) REFERENCES `Hostel` (`Type`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student_Hostel`
--

LOCK TABLES `Student_Hostel` WRITE;
/*!40000 ALTER TABLE `Student_Hostel` DISABLE KEYS */;
INSERT INTO `Student_Hostel` VALUES (201951000,'3 Person Non AC','PAID',201),(201951001,'2 Person Non AC','PAID',101),(201952000,'3 Person Non AC','PAID',201),(201952001,'3 Person Non AC','DUE',202),(201952002,'2 Person AC','PAID',111),(202051000,'2 Person Non AC','PAID',101),(202051001,'2 Person AC','DUE',111),(202051002,'2 Person Non AC','PAID',102),(202052000,'3 Person AC','PAID',211),(202053000,'3 Person AC','PAID',211),(202054000,'2 Person Non AC','PAID',103),(202055000,'3 Person AC','DUE',211),(202055001,'2 Person Non AC','PAID',103);
/*!40000 ALTER TABLE `Student_Hostel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student_Mess`
--

DROP TABLE IF EXISTS `Student_Mess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student_Mess` (
  `StudentID` int NOT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `Fee_Status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`StudentID`),
  KEY `Type` (`Type`),
  CONSTRAINT `Student_Mess_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Student_Mess_ibfk_2` FOREIGN KEY (`Type`) REFERENCES `Mess` (`Type`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student_Mess`
--

LOCK TABLES `Student_Mess` WRITE;
/*!40000 ALTER TABLE `Student_Mess` DISABLE KEYS */;
INSERT INTO `Student_Mess` VALUES (201951000,'Veg Regular','PAID'),(201951001,'Veg Premium','PAID'),(201952000,'Non-Veg Regular','PAID'),(201952001,'Veg Regular','DUE'),(201952002,'Veg Premium','PAID'),(202051000,'Veg Premium','PAID'),(202051001,'Non-Veg Regular','DUE'),(202051002,'Non-Veg Regular','PAID'),(202052000,'Veg Regular','PAID'),(202054000,'Non-Veg Regular','PAID'),(202055000,'Non-Veg Premium','DUE'),(202055001,'Veg Regular','PAID');
/*!40000 ALTER TABLE `Student_Mess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student_Name`
--

DROP TABLE IF EXISTS `Student_Name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student_Name` (
  `StudentID` int NOT NULL,
  `First_Name` varchar(30) NOT NULL,
  `Middle_Name` varchar(20) DEFAULT NULL,
  `Last_Name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`StudentID`),
  CONSTRAINT `Student_Name_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student_Name`
--

LOCK TABLES `Student_Name` WRITE;
/*!40000 ALTER TABLE `Student_Name` DISABLE KEYS */;
INSERT INTO `Student_Name` VALUES (201951000,'Kalash','Singh','Jadoun'),(201951001,'Priya','Singh','Varrier'),(201952000,'Ananya',NULL,'Pandey'),(201952001,'Sachin','Ramesh','Tendulkar'),(201952002,'Jyoti','Prakash','Srivastava'),(202051000,'Archit',NULL,'Agrawal'),(202051001,'Prakhar',NULL,'Awasthi'),(202051002,'Mahi',NULL,'Mishra'),(202052000,'Harsh','Jitesh','Dawda'),(202053000,'Shivangi',NULL,'Singh'),(202054000,'Pragya',NULL,'Sharma'),(202055000,'Sukriti',NULL,'Pandey'),(202055001,'Sarang',NULL,'Nagar'),(202154000,'Aman',NULL,'Gangwar');
/*!40000 ALTER TABLE `Student_Name` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student_Parents`
--

DROP TABLE IF EXISTS `Student_Parents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student_Parents` (
  `StudentID` int NOT NULL,
  `Father` varchar(50) DEFAULT NULL,
  `Mother` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`StudentID`),
  CONSTRAINT `Student_Parents_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student_Parents`
--

LOCK TABLES `Student_Parents` WRITE;
/*!40000 ALTER TABLE `Student_Parents` DISABLE KEYS */;
INSERT INTO `Student_Parents` VALUES (201951000,'Narendra Singh Jadoun','Amrita Singh Jadoun'),(201951001,'Ishan Singh Varrier','Soumya Singh Varrier'),(201952000,'Chunky Pandey','Ishita Pandey'),(201952001,'Ramesh Tendulkar','Archana Tendulkar'),(201952002,'Prakash Srivastava','Riya Srivastava'),(202051000,'Indra Bhushan Gupta','Kiran Gupta'),(202051001,'Om Awasthi','Pooja Awasthi'),(202051002,'Sanjeev Mishra','Nita Mishra'),(202052000,'Jitesh Dawda','Aarti Dawda'),(202053000,'Ajay Singh','Anamika Singh'),(202054000,'Ajitesh Sharma','Priya Sharma'),(202055000,'Pranjal Pandey','Shikha Pandey'),(202055001,'Abhishek Nagar','Deepika Nagar'),(202154000,'Priyam Gangwar','Shilpa Gangwar');
/*!40000 ALTER TABLE `Student_Parents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student_Report`
--

DROP TABLE IF EXISTS `Student_Report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student_Report` (
  `StudentID` int NOT NULL,
  `ReportID` int NOT NULL,
  PRIMARY KEY (`ReportID`),
  KEY `StudentID` (`StudentID`),
  CONSTRAINT `Student_Report_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Student_Report_ibfk_2` FOREIGN KEY (`ReportID`) REFERENCES `Grades` (`ReportID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student_Report`
--

LOCK TABLES `Student_Report` WRITE;
/*!40000 ALTER TABLE `Student_Report` DISABLE KEYS */;
INSERT INTO `Student_Report` VALUES (201951000,6),(201951000,17),(201951001,4),(201951001,16),(201952000,9),(201952001,8),(201952002,5),(202051000,7),(202051001,15),(202051002,11),(202052000,14),(202053000,12),(202054000,10),(202055000,13),(202055001,3);
/*!40000 ALTER TABLE `Student_Report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student_Section`
--

DROP TABLE IF EXISTS `Student_Section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student_Section` (
  `StudentID` int NOT NULL,
  `Section_No` int DEFAULT NULL,
  `Semester` int NOT NULL,
  PRIMARY KEY (`StudentID`,`Semester`),
  CONSTRAINT `Student_Section_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student_Section`
--

LOCK TABLES `Student_Section` WRITE;
/*!40000 ALTER TABLE `Student_Section` DISABLE KEYS */;
INSERT INTO `Student_Section` VALUES (201951000,1,6),(201951001,1,6),(201952000,1,6),(201952001,1,6),(201952002,1,6),(202051000,1,4),(202051001,2,4),(202051002,2,4),(202052000,1,4),(202053000,1,4),(202054000,1,4),(202055000,1,4),(202055001,1,4),(202154000,1,2);
/*!40000 ALTER TABLE `Student_Section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Teaches`
--

DROP TABLE IF EXISTS `Teaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Teaches` (
  `FacultyID` int NOT NULL,
  `CourseID` int NOT NULL,
  PRIMARY KEY (`FacultyID`,`CourseID`),
  KEY `CourseID` (`CourseID`),
  CONSTRAINT `Teaches_ibfk_1` FOREIGN KEY (`FacultyID`) REFERENCES `Faculty` (`FacultyID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Teaches_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teaches`
--

LOCK TABLES `Teaches` WRITE;
/*!40000 ALTER TABLE `Teaches` DISABLE KEYS */;
INSERT INTO `Teaches` VALUES (100007,101),(100007,102),(100005,201),(100000,202),(100001,301),(100003,302),(100002,303),(100001,304),(100000,401),(100008,402),(100006,403),(100002,501),(100004,502);
/*!40000 ALTER TABLE `Teaches` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-28 22:43:59
