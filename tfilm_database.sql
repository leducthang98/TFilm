/*
 Navicat Premium Data Transfer

 Source Server         : DB_LuThuyAn
 Source Server Type    : MySQL
 Source Server Version : 100236
 Source Host           : 103.142.26.130:4306
 Source Schema         : leducthang

 Target Server Type    : MySQL
 Target Server Version : 100236
 File Encoding         : 65001

 Date: 04/01/2021 22:03:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` char(36) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `dOb` date DEFAULT NULL,
  `born_in` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted` int(11) DEFAULT NULL,
  `role` char(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` char(36) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for character
-- ----------------------------
DROP TABLE IF EXISTS `character`;
CREATE TABLE `character` (
  `id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `deleted` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for character_episode
-- ----------------------------
DROP TABLE IF EXISTS `character_episode`;
CREATE TABLE `character_episode` (
  `id` char(36) NOT NULL,
  `character_id` char(36) DEFAULT NULL,
  `episode_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_characterId` (`character_id`),
  KEY `fk_episodeId` (`episode_id`),
  CONSTRAINT `fk_characterId` FOREIGN KEY (`character_id`) REFERENCES `character` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_episodeId` FOREIGN KEY (`episode_id`) REFERENCES `episode` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` char(36) NOT NULL,
  `account_id` char(36) DEFAULT NULL,
  `episode_id` char(36) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_accountId` (`account_id`),
  KEY `fk_eps` (`episode_id`),
  CONSTRAINT `fk_accountId` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_eps` FOREIGN KEY (`episode_id`) REFERENCES `episode` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for director
-- ----------------------------
DROP TABLE IF EXISTS `director`;
CREATE TABLE `director` (
  `id` char(36) CHARACTER SET utf8mb4 NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for episode
-- ----------------------------
DROP TABLE IF EXISTS `episode`;
CREATE TABLE `episode` (
  `id` char(36) NOT NULL,
  `season_id` char(36) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `deleted` int(11) DEFAULT NULL,
  `url` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_eps_season` (`season_id`),
  CONSTRAINT `fk_eps_season` FOREIGN KEY (`season_id`) REFERENCES `season` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for movie
-- ----------------------------
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted` int(11) DEFAULT NULL,
  `director_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_movie_director` (`director_id`),
  CONSTRAINT `fk_movie_director` FOREIGN KEY (`director_id`) REFERENCES `director` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for movie_category
-- ----------------------------
DROP TABLE IF EXISTS `movie_category`;
CREATE TABLE `movie_category` (
  `id` char(36) NOT NULL,
  `movie_id` char(36) DEFAULT NULL,
  `category_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_movie` (`movie_id`),
  KEY `fk_cat` (`category_id`),
  CONSTRAINT `fk_cat` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for rate
-- ----------------------------
DROP TABLE IF EXISTS `rate`;
CREATE TABLE `rate` (
  `id` char(36) NOT NULL,
  `account_id` char(36) CHARACTER SET utf8mb4 DEFAULT NULL,
  `movie_id` char(36) CHARACTER SET utf8mb4 DEFAULT NULL,
  `mark` float(255,0) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rate_acc` (`account_id`),
  KEY `fk_rate_mov` (`movie_id`),
  CONSTRAINT `fk_rate_acc` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_rate_mov` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for season
-- ----------------------------
DROP TABLE IF EXISTS `season`;
CREATE TABLE `season` (
  `id` char(36) CHARACTER SET utf8mb4 NOT NULL,
  `movie_id` char(36) CHARACTER SET utf8mb4 DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `deleted` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_season_mov` (`movie_id`),
  CONSTRAINT `fk_season_mov` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
