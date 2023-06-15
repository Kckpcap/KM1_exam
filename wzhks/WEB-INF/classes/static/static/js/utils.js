var ADMIN_SETTING = {
  API_URL: "/wzhks",// http://192.168.89.203:5500/mock/68
  MONITOR_LISTNUM: 70,//监控列表显示数量
  TIME_NUM: 5000,//监控列表5秒刷新一次
  levels: ["全部", "一级", "二级", "三级", "四级", "五级", "六级", "七级", "八部", "九级"],
  setLevelLength: 10,//配置级别
  letter: 'A',
  levelsArr: [
    { label: "全部", value: "00" },
  ],
  subject: ["科目一", "科目四", "科目五"],
  subjectArrs: [
    { label: "科目一", value: 1 },
    { label: "科目四", value: 4 },
    { label: "科目五", value: 5 },
  ],
  typeArr: ["判断题", "单选题", "多选题"],
  typeArrs: [
    { label: "判断题", value: 1 },
    { label: "单选题", value: 2 },
    { label: "多选题", value: 3 },
  ],
  stsxList: [
    { label: "文字题", value: 1 },
    { label: "图片题", value: 2 },
  ],
  sqyyList: [
    // { label: "初次申领", value: "A" },
    // { label: "增驾", value: "B" },
    // { label: "实习期考试", value: "D" },
    // { label: "满分学习", value: "F" },
    // { label: "驾证恢复", value: "U" },
  ],
  sycxList: [
    { label: "A1", value: "A1" },
    { label: "A2", value: "A2" },
    { label: "A3", value: "A3" },
    { label: "B1", value: "B1" },
    { label: "B2", value: "B2" },
    { label: "C1", value: "C1" },
    { label: "C2", value: "C2" },
    { label: "C3", value: "C3" },
    { label: "C4", value: "C4" },
    { label: "C5", value: "C5" },
  ],
  wh: window.innerHeight,
  ww: window.innerWidth
}

ADMIN_SETTING.levelsArr[0].value = ADMIN_SETTING.letter + '00'

var statusVal = 0;//状态：1正常 2异常
for (let i = 1; i <= ADMIN_SETTING.setLevelLength; i++) {
  let num = i < 10 ? '0' + i : i
  ADMIN_SETTING.levelsArr.push({ label: ADMIN_SETTING.letter + num, value: ADMIN_SETTING.letter + num })
}

if(ADMIN_SETTING.letter =='A'||ADMIN_SETTING.letter=='B'){
  ADMIN_SETTING.sqyyList = [{ label: "初次申领", value: "A" },
    { label: "增驾", value: "B" }]
}else{
  ADMIN_SETTING.sqyyList = [{ label: "实习期考试", value: "D" },
    { label: "满分学习", value: "F" },
    { label: "驾证恢复", value: "U" }]
}


// 验证登录状态
showUser()

// 修改登录人密码
layui.$(document).on("click", ".changePwd", function (e) {
  var id = e.target.dataset.id;
  layui.layer.open({
    type: 1,
    title: "修改密码",
    content: layui.$("#userPwdDialog"),
    area: ["460px", "auto"], //弹窗尺寸
    success: function () {
      layui.form.val("userpwdForm", {
        oldPwd: '',
        userPwd: "",
        userPwd2: "",
        checkPwd: "",
        checkPwd2: "",
        userId: id,
        userName: JSON.parse(localStorage.getItem("kaoshi1")).userName
      });
    },
  });
});
// 修改登录人密码表单内容提交
layui.form.on("submit(userpwdForm)", function (data) {
  let userData = JSON.parse(localStorage.getItem("kaoshi1"))
  let datas = {
    userPwd: MD5(data.field.userPwd2, 32),
    oldPwd: MD5(data.field.oldPwd, 32)
  };
  datas.userId = userData.userId;
  datas.userName = userData.userName;

  ajaxPromise({
    url: "/user/edit",
    datas: JSON.stringify(datas),
    type: "post",
  }).then((res) => {
    layui.layer.msg("操作成功！", { icon: 1, time: 2000 });
    location.href = "./login.html"
  });

  // parent.location.reload();
  return false;
});
// 弹窗的取消
layui.$(document).on("click", ".cancleBtn", function () {
  parent.layer.closeAll();
});

