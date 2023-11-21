-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.30 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour r6_packs
DROP DATABASE IF EXISTS `r6_packs`;
CREATE DATABASE IF NOT EXISTS `r6_packs` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `r6_packs`;

-- Listage de la structure de la table r6_packs. agents
DROP TABLE IF EXISTS `agents`;
CREATE TABLE IF NOT EXISTS `agents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` int DEFAULT NULL,
  `icone` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.agents : ~0 rows (environ)
DELETE FROM `agents`;

-- Listage de la structure de la table r6_packs. armes
DROP TABLE IF EXISTS `armes`;
CREATE TABLE IF NOT EXISTS `armes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.armes : ~7 rows (environ)
DELETE FROM `armes`;
INSERT INTO `armes` (`id`, `name`) VALUES
	(1, 'L85A2'),
	(2, '416-C'),
	(3, 'MP5K'),
	(4, 'P90'),
	(5, 'UMP45'),
	(6, 'R4-C'),
	(7, 'G36C');

-- Listage de la structure de la table r6_packs. drops
DROP TABLE IF EXISTS `drops`;
CREATE TABLE IF NOT EXISTS `drops` (
  `id_pack` int NOT NULL,
  `id_relations_skins_armes` int NOT NULL,
  `droprate` double DEFAULT NULL,
  KEY `pack` (`id_pack`),
  KEY `skin` (`id_relations_skins_armes`) USING BTREE,
  CONSTRAINT `drops_ibfk_2` FOREIGN KEY (`id_pack`) REFERENCES `packs` (`id`),
  CONSTRAINT `FK_drops_relations_skins_armes` FOREIGN KEY (`id_relations_skins_armes`) REFERENCES `relations_skins_armes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.drops : ~8 rows (environ)
DELETE FROM `drops`;
INSERT INTO `drops` (`id_pack`, `id_relations_skins_armes`, `droprate`) VALUES
	(1, 1, 0.01),
	(1, 2, 0.27),
	(1, 3, 0.16),
	(1, 4, 0.01),
	(1, 7, 0.2),
	(1, 5, 0.1),
	(1, 6, 0.17),
	(1, 8, 0.08),
	(2, 9, 0.27);

