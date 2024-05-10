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

 Date: 10/05/2024 15:01:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for articletags
-- ----------------------------
DROP TABLE IF EXISTS `articletags`;
CREATE TABLE `articletags`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `articleId` int(0) NULL DEFAULT NULL,
  `tagId` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of articletags
-- ----------------------------
INSERT INTO `articletags` VALUES (1, 1, 2);
INSERT INTO `articletags` VALUES (2, 1, 3);
INSERT INTO `articletags` VALUES (3, 1, 4);
INSERT INTO `articletags` VALUES (5, 3, 10);
INSERT INTO `articletags` VALUES (6, 4, 5);
INSERT INTO `articletags` VALUES (7, 4, 6);
INSERT INTO `articletags` VALUES (8, 6, 1);
INSERT INTO `articletags` VALUES (9, 6, 2);
INSERT INTO `articletags` VALUES (10, 6, 4);
INSERT INTO `articletags` VALUES (11, 6, 7);
INSERT INTO `articletags` VALUES (12, 6, 8);
INSERT INTO `articletags` VALUES (14, 9, 8);
INSERT INTO `articletags` VALUES (15, 9, 11);
INSERT INTO `articletags` VALUES (16, 9, 14);
INSERT INTO `articletags` VALUES (17, 3, 11);
INSERT INTO `articletags` VALUES (18, 3, 10);
INSERT INTO `articletags` VALUES (19, 3, 14);
INSERT INTO `articletags` VALUES (21, 5, 1);
INSERT INTO `articletags` VALUES (22, 5, 9);
INSERT INTO `articletags` VALUES (23, 5, 8);
INSERT INTO `articletags` VALUES (24, 8, 8);
INSERT INTO `articletags` VALUES (28, 43, 11);
INSERT INTO `articletags` VALUES (31, 45, 15);
INSERT INTO `articletags` VALUES (32, 46, 1);
INSERT INTO `articletags` VALUES (33, 47, 15);
INSERT INTO `articletags` VALUES (34, 48, 15);
INSERT INTO `articletags` VALUES (35, 49, 11);
INSERT INTO `articletags` VALUES (36, 49, 15);
INSERT INTO `articletags` VALUES (37, 50, 11);
INSERT INTO `articletags` VALUES (39, 52, 19);
INSERT INTO `articletags` VALUES (41, 50, 11);
INSERT INTO `articletags` VALUES (42, 50, 25);
INSERT INTO `articletags` VALUES (43, 53, 19);
INSERT INTO `articletags` VALUES (44, 54, 26);
INSERT INTO `articletags` VALUES (45, 55, 26);
INSERT INTO `articletags` VALUES (46, 56, 19);
INSERT INTO `articletags` VALUES (47, 57, 9);
INSERT INTO `articletags` VALUES (48, 58, 27);
INSERT INTO `articletags` VALUES (49, 59, 11);
INSERT INTO `articletags` VALUES (50, 62, 15);
INSERT INTO `articletags` VALUES (53, 48, 29);
INSERT INTO `articletags` VALUES (54, 47, 30);
INSERT INTO `articletags` VALUES (55, 63, 7);

SET FOREIGN_KEY_CHECKS = 1;
