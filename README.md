# KM1_exam
理论考试模拟练题程序#科目一#科目四#科目三安全文明

# 之前的版本已经完全删除，请不要使用，请不要使用，请不要使用，重要事情说三遍！！！


# setup_step
  tomcat 8.5 以上版本安装，系统任意
  jkd 1.8.5以上版本安装
  打包成war放到webapps下
  wzhks_no_data.sql 还原到mysql中
  通过管理工具给user表添加管理员，密码32位md5
  
  
# 使用相关
  配置文件/wzhks/WEB-INF/classes/application-a.yml
  kcmc = 考场名称
  ktmc = 考台名称
  ksip = 考台开始的IP范围
  ksip = 考台结束的IP范围
  先添加练习机，练习机的MAC地址要真实填写是认证标识，房间内置三个如果不够直接改库
  考生上机直点击上机按钮，然后选择房间即可
  
 # 客户端
  请自行使用同一版本考试客户端，将ktconfig.ini里面的url修改为搭建的服务器地址
  必须使用2022年4.1之前客户端版本，并且用最新版本客户端的EXAM_KT.FDB覆盖
  如果按照此操作，会造成题库不是最新版本
  P.S:客户端必须有摄像头或者虚拟摄像头，否则打不开
  
 # 特色
  与统一版考试效果完全一样，人脸认证如果需要真实可以自行修改代码
  
 # 注意事项
  本软件为开源，可随意修改，穿不传播看你，但是请大家不要把客户端发到互联网上