-- Listage de la structure de la table r6_packs. inventaire
DROP TABLE IF EXISTS `inventaire`;
CREATE TABLE IF NOT EXISTS `inventaire` (
  `id_skin` int NOT NULL,
  `id_profile` int NOT NULL,
  KEY `id_skin` (`id_skin`),
  KEY `id_profile` (`id_profile`),
  CONSTRAINT `FK_inventaire_profile` FOREIGN KEY (`id_profile`) REFERENCES `profile` (`id`),
  CONSTRAINT `inventaire_ibfk_1` FOREIGN KEY (`id_skin`) REFERENCES `skins` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.inventaire : ~0 rows (environ)
DELETE FROM `inventaire`;

-- Listage de la structure de la table r6_packs. packs
DROP TABLE IF EXISTS `packs`;
CREATE TABLE IF NOT EXISTS `packs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `price` int DEFAULT NULL,
  `image` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.packs : ~9 rows (environ)
DELETE FROM `packs`;
INSERT INTO `packs` (`id`, `name`, `price`, `image`) VALUES
	(1, 'Alpha Pack', 2500, 'AlphaPack.png'),
	(2, 'Esports Alpha Pack', 10000, 'Siege_Esports_Alpha_Pack.png'),
	(3, 'Outbreak Pack', 15000, 'Outbreak_Alpha_Pack.png'),
	(4, 'Holiday Pack', 8500, 'Holiday_2020_Alpha_Pack_2.png'),
	(5, 'Nighthaven Pack', 12500, 'Nighthaven_R26D_Collection_Pack.PNG.png'),
	(6, 'Alpha Pack 2019', 5500, '2019_Collection_Alpha_Pack.PNG.png'),
	(7, 'Rengoku Pack', 17500, 'Rengoku_Alpha_Pack.png'),
	(8, 'Showdown Pack', 20000, 'Showdown_Pack.png'),
	(9, 'Apocalypse Pack', 22500, 'Siege_Apocalypse_Pack (2).png');

-- Listage de la structure de la table r6_packs. profile
DROP TABLE IF EXISTS `profile`;
CREATE TABLE IF NOT EXISTS `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `money` int NOT NULL,
  `image` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `hashed_password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.profile : ~6 rows (environ)
DELETE FROM `profile`;
INSERT INTO `profile` (`id`, `name`, `money`, `image`, `hashed_password`, `username`) VALUES
	(1, 'Hallexxx', 10000, 'hallexxx.jpg', NULL, NULL),
	(11, 'timv', 10000, 'tim_1700491409869.png', '$2b$10$loZJuV5MBBM./GCy1PIh/uk89lpYPAfLBBoUiPLFlc/AvGecLrGgK', 'tim'),
	(12, 'Alexandre', 10000, 'Hallexx_1700498462904.png', '$2b$10$ze8eQltK4iPhPlHoevb8.uaoyViRDWQ5D3XhkCC8W6ZcgVnsJrxcu', 'Hallexx'),
	(13, 'alex', 10000, 'alex_1700503480034.png', '$2b$10$8aE3N8NSwBwnOTcqlPSNcOWBw4gqCrtjR0vEBixyI7g55NsZDCunW', 'alex'),
	(14, 'azazaza', 10000, 'dede_1700503547159.png', '$2b$10$egPEr51vCGqFZc5vGsbKl.aAKNsQt.pC7DwpONkZj3V9jqoeGDKCi', 'dede'),
	(15, 'tim', 10000, 'tim_1700571393464.png', '$2b$10$0Kr1TeZS2PkcIyTFxNk7CeXeho0lh9uziqv32H7Wp1EQyBa.HBKGS', 'tim');

-- Listage de la structure de la table r6_packs. rarity
DROP TABLE IF EXISTS `rarity`;
CREATE TABLE IF NOT EXISTS `rarity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.rarity : ~5 rows (environ)
DELETE FROM `rarity`;
INSERT INTO `rarity` (`id`, `name`) VALUES
	(1, 'LEGENDARY'),
	(2, 'EPIC'),
	(3, 'RARE'),
	(4, 'UNCOMMON'),
	(5, 'COMMON');

-- Listage de la structure de la table r6_packs. relations_armes_agents
DROP TABLE IF EXISTS `relations_armes_agents`;
CREATE TABLE IF NOT EXISTS `relations_armes_agents` (
  `id_agent` int NOT NULL,
  `id_arme` int NOT NULL,
  KEY `agents` (`id_agent`),
  KEY `arme` (`id_arme`),
  CONSTRAINT `relations_armes_agents_ibfk_1` FOREIGN KEY (`id_arme`) REFERENCES `armes` (`id`),
  CONSTRAINT `relations_armes_agents_ibfk_2` FOREIGN KEY (`id_agent`) REFERENCES `agents` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.relations_armes_agents : ~0 rows (environ)
DELETE FROM `relations_armes_agents`;

-- Listage de la structure de la table r6_packs. relations_skins_armes
DROP TABLE IF EXISTS `relations_skins_armes`;
CREATE TABLE IF NOT EXISTS `relations_skins_armes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_skin` int NOT NULL,
  `id_arme` int NOT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `skin` (`id_skin`),
  KEY `arme` (`id_arme`),
  CONSTRAINT `relations_skins_armes_ibfk_1` FOREIGN KEY (`id_skin`) REFERENCES `skins` (`id`),
  CONSTRAINT `relations_skins_armes_ibfk_2` FOREIGN KEY (`id_arme`) REFERENCES `armes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.relations_skins_armes : ~8 rows (environ)
DELETE FROM `relations_skins_armes`;
INSERT INTO `relations_skins_armes` (`id`, `id_skin`, `id_arme`, `image`, `price`) VALUES
	(1, 1, 1, 'Black_Ice_L85A2_Skin.png', 30000),
	(2, 2, 2, 'Oahu_416C_Skin.PNG2.5k.png', 100),
	(3, 3, 4, 'Gator_P90_Skin.PNG1k.png', 1500),
	(4, 1, 6, 'BlackIce_R4C_Skin.png', 32000),
	(5, 4, 3, 'Fallen_Sun_MP5K_Skin10k.png', 2000),
	(6, 5, 6, 'Nebula_R4C_Skin.png', 1000),
	(7, 6, 1, 'Waves_L85A2_Skin2.5k.png', 700),
	(8, 7, 7, 'Turbo_G36C_Skin.PNG2.5k.png', 2500),
	(9, 8, 2, 'Bundespolizei_416C_Skin.PNG5k.png', 0),
	(10, 9, 2, 'Bundeswehr_416C_Skin.PNG2.5k.png', 0),
	(11, 10, 2, 'Leder_416C_Skin.PNG7.5k', 0),
	(12, 11, 2, 'Mushroom_416C_Skin.PNG2.5k.png', 0),
	(13, 25, 7, '3_Bit_Ocean_G36C_Skin.PNG7.5k.png', 0),
	(14, 26, 7, 'Bayside_G36C_Skin.PNG2.5k.png', 0);

-- Listage de la structure de la table r6_packs. skins
DROP TABLE IF EXISTS `skins`;
CREATE TABLE IF NOT EXISTS `skins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `id_rarity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rarity` (`id_rarity`),
  CONSTRAINT `skins_ibfk_1` FOREIGN KEY (`id_rarity`) REFERENCES `rarity` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.skins : ~7 rows (environ)
DELETE FROM `skins`;
INSERT INTO `skins` (`id`, `name`, `id_rarity`) VALUES
	(1, 'Black Ice', 1),
	(2, 'Oahu', 5),
	(3, 'Gator', 3),
	(4, 'Fallen Sun', 2),
	(5, 'Nebula', 4),
	(6, 'Waves', 4),
	(7, 'Turbo', 2),
	(8, 'Bundespolizei', 3),
	(9, 'Bundeswehr', 5),
	(10, 'Leder', 3),
	(11, 'Mushroom', 4),
	(12, 'Engraved', 3),
	(13, 'Gleizes', 5),
	(14, 'Landslide', 2),
	(15, 'Reganomics', 1),
	(16, 'Waves', 4),
	(17, 'Orb Weaver', 3),
	(18, 'Sapien', 4),
	(19, 'Tally', 5),
	(20, 'Vaal', 2),
	(21, 'Autoroutes', 4),
	(22, 'Garden', 5),
	(23, 'Kona', 5),
	(24, 'Royal', 3),
	(25, 'Bit Ocean', 3),
	(26, 'Bayside', 5),
	(27, 'Gridlock', 3),
	(28, 'Rod Reel', 2),
	(29, 'Aki_No_Tsuru', 1),
	(30, 'Dust Line', 2),
	(31, 'Eternal Sun', 1),
	(32, 'SPQR', 1),
	(33, 'Black', 2),
	(34, 'Cold War GBR', 3),
	(35, 'Cold War USA', 3),
	(36, 'Modern USA', 4),
	(37, 'Mark 1-4', 3);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
