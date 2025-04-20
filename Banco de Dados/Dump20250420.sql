CREATE DATABASE  IF NOT EXISTS `restaurante` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `restaurante`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: restaurante
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `mesas`
--

DROP TABLE IF EXISTS `mesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesas` (
  `numero` int NOT NULL,
  PRIMARY KEY (`numero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesas`
--

LOCK TABLES `mesas` WRITE;
/*!40000 ALTER TABLE `mesas` DISABLE KEYS */;
INSERT INTO `mesas` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),(21),(22),(23),(24),(25),(26),(27),(28),(29),(30),(31),(32),(33),(34),(35),(36),(37),(38),(39),(40),(41),(42),(43),(44),(45),(46),(47),(48),(49),(50);
/*!40000 ALTER TABLE `mesas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_itens`
--

DROP TABLE IF EXISTS `pedido_itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_itens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int DEFAULT NULL,
  `produto_id` int DEFAULT NULL,
  `quantidade` int NOT NULL,
  `status` enum('em preparo','pronto','entregue') DEFAULT 'em preparo',
  PRIMARY KEY (`id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `produto_id` (`produto_id`),
  CONSTRAINT `pedido_itens_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pedido_itens_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_itens`
--

LOCK TABLES `pedido_itens` WRITE;
/*!40000 ALTER TABLE `pedido_itens` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido_itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `tipo_pedido` enum('local','viagem') NOT NULL,
  `mesa_numero` int DEFAULT NULL,
  `data_pedido` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('em preparo','pronto','entregue') NOT NULL DEFAULT 'em preparo',
  `usuario_id` int DEFAULT NULL,
  `informacoes_adicionais` text,
  PRIMARY KEY (`id`),
  KEY `mesa_numero` (`mesa_numero`),
  KEY `FK_Pedido_Usuario` (`usuario_id`),
  CONSTRAINT `FK_Pedido_Usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE SET NULL,
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`mesa_numero`) REFERENCES `mesas` (`numero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `preco` decimal(10,2) NOT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `categoria` enum('comida','bebida') NOT NULL DEFAULT 'comida',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Pizza Calabresa','Molho artesanal, calabresa e cebola roxa.',32.90,'imagens/pizza-calabresa.jpg','comida'),(2,'Hambúrguer Artesanal','Pão brioche, carne 180g, cheddar e bacon.',25.00,'imagens/hamburguer-artesanal.jpg','comida'),(3,'Salada Caesar','Alface, frango grelhado, parmesão e croutons.',19.50,'imagens/salada-caesar.jpg','comida'),(4,'Macarrão à Bolonhesa','Massa fresca, molho de carne e parmesão.',27.90,'imagens/macarrao-bolonhesa.jpg','comida'),(5,'Sushi Combo','8 hossomakis, 4 niguiris e 4 uramakis.',42.00,'imagens/sushi-combo.jpg','comida'),(6,'Lasanha Quatro Queijos','Molho branco, mussarela, gorgonzola, parmesão e provolone.',31.90,'imagens/lasanha-queijos.jpg','comida'),(7,'Frango Grelhado','Acompanha arroz, feijão e batata frita.',22.00,'imagens/frango-grelhado.jpg','comida'),(8,'Tapioca de Queijo e Presunto','Simples e deliciosa, perfeita para o lanche.',12.00,'imagens/tapioca.jpg','comida'),(9,'Panqueca de Carne','Recheio de carne moída ao molho de tomate.',18.50,'imagens/panqueca-carne.jpg','comida'),(10,'Refrigerante Lata','350ml – Coca-Cola, Guaraná ou Fanta.',6.00,'imagens/refrigerante.jpg','bebida'),(11,'Suco Natural','Laranja, limão ou abacaxi. 300ml.',7.50,'imagens/suco.jpg','bebida'),(12,'Água Mineral','Sem gás ou com gás – 500ml.',3.50,'imagens/agua.jpg','bebida'),(13,'Cerveja Long Neck','Skol, Brahma ou Heineken 330ml.',8.90,'imagens/cerveja.jpg','bebida');
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `tipo_usuario` enum('cliente','copa','cozinha') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_nome_usuario` (`nome_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'cozinha','$2a$11$VRi6aih0IUouYZX/H32mZuNNMnvPbmIRoNIuBZo3/8bCimhMWdDna','cozinha'),(2,'copa','$2a$11$CagNpobHsSLl8fuHdjW/puo6CuIwJ4c0Eb3FAF56NaqeVaa/k6n4C','copa');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-20 20:03:52
