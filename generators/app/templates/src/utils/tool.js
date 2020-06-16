import store from "../store";

export default {
  /* 检测json字符串 */
  isJsonString (str) {
    try {
      if (typeof JSON.parse(str) === "object") {
        return true;
      }
    } catch (e) {
    }
    return false;
  },
  /* 获取权限数组 */
  getPowerArr () {
    return store.state.power.split(",").map(item => {
      if ((item / 1)) {
        return (item / 1)
      } else {
        return item
      }
    })
  },
  /* 不能输入特殊字符 */
  keyUpFn (e, obj) {
    obj = obj.trim();
    obj = obj.replace(/%/g, '');
    obj = obj.replace(/#/g, '');
    obj = obj.replace(/\//g, '');
    // obj = obj.replace(/ /g, '');
    return obj
  },
  timeFormat (time) {
    const month = time.getMonth() >= 9 ? (time.getMonth() + 1) : ("0" + (time.getMonth() + 1))
    const date = time.getDate() > 9 ? time.getDate() : ("0" + time.getDate())
    const formatTime = time.getFullYear() + "-" + month + "-" + date;
    return formatTime;
  },
  dateFormat (time) {
    const one = 86400
    let formatTime = "";
    const timestamp = Math.round(new Date(time.replace(/-/g, "/")).getTime() / 1000)
    const today1 = this.timeFormat(new Date()) + " 0:0:0"
    const today = Math.round(new Date(today1.replace(/-/g, "/")).getTime() / 1000) + 24 * 60 * 60
    const dateMinus = today - timestamp
    if (dateMinus < one) {
      const time2 = time.split(" ")[1]
      formatTime = time2.split(":")[0] + ":" + time2.split(":")[1]
    } else if (dateMinus < one * 2) {
      formatTime = "昨天"
    } else if (dateMinus < one * 5) {
      const weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
      formatTime = weekday[new Date(time.replace(/-/g, "/")).getDay()]
    } else {
      formatTime = time.split(" ")[0].replace(/-/g, "/");
    }
    return formatTime;
  },
  /* 初始化rangeDate */
  rangeDate (num = 7, type = 1) {
    // num 天数； type: {1: yyyy-MM-dd, 2: yyyy-MM-dd hh:mm}
    const end = new Date();
    const start = new Date(Math.round(new Date().getTime() - 1000 * 60 * 60 * 24 * (num - 1)))
    if (type === 1) {
      return [this.timeFormat(start), this.timeFormat(end)];
    } else {
      return [this.timeFormat(start) + " 00:00", this.timeFormat(end) + " 23:59"];
    }
  },
  /* 非标签的title内容长度过滤 */
  sliceDotTitle (value, arg) {
    let res
    if (value === undefined || value === null) {
      return ""
    }
    if (value.length > arg[1]) {
      res = value.slice(arg[0], arg[1]) + "…"
    } else {
      res = value
    }
    return res
  },
  /* json非空判断参数 */
  jsonToNoEmpty (jsonParams) {
    const parameter = {};
    const keyArr = Object.keys(jsonParams);
    keyArr.forEach(item => {
      if (jsonParams[item] !== '') {
        parameter[item] = jsonParams[item];
      }
    });
    return parameter;
  },
  /* json转from参数 */
  jsonToForm (jsonParams) {
    const parameter = new URLSearchParams();
    const keyArr = Object.keys(jsonParams);
    keyArr.forEach(item => {
      parameter.append(
        item,
        jsonParams[item]
      );
    });
    return parameter;
  },
  /* json转url参数 */
  jsonToUrl (url, jsonParams) {
    let _url = url + "?";
    for (const key in jsonParams) {
      if (jsonParams.hasOwnProperty(key)) {
        const element = jsonParams[key];
        _url += `${key}=${element}&`;
      }
    }
    return _url.slice(0, _url.length - 1);
  },
  /* deepClone */
  deepClone (target) {
    function _deepClone (_target) {
      if (_target instanceof Date) return new Date(_target)
      if (_target instanceof RegExp) return new RegExp(_target)
      if (typeof _target !== 'object' || !_target) return _target

      let obj = {}

      if (_target instanceof Array) obj = []

      for (const key in _target) {
        obj[key] = _deepClone(_target[key])
      }

      return obj
    }

    return _deepClone(target);
  },
  /* url 操作 */
  urlFormat (url, params) {
    params = params && Object.keys(params).map(function (key) {
      return [key, params[key]].map(encodeURIComponent).join('=');
    }).join('&');

    return params ? url + (url.indexOf('?') >= 0 ? '&' : '?') + params : url;
  },
  // loadScript
  loadScript (url) {
    return new Promise(function (resolve, reject) {
      var head = document.getElementsByTagName('head')[0]
      var script = document.createElement('script')
      var linstener = function () {
        this.removeEventListener('load', linstener)
        resolve()
      }
      script.type = 'text/javascript'
      script.addEventListener('load', linstener)
      script.src = url
      head.appendChild(script)
    })
  },
  // 生成随机数
  noncestr (range = 4, prefix = '') {
    const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let str = ""

    for (let i = 0; i < range; i++) {
      const pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }

    return `${prefix}${str}`;
  },
  // 约分操作 m:分子  n:分母
  fraction (m, n) {
    let a = m
    let b = n
    let e = 0

    function gcd (a, b) { // 欧几里德算法
      return b === 0 ? a : gcd(b, a % b);
    }

    if (a === 0 || b === 1) return; // 如果分子是0或分母是1就不用约分了

    e = gcd(a, b);
    a /= e;
    b /= e;

    return [a, b]
  }
}