// 监听浏览器高度变化，修改table
setHeight()
window.addEventListener('resize', () => {
  setHeight();
});
// window.addEventListener("resize", function () { setHeight(); })
// 通用验证
layui.form.verify({
  required: function (value) {
    if (!value) return "请正确填写内容";
  },
  idcard: function (value) {
    if (!isCardNo(value)) return "身份证格式不正确";
  },
  passwd2: function (value) {
    var reg = /^[\S]{1,32}$/;
    if (!reg.test(value)) return "密码不能出现空格";
  },
  checkpwd2: function (value) {
    if (layui.$("input[name=userPwd2]").val() !== value)
      return "两次密码输入不一致！";
  },
})
// 生成option
function addOptions(id, arr, type = 1) {
  let typeval = type ? type : 1
  arr.forEach((item, index) => {
    let newOpt = null;
    let num = index < 10 ? '0' + (index + 1) : (index + 1);
    if (typeval == 1) {
      newOpt = layui.$(`<option value=${item.value}>${item.label}</option>`);
    } else if (typeval == 2) {
      newOpt = layui.$(`<input type="radio" name="studentLevel" value=${item.value} title=${item.label} />`);
    } else {
      newOpt = layui.$(`<input type="checkbox" lay-skin="primary" name="stnd${num}" value=${item.value} title=${item.label} />`);
    }

    layui.$(id).append(newOpt);
  });
}

// 通用请求方法
const ajaxPromise = params => {
  // adminLoading()
  return new Promise((resovle, reject) => {
    let t = '?t='
    if (params.type == 'get') {
      t += new Date().getTime()
    }
    layui.$.ajax({
      url: ADMIN_SETTING.API_URL + params.url + t,
      data: params.datas,
      type: params.type,
      xhrFields: {
        withCredentials: true
      },
      contentType: 'application/json',//multipart/form-data
      // beforeSend: function (xhr) {
      //   console.question(xhr)
      // },
      success: function (res) {
        // removeLoading()
        if (res.code == 0) {
          resovle(res)
        } else if (res.code == 2) {
          layer.msg(res.msg, { icon: 2, time: 2000 })
          localStorage.removeItem("kaoshi1 ")
          location.href = "./login.html"
        } else {
          layer.msg(res.msg, { icon: 2, time: 2000 })
        }
      },
      error: function (err) {
        // removeLoading()
        reject(err)
      }
    })
  })
}
/*
  获取列表
  pageObj 翻页时的参数
  options form数据+api+请求类型
*/
function getList(options, pageObj = null) {
  let opts = options;
  if (!!pageObj) {
    opts.tableQuery.page = pageObj.curr;
  }
  // layui.$('.my-loading').show()
  ajaxPromise({
    url: options.url,//"http://192.168.89.203:5500/mock/68/",
    datas: opts.tableQuery,
    type: "get",
  }).then((res) => {
    // layui.$('.my-loading').hide()
    if (!res.data.length) {
      layer.msg('未查到数据', { icon: 2, time: 2000 })
    }
    opts.suc(res.data, res.total)
    if (opts.tableQuery.page) {
      //执行一个laypage分页实例
      layui.laypage.render({
        elem: "dpages", //元素id
        count: res.total, //总条数
        limit: 20, //每页显示条数
        limits: [20, 50, 100, 200],
        curr: opts.tableQuery.page,
        jump: function (obj, first) {
          // console.question(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
          // console.question(obj.limit); //得到每页显示的条数
          //首次不执行
          if (!first) {
            // 点击页码请求列表
            getList(opts, obj);
          }
        },
      });
    }
  });
}

//获取url参数
function getParamByName(name, url) {
  let oUrl = url ? url : location.href;
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(oUrl);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' ').replace('#', ''));
}
var overTime = '--'
// 获取状态--轮询
function getStatus() {
  ajaxPromise({
    url: "/monitor/getStatus",
    datas: {},
    type: "get",
  }).then((res) => {
    statusVal = res.data.status
    overTime = res.data.lastTime
    showUser()
    setTimeout(function () {
      getStatus()
    }, 15000)
  });
}

