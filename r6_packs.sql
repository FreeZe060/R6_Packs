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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.armes : ~0 rows (environ)
DELETE FROM `armes`;

-- Listage de la structure de table r6_packs. drops
CREATE TABLE IF NOT EXISTS `drops` (
  `id_pack` int NOT NULL,
  `id_skin` int NOT NULL,
  `droprate` float NOT NULL,
  KEY `skin` (`id_skin`),
  KEY `pack` (`id_pack`),
  CONSTRAINT `drops_ibfk_1` FOREIGN KEY (`id_skin`) REFERENCES `skins` (`id`),
  CONSTRAINT `drops_ibfk_2` FOREIGN KEY (`id_pack`) REFERENCES `packs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.drops : ~0 rows (environ)
DELETE FROM `drops`;
INSERT INTO `drops` (`id_pack`, `id_skin`, `droprate`) VALUES
	(1, 1, 0.05);

-- Listage de la structure de table r6_packs. inventaire
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

-- Listage de la structure de table r6_packs. packs
CREATE TABLE IF NOT EXISTS `packs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `price` int DEFAULT NULL,
  `image` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.packs : ~0 rows (environ)
DELETE FROM `packs`;
INSERT INTO `packs` (`id`, `name`, `price`, `image`) VALUES
	(1, 'Alpha Pack', 2500, 'AlphaPack.webp');

-- Listage de la structure de table r6_packs. profile
CREATE TABLE IF NOT EXISTS `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `money` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.profile : ~0 rows (environ)
DELETE FROM `profile`;

-- Listage de la structure de table r6_packs. rarity
CREATE TABLE IF NOT EXISTS `rarity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.rarity : ~0 rows (environ)
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
  `id_skin` int NOT NULL,
  `id_arme` int NOT NULL,
  KEY `skin` (`id_skin`),
  KEY `arme` (`id_arme`),
  CONSTRAINT `relations_skins_armes_ibfk_1` FOREIGN KEY (`id_skin`) REFERENCES `skins` (`id`),
  CONSTRAINT `relations_skins_armes_ibfk_2` FOREIGN KEY (`id_arme`) REFERENCES `armes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.relations_skins_armes : ~0 rows (environ)
DELETE FROM `relations_skins_armes`;

-- Listage de la structure de table r6_packs. skins
CREATE TABLE IF NOT EXISTS `skins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` int NOT NULL,
  `name` text NOT NULL,
  `image` text,
  `id_rarity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rarity` (`id_rarity`),
  CONSTRAINT `skins_ibfk_1` FOREIGN KEY (`id_rarity`) REFERENCES `rarity` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table r6_packs.skins : ~0 rows (environ)
DELETE FROM `skins`;
INSERT INTO `skins` (`id`, `price`, `name`, `image`, `id_rarity`) VALUES
	(1, 5000, 'Black Ice L85A2', 'BI_L85A2.webp', 2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
