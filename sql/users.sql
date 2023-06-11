/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : order

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 11/06/2023 21:25:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `isActive` tinyint(1) NULL DEFAULT NULL,
  `createdAt` datetime(6) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '林媛媛', 1, '2023-06-11 00:01:00.000000', '2023-06-11 18:31:05.850337');
INSERT INTO `users` VALUES (2, '吴丽珍', 0, '2023-06-11 11:51:26.689433', '2023-06-11 11:51:26.000000');
INSERT INTO `users` VALUES (3, '斜杠', 1, '2023-06-11 00:00:00.000000', '2023-06-11 18:29:32.000000');
INSERT INTO `users` VALUES (4, '刘波', 1, '2023-06-11 18:30:24.105827', '2023-06-11 18:30:22.000000');
INSERT INTO `users` VALUES (5, 'post-name', 1, '2023-06-11 12:27:57.000000', '2023-06-11 12:27:57.000000');
INSERT INTO `users` VALUES (6, '小名-update', 1, '2023-06-11 12:41:31.162604', '2023-06-11 12:41:31.000000');

SET FOREIGN_KEY_CHECKS = 1;