// 显示登录状态
function showUser() {
  let data = null
  let html = '<span class="user-name">未登录</span>'
  if (localStorage.getItem("kaoshi1")) {
    data = JSON.parse(localStorage.getItem("kaoshi1"));
    // 显示登录信息
    if (statusVal == 1) {
      html = '<i class="layui-icon layui-icon-ok-circle" style="color:#5FB878;font-size:20px;vertical-align: middle;" title="' + overTime + '"></i>'
    } else if (statusVal == 2) {
      html = '<i class="layui-icon layui-icon-close-fill" style="color:#FF5722;font-size:20px;vertical-align: middle;" title="' + overTime + '"></i>'
    } else {
      html = ''
    }

    html += ' <span class="user-name">' + data.userName + "（已登录）" + '</span>'
    html += '<button class="layui-btn layui-btn layui-btn-normal layui-btn-xs changePwd" data-id="' + data.userId + '">修改密码</button>'
    layui.$(".right-info").html(html)

  } else if (location.href.indexOf('login.html') < 0 && location.href.indexOf('read-card.html') < 0) {
    // 未登录返回登录页
    location.href = "./login.html"
  }

}

// add loading
function adminLoading(option) {
  let icons = ['layui-icon-loading-1', 'layui-icon-loading'];
  let jq = layui.$;
  let options = {
    icon: 1,//加载图片样式 1,2
    shadow: true,//遮罩
    time: -1,//-1 不消失 ，>0 n秒后消失
  }
  let opt = Object.assign(options, option)

  let html = `<div class="admin-loading animate-circle"><i class="layui-icon ${icons[opt.icon - 1]}"></i></div><div class="admin-layer"></div>`
  jq("body").append(html)
  if (opt.time > 0) {
    setTimeout(removeLoading, opt.time)
  }
}
// remove loading
function removeLoading() {
  if (layui.$('.admin-loading')) {
    layui.$('.admin-loading,.admin-layer').remove()
  }
}

//身份证验证
function isCardNo(card) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(card)
}

/*
time ==> 时间戳 如：1502884800000，
format ==>  时间显示格式  如：'yyyy-MM-dd HH:mm:ss'，
例：format(1502884800000,'yyyy-MM-dd HH:mm:ss') 
输出："2017-08-16 20:00:00"
*/
var formatData = function (time, format = "yyyy-MM-dd HH:mm:ss") {
  var t = new Date(time);
  var tf = function (i) { return (i < 10 ? '0' : '') + i };
  return format.replace(/yyyy|yy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
        break;
      case 'yy':
        return tf(t.getFullYear()).substr(2);
        // return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'mm':
        return tf(t.getMinutes());
        break;
      case 'dd':
        return tf(t.getDate());
        break;
      case 'HH':
        return tf(t.getHours());
        break;
      case 'ss':
        return tf(t.getSeconds());
        break;
    }
  })
}


function setHeight() {
  // var wh = window.innerHeight
  // var th = layui.$('.dmain-title').outerHeight()
  // var sh = layui.$('.search-table').outerHeight()
  var actionh = 0
  if (layui.$(".page-actions")) {
    actionh = layui.$('.page-actions').outerHeight()
  }
  ADMIN_SETTING.wh = layui.$(window).height()
  ADMIN_SETTING.ww = layui.$(window).width()

  // console.log(ADMIN_SETTING.wh, ADMIN_SETTING.ww)
  // layui.$('.dmain-table').css('height', wh - th - sh - actionh - 50 - 40 - 55 - 20 + 'px')
}
// window.onbeforeunload = function (e) {
//   var e = window.event || e;
//   e.returnValue = ("确定离开当前页面吗？");
// }

window.ADMIN_SETTING = ADMIN_SETTING;
window.ajaxPromise = ajaxPromise
window.getParamByName = getParamByName
window.getList = getList
window.formatData = formatData
window.isCardNo = isCardNo
window.addOptions = addOptions
window.getStatus = getStatus