-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.30 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.1.0.6537
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
CREATE DATABASE IF NOT EXISTS `r6_packs` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `r6_packs`;

-- Listage de la structure de table r6_packs. agents
CREATE TABLE IF NOT EXISTS `agents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` int DEFAULT NULL,
  `icone` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.agents : ~0 rows (environ)
DELETE FROM `agents`;

-- Listage de la structure de table r6_packs. armes
CREATE TABLE IF NOT EXISTS `armes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.armes : ~7 rows (environ)
DELETE FROM `armes`;
INSERT INTO `armes` (`id`, `name`) VALUES
	(1, 'L85A2'),
	(2, '416-C'),
	(3, 'MP5K'),
	(4, 'P90'),
	(5, 'UMP45'),
	(6, 'R4-C'),
	(7, 'G36C'),
	(8, 'MPX');

-- Listage de la structure de table r6_packs. drops
CREATE TABLE IF NOT EXISTS `drops` (
  `id_pack` int NOT NULL,
  `id_relations_skins_armes` int NOT NULL,
  `droprate` double DEFAULT NULL,
  KEY `pack` (`id_pack`),
  KEY `skin` (`id_relations_skins_armes`) USING BTREE,
  CONSTRAINT `drops_ibfk_2` FOREIGN KEY (`id_pack`) REFERENCES `packs` (`id`),
  CONSTRAINT `FK_drops_relations_skins_armes` FOREIGN KEY (`id_relations_skins_armes`) REFERENCES `relations_skins_armes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.drops : ~28 rows (environ)
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
	(2, 9, 0.13),
	(2, 34, 0.12),
	(2, 29, 0.01),
	(2, 24, 0.1),
	(2, 13, 0.13),
	(2, 26, 0.2),
	(2, 25, 0.18),
	(3, 14, 0.2),
	(3, 33, 0.1),
	(3, 10, 0.21),
	(3, 32, 0.01),
	(3, 35, 0.13),
	(3, 27, 0.19),
	(3, 20, 0.01),
	(3, 13, 0.15),
	(4, 4, 0.01),
	(4, 30, 0.1),
	(4, 15, 0.13),
	(4, 16, 0.11),
	(4, 21, 0.15),
	(2, 47, 0.13);

