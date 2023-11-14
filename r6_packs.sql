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

-- Listage des données de la table r6_packs.agents : ~0 rows (environ)

-- Listage des données de la table r6_packs.armes : ~4 rows (environ)
INSERT INTO `armes` (`id`, `name`) VALUES
	(1, 'L85A2'),
	(2, '416-C'),
	(3, 'MP5K'),
	(4, 'P90');

-- Listage des données de la table r6_packs.drops : ~3 rows (environ)
INSERT INTO `drops` (`id_pack`, `id_skin`, `droprate`) VALUES
	(1, 1, 0.05),
	(1, 2, 20),
	(1, 3, 2);

-- Listage des données de la table r6_packs.inventaire : ~0 rows (environ)

-- Listage des données de la table r6_packs.packs : ~1 rows (environ)
INSERT INTO `packs` (`id`, `name`, `price`, `image`) VALUES
	(1, 'Alpha Pack', 2500, 'AlphaPack.jpg');

-- Listage des données de la table r6_packs.profile : ~1 rows (environ)
INSERT INTO `profile` (`id`, `name`, `money`, `image`) VALUES
	(1, 'Hallexxx', 10000, 'hallexxx.jpg');

-- Listage des données de la table r6_packs.rarity : ~5 rows (environ)
INSERT INTO `rarity` (`id`, `name`) VALUES
	(1, 'LEGENDARY'),
	(2, 'EPIC'),
	(3, 'RARE'),
	(4, 'UNCOMMON'),
	(5, 'COMMON');

-- Listage des données de la table r6_packs.relations_armes_agents : ~0 rows (environ)

-- Listage des données de la table r6_packs.relations_skins_armes : ~3 rows (environ)
INSERT INTO `relations_skins_armes` (`id_skin`, `id_arme`) VALUES
	(1, 1),
	(2, 2),
	(3, 4);

-- Listage des données de la table r6_packs.skins : ~3 rows (environ)
INSERT INTO `skins` (`id`, `price`, `name`, `image`, `id_rarity`) VALUES
	(1, 30000, 'Black Ice', 'Black_Ice_L85A2_Skin.webp', 2),
	(2, 100, 'Oahu', 'Oahu_416C_Skin.PNG2.5k.webp', 5),
	(3, 1000, 'Gator', 'Gator_P90_Skin.PNG1k.webp', 3);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
