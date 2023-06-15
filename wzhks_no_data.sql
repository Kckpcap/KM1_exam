/*
Navicat MySQL Data Transfer

Source Server         : cst
Source Server Version : 50733
Source Host           : localhost:3306
Source Database       : wzhks

Target Server Type    : MYSQL
Target Server Version : 50733
File Encoding         : 65001

Date: 2023-06-15 15:33:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cstk
-- ----------------------------
DROP TABLE IF EXISTS `cstk`;
CREATE TABLE `cstk` (
  `stxh` varchar(6) NOT NULL COMMENT '试题序号',
  `bh` varchar(15) NOT NULL COMMENT '编号',
  `stlx` varchar(3) NOT NULL COMMENT '试题类型 Code="10"',
  `stsx` varchar(1) NOT NULL COMMENT '试题属性 1：常规题，2：精简题',
  `sttx` varchar(1) NOT NULL COMMENT '试题题型  1对错题 2 单选题 3多选题',
  `stnr` varchar(4000) NOT NULL COMMENT '试题内容',
  `xzdaa` varchar(1000) DEFAULT NULL COMMENT '选择答案A',
  `xzdab` varchar(1000) DEFAULT NULL COMMENT '答案B',
  `xzdac` varchar(1000) DEFAULT NULL COMMENT '答案C',
  `xzdad` varchar(1000) DEFAULT NULL COMMENT '答案D',
  `txlj` varchar(128) DEFAULT NULL COMMENT '图象路径',
  `stda` varchar(4) NOT NULL COMMENT '试题答案Y/N A/B/C/D',
  `stbj` varchar(1) DEFAULT NULL COMMENT '试题标记 1：可用，0：不可用',
  `sycx` varchar(32) NOT NULL COMMENT '适用车型',
  `tk1bh` varchar(10) DEFAULT NULL COMMENT '题库1编号',
  `tk2bh` varchar(10) DEFAULT NULL COMMENT '题库2编号',
  `prov` varchar(2) DEFAULT NULL COMMENT '记录地方法规的省份代码前两位',
  `jyw` varchar(4000) DEFAULT NULL COMMENT '校验位',
  `gxsj` datetime DEFAULT NULL COMMENT '更新时间',
  `stfl` varchar(3) DEFAULT NULL COMMENT '试题分类 Code="15"',
  `tklx` varchar(6) DEFAULT NULL COMMENT '题库类型 Code="21"',
  `ksyy` varchar(6) DEFAULT NULL COMMENT '考试原因',
  `stnd` varchar(300) DEFAULT NULL COMMENT '试题难度（a01,a02...a10  b01,b02,,,,,b10）',
  PRIMARY KEY (`stxh`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for cstk_rule
-- ----------------------------
DROP TABLE IF EXISTS `cstk_rule`;
CREATE TABLE `cstk_rule` (
  `kskm` varchar(10) NOT NULL,
  `sqyy` varchar(10) NOT NULL,
  `ksnr` varchar(10) NOT NULL,
  `stsl1` varchar(10) NOT NULL,
  `stsl2` varchar(10) NOT NULL,
  `stsl3` varchar(10) NOT NULL,
  `pdt1` varchar(10) NOT NULL,
  `xzt1` varchar(10) NOT NULL,
  `dxt1` varchar(10) NOT NULL,
  `pdt2` varchar(10) NOT NULL,
  `xzt2` varchar(10) NOT NULL,
  `dxt2` varchar(10) NOT NULL,
  `pdt3` varchar(10) NOT NULL,
  `xzt3` varchar(10) NOT NULL,
  `dxt3` varchar(10) NOT NULL,
  `jyw` varchar(300) NOT NULL,
  `rowid` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_idcard` varchar(18) NOT NULL COMMENT '学员身份证号',
  `student_name` varchar(30) NOT NULL COMMENT '学员姓名',
  `student_level` varchar(3) NOT NULL COMMENT '学员等级',
  `student_car_type` varchar(10) NOT NULL COMMENT '考试车型',
  `student_subject` tinyint(4) NOT NULL COMMENT '考试科目  1  4',
  `log_score` tinyint(4) NOT NULL COMMENT '考试成绩',
  `log_lose` tinyint(4) NOT NULL COMMENT '漏题数',
  `log_error` tinyint(4) NOT NULL COMMENT '错题数',
  `log_exam_time` int(11) NOT NULL COMMENT '考试时长（秒）',
  `log_exam_desk` varchar(10) NOT NULL COMMENT '考台编号',
  `log_create_time` int(10) NOT NULL COMMENT '交卷时间',
  `log_exam_number` varchar(1000) NOT NULL COMMENT '考题id集合，逗号分隔。如：1|2|3',
  `log_error_exam_number` varchar(1000) DEFAULT NULL COMMENT '错题id集合',
  `log_error_exam_answer` varchar(1000) DEFAULT NULL COMMENT '错题答案集合',
  PRIMARY KEY (`log_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=122418 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='考试记录表';

-- ----------------------------
-- Table structure for machine
-- ----------------------------
DROP TABLE IF EXISTS `machine`;
CREATE TABLE `machine` (
  `machine_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `mac` char(17) NOT NULL,
  `number` varchar(10) NOT NULL COMMENT '练习机号',
  PRIMARY KEY (`machine_id`) USING BTREE,
  UNIQUE KEY `un_mac` (`mac`) USING BTREE,
  UNIQUE KEY `ip` (`ip`) USING BTREE,
  UNIQUE KEY `number` (`number`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='测试机器表';

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `room_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_name` varchar(50) NOT NULL,
  PRIMARY KEY (`room_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_idcard` varchar(18) NOT NULL COMMENT '身份证号',
  `student_name` varchar(30) NOT NULL COMMENT '姓名',
  `student_level` varchar(3) NOT NULL COMMENT 'A01......A99',
  `student_car_type` varchar(50) NOT NULL COMMENT '车型',
  `student_subject` tinyint(4) NOT NULL COMMENT '科目 1  4',
  `student_sqyy` varchar(1) NOT NULL,
  `student_pic` blob COMMENT '照片二进制数据',
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`student_id`) USING BTREE,
  UNIQUE KEY `idcard` (`student_idcard`) USING BTREE COMMENT '身份证号唯一索引'
) ENGINE=InnoDB AUTO_INCREMENT=2824 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='学员表';

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL COMMENT '用户名',
  `user_pwd` varchar(32) NOT NULL COMMENT '密码',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