-- Listage de la structure de table r6_packs. inventaire
CREATE TABLE IF NOT EXISTS `inventaire` (
  `id_skin` int NOT NULL,
  `id_profile` int NOT NULL,
  KEY `id_skin` (`id_skin`),
  KEY `id_profile` (`id_profile`),
  CONSTRAINT `FK_inventaire_profile` FOREIGN KEY (`id_profile`) REFERENCES `profile` (`id`),
  CONSTRAINT `inventaire_ibfk_1` FOREIGN KEY (`id_skin`) REFERENCES `skins` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.inventaire : ~2 rows (environ)
DELETE FROM `inventaire`;
INSERT INTO `inventaire` (`id_skin`, `id_profile`) VALUES
	(8, 1),
	(2, 1);

-- Listage de la structure de table r6_packs. packs
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

-- Listage de la structure de table r6_packs. profile
CREATE TABLE IF NOT EXISTS `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `money` int NOT NULL,
  `image` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `hashed_password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `selectedSkin` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.profile : ~4 rows (environ)
DELETE FROM `profile`;
INSERT INTO `profile` (`id`, `name`, `money`, `image`, `hashed_password`, `username`, `isAdmin`, `selectedSkin`) VALUES
	(1, 'Hallexxx', 10005, 'hallexxx.jpg', '$2b$10$6l8CZ1iOBXK5RYnlJlrkGubCY.X/3IJryTYIaiDPzNXyvCUaAQiSK', 'Hallexxx', 1, '6'),
	(25, 'timv', 10000, 'tim_1700678168546.png', '$2b$10$QC8bjBYZxeIpdbKsS1khgeVUEfw4CSgxWn1ss2e8iIPNDl4QYXsEe', 'tim', 1, NULL),
	(26, 'alex', 10000, 'Alexandre_1700678253981.png', '$2b$10$ZiGnVSaUhY7h64BBU/BBUef4vQPPk3k3wVLx7D2jLLHTPgKgAntKC', 'Alexandre', 0, NULL),
	(33, 'sasasas', 10000, 'sasasa_1701168190541.png', '$2b$10$1frgnVwQJW5lZGzOG5iQquqdJ28GNaLAHRyTQcfYYUBbID/dVQA8W', 'sasasa', 0, NULL);

-- Listage de la structure de table r6_packs. rarity
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

-- Listage de la structure de table r6_packs. relations_armes_agents
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

-- Listage de la structure de table r6_packs. relations_skins_armes
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.relations_skins_armes : ~49 rows (environ)
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
	(11, 10, 2, 'Leder_416C_Skin.PNG7.5k.png', 0),
	(12, 11, 2, 'Mushroom_416C_Skin.PNG2.5k.png', 0),
	(13, 25, 7, '3_Bit_Ocean_G36C_Skin.PNG7.5k.png', 0),
	(14, 26, 7, 'Bayside_G36C_Skin.PNG2.5k.png', 0),
	(15, 27, 7, 'Gridlock_G36C_Skin.PNG6k.png', 0),
	(16, 28, 7, 'Rod_Reel_G36C_Skin.PNG12.5k.png', 0),
	(17, 12, 1, 'Engraved_L85A2_Skin7.5k.png', 0),
	(18, 13, 1, 'Gleizes_L85A2_Skin2.5k.png', 0),
	(19, 14, 1, 'Landslide_L85A2_Skin5k.png', 0),
	(20, 15, 1, 'USA_Reganomics_L85A2_Skin10k.png', 0),
	(21, 17, 3, 'Orb_Weaver_MP5K_Skin3.7k.png', 0),
	(22, 18, 3, 'Sapien_MP5K_Skin2.5k.png', 0),
	(23, 19, 3, 'Tally_MP5K_Skin2.5k.png', 0),
	(24, 20, 3, 'Vaal_MP5K_Skin6.5k.png', 0),
	(25, 21, 4, 'Autoroutes_P90_Skin.PNG5k.png', 0),
	(26, 22, 4, 'Garden_P90_Skin.PNG2.5k.png', 0),
	(27, 23, 4, 'Kona_P90_Skin.PNG2.5k.png', 0),
	(28, 24, 4, 'Royal_P90_Skin.PNG7.5k.png', 0),
	(29, 29, 1, 'Aki_No_Tsuru_L85A2_Skin25k.png', 0),
	(30, 30, 1, 'Dust_Line_L85A2_Skin15k.png', 0),
	(31, 31, 1, 'Eternal_Sun_L85A2_Skin27.5k.png', 0),
	(32, 32, 1, 'SPQR_L85A2_Skin30k.png', 0),
	(33, 33, 1, 'Black_L85A2_Skin25k.png', 0),
	(34, 34, 1, 'Cold_War-GBR_L85A2_Skin12.5k.png', 0),
	(35, 35, 1, 'Cold_War-USA_L85A2_Skin12.5k.png', 0),
	(36, 37, 1, 'Mark_1-4_L85A2_Skin10k.png', 0),
	(37, 36, 1, 'Modern_USA_Camo_L85A2_Skin9k.png', 0),
	(43, 43, 8, 'Compass_MPX_Skin.PNG2.5-.png', 0),
	(44, 44, 8, 'Confidential_MPX_Skin.PNG10.png', 0),
	(45, 47, 1, 'Crimson_L85A2_Skin.png', 0),
	(46, 46, 1, 'Diamond_L85A2_Skin.png', 0),
	(47, 45, 8, 'Geode_MPX_Skin.PNG7.5.png', 0),
	(48, 40, 6, 'Glory_R4C_Skin.PNG3.7.png', 0),
	(49, 49, 1, 'Gray_L85A2_Skin.png', 0),
	(50, 50, 8, 'Hull_MPX_Skin.PNG2.5.png', 0),
	(51, 51, 8, 'Martinete_MPX_Skin.PNG12.5.png', 0),
	(52, 52, 8, 'Sharp_Class_MPX_Skin.PNG50.png', 0),
	(53, 53, 8, 'Takka_MPX_Skin.PNG7.5.png', 0),
	(54, 54, 6, 'Target_R4C_Skin.PNG.png', 0);

-- Listage de la structure de table r6_packs. skins
CREATE TABLE IF NOT EXISTS `skins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `id_rarity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rarity` (`id_rarity`),
  CONSTRAINT `skins_ibfk_1` FOREIGN KEY (`id_rarity`) REFERENCES `rarity` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.skins : ~48 rows (environ)
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
	(37, 'Mark 1-4', 3),
	(40, 'Glory', 3),
	(43, 'Compass', 5),
	(44, 'Confidential', 2),
	(45, 'Geode', 3),
	(46, 'Diamond', 1),
	(47, 'Crimson', 2),
	(49, 'Gray', 2),
	(50, 'Hull', 5),
	(51, 'Martinete', 3),
	(52, 'Sharp', 1),
	(53, 'Takka', 3),
	(54, 'Target', 4);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
