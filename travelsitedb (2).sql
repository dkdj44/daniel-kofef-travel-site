-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2021 at 05:29 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travelsitedb`
--
CREATE DATABASE IF NOT EXISTS `travelsitedb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `travelsitedb`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userUuid` varchar(50) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `password` varchar(150) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userUuid`, `userName`, `firstName`, `lastName`, `password`, `isAdmin`) VALUES
('0813740c-1f0a-420b-b39f-7e4aa093e459', 'daniel', 'dani', 'koff', '5c922ab18247611f5d043b2cc68ae8e30cfd7f85d34aaf120ca28500a8c18caca41b0bc8d37792cabce90213d22bea4292a093e83f4159f6624f5c646f3aa7a9', 0),
('50459a42-2c1c-42bb-9b2c-7882a586be63', 'yanak', 'dani', 'asd', '5c922ab18247611f5d043b2cc68ae8e30cfd7f85d34aaf120ca28500a8c18caca41b0bc8d37792cabce90213d22bea4292a093e83f4159f6624f5c646f3aa7a9', 0),
('ab2a2817-80ce-41d7-9334-79e731eb7b5f', 'yanako', 'yana ', 'koff', '89701a7bf5a9281a3c6eed53001ae3c5ca6c2ff3d41ed351e32bce52f009e90bfac588114172d54066178c3b32f7c9d8ef83994d04327e6487c506303f7c2ab8', 0),
('bef015d5-deec-4174-8c48-d994c757914c', 'dkdj', 'dani', 'kofef', 'a9f928cf4520ee89ac3177a9a3b8304a6ea33b0234b7e6d37f66bcd68be6b61a08d9ed69b9cd9cce9b3a60209a76fdcbac626589bb70bb8133069362f97d08d0', 1),
('c7af5e48-e684-47cc-9015-274533a2dc81', 'shlomi ', 'shlomi', 'cohen', '5c922ab18247611f5d043b2cc68ae8e30cfd7f85d34aaf120ca28500a8c18caca41b0bc8d37792cabce90213d22bea4292a093e83f4159f6624f5c646f3aa7a9', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationUuid` varchar(50) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `vactionStart` date NOT NULL,
  `vactaionEnds` date NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `imageName` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationUuid`, `destination`, `vactionStart`, `vactaionEnds`, `price`, `description`, `imageName`) VALUES
('90e397a8-d78f-4019-a360-c6a8f524354b', 'paris', '2021-07-02', '2021-07-10', 500, 'visit the capital of france ', '90e397a8-d78f-4019-a360-c6a8f524354b.jpg'),
('af5be069-46e7-4788-aeab-0946438bfcc1', 'prague', '2021-07-01', '2021-07-08', 300, 'visit the capital of the czech republic', 'af5be069-46e7-4788-aeab-0946438bfcc1.jpg'),
('b9fdfb9d-f884-4630-bf96-b7b678417faa', 'black forrest', '2021-06-28', '2021-07-10', 450, 'visit the owls of the night\n', 'b9fdfb9d-f884-4630-bf96-b7b678417faa.jpg'),
('d040f7da-4090-42cd-b02d-0eace63b38b1', 'berlin', '2021-07-03', '2021-07-09', 200, 'visit the capital of germany', 'd040f7da-4090-42cd-b02d-0eace63b38b1.jpg'),
('dced3cd0-fcfe-4ff9-8d4d-be26f7db314c', 'london ', '2021-07-08', '2021-07-10', 800, 'visit the capital of england and drink tea ', 'dced3cd0-fcfe-4ff9-8d4d-be26f7db314c.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userUuid`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationUuid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
