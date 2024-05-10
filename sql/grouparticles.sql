/*
 Navicat Premium Data Transfer

 Source Server         : blog_db
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : order

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 10/05/2024 15:01:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for grouparticles
-- ----------------------------
DROP TABLE IF EXISTS `grouparticles`;
CREATE TABLE `grouparticles`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `groupId` int(0) NOT NULL,
  `articleId` int(0) NOT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updatedAt` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of grouparticles
-- ----------------------------
INSERT INTO `grouparticles` VALUES (1, 1, 3, '2024-03-18 19:32:26', '2024-03-18 19:32:26');
INSERT INTO `grouparticles` VALUES (2, 1, 4, '2024-03-18 19:32:30', '2024-03-18 19:32:30');
INSERT INTO `grouparticles` VALUES (3, 1, 5, '2024-03-18 19:32:53', '2024-03-18 19:32:56');
INSERT INTO `grouparticles` VALUES (4, 6, 7, '2024-03-23 00:22:11', '2024-03-23 00:22:11');
INSERT INTO `grouparticles` VALUES (5, 6, 8, '2024-03-23 00:22:13', '2024-03-23 00:22:13');
INSERT INTO `grouparticles` VALUES (6, 2, 1, '2024-03-23 00:20:09', '2024-03-23 00:20:11');
INSERT INTO `grouparticles` VALUES (7, 1, 18, '2024-03-27 02:59:49', '2024-03-27 02:59:49');
INSERT INTO `grouparticles` VALUES (8, 1, 20, '2024-03-27 11:05:21', '2024-03-27 11:05:21');
INSERT INTO `grouparticles` VALUES (9, 1, 21, '2024-03-27 11:13:58', '2024-03-27 11:13:58');
INSERT INTO `grouparticles` VALUES (10, 1, 22, '2024-03-27 11:27:25', '2024-03-27 11:27:25');
INSERT INTO `grouparticles` VALUES (11, 1, 23, '2024-03-27 11:34:54', '2024-03-27 11:34:54');
INSERT INTO `grouparticles` VALUES (12, 2, 25, '2024-03-27 12:24:26', '2024-03-27 12:24:26');
INSERT INTO `grouparticles` VALUES (13, 2, 26, '2024-03-28 10:54:22', '2024-03-28 10:54:22');
INSERT INTO `grouparticles` VALUES (14, 2, 31, '2024-03-30 07:04:06', '2024-03-30 07:04:06');
INSERT INTO `grouparticles` VALUES (15, 9, 45, '2024-04-01 17:31:02', '2024-04-01 17:31:02');
INSERT INTO `grouparticles` VALUES (16, 11, 46, '2024-04-01 18:04:00', '2024-04-01 18:04:00');
INSERT INTO `grouparticles` VALUES (17, 9, 47, '2024-04-02 20:00:26', '2024-04-02 20:00:26');
INSERT INTO `grouparticles` VALUES (18, 9, 48, '2024-04-03 16:19:19', '2024-04-03 16:19:19');
INSERT INTO `grouparticles` VALUES (19, 11, 49, '2024-04-04 19:32:54', '2024-04-04 19:32:54');
INSERT INTO `grouparticles` VALUES (20, 11, 50, '2024-05-04 19:22:06', '2024-05-04 19:22:06');
INSERT INTO `grouparticles` VALUES (21, 12, 51, '2024-05-04 21:46:26', '2024-05-04 21:46:26');
INSERT INTO `grouparticles` VALUES (22, 12, 52, '2024-05-05 02:18:05', '2024-05-05 02:18:05');
INSERT INTO `grouparticles` VALUES (23, 12, 53, '2024-05-05 13:22:20', '2024-05-05 13:22:20');
INSERT INTO `grouparticles` VALUES (24, 10, 54, '2024-05-07 12:16:34', '2024-05-07 12:16:34');
INSERT INTO `grouparticles` VALUES (25, 10, 55, '2024-05-07 12:20:48', '2024-05-07 12:20:48');
INSERT INTO `grouparticles` VALUES (26, 12, 56, '2024-05-07 12:36:51', '2024-05-07 12:36:51');
INSERT INTO `grouparticles` VALUES (27, 10, 57, '2024-05-07 17:29:26', '2024-05-07 17:29:26');
INSERT INTO `grouparticles` VALUES (28, 11, 58, '2024-05-07 18:11:27', '2024-05-07 18:11:27');
INSERT INTO `grouparticles` VALUES (29, 11, 59, '2024-05-08 13:42:11', '2024-05-08 13:42:11');
INSERT INTO `grouparticles` VALUES (30, 9, 61, '2024-05-08 15:09:11', '2024-05-08 15:09:11');
INSERT INTO `grouparticles` VALUES (31, 9, 63, '2024-05-08 17:28:04', '2024-05-08 17:28:04');

SET FOREIGN_KEY_CHECKS = 1;
