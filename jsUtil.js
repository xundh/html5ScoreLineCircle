/**
* 基础工具
*/
String.prototype.ItemIsContain = function (item) {
    var _input = this;
    var source = "," + _input + ",";
    item = "," + item + ",";
    return source.indexOf(item) > -1;
}
Number.prototype.ItemIsContain = function (item) {
    var _input = this;
    var source = "," + _input + ",";
    var str = "," + item.ToString() + ",";
    return source.indexOf(str) > -1;
}
String.prototype.ItemAdd = function (item) {
    var _input = this;
    var source = "," + _input + ",";
    if (source.indexOf("," + item + ",") > -1) {
    }
    else {
        source = source + item;
    }
    return source.trim(',').trim(',');
}
String.prototype.ItemRemove = function (item) {
    var _input = this;
    var itemArray = item.Split(',');
    var source = "," + _input + ",";
    source = source.Replace("," + item + ",", "");
    return source.trim(',');
}

String.prototype.trim = function (dot) {
    /// <summary>去掉字符后面的空格和去掉</summary>
    /// <param name="dot">要去掉的字符</param>
    /// <returns>返回处理后字符串</returns>
    var result = this;
    if (!dot)
        result = result.replace(/(^\s+)|(\s+$)/g, "");
    else {
        if (result.indexOf(dot) == 0)
            result = result.substring(1, result.length);
        if (result.lastIndexOf(dot) == result.length - 1) {
            result = result.substring(0, result.length - 1);
        }
    }
    return result;
}
String.prototype.trimdot = function () { return this.replace("'", "").replace(",", ""); }

String.prototype.substringPro = function (length, suffix) {
    var str = '';
    suffix = suffix || '';
    if (this.getLen() <= length) {
        return this;
    }
    for (var i = 0, j = 0; j < length - suffix.length;) {
        if (this.charCodeAt(i) >= 0 && this.charCodeAt(i) < 256) {
            str += this.charAt(i);
            j++;
        } else if ((j += 3) <= length) {
            str += this.charAt(i);
        }
        i++;
    }
    str += suffix;
    return str;
};
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};
Number.prototype.replaceAll = function (s1, s2) {
    return GetNullToString(this).replace(new RegExp(s1, "gm"), s2);
};
String.prototype.getLen = function (p_bolMulti) {
    if ('undefined' == typeof p_bolMulti) {
        p_bolMulti = true;
    } else {
        p_bolMulti = false;
    }
    var len = 0;
    if (p_bolMulti) {
        for (var i = 0; i < this.length; ++i) {
            if (this.charCodeAt(i) > 127) {
                len += 3;
            } else {
                len++;
            }
        }
    } else {
        len = this.length;
    }
    return len;
};
String.prototype.chkLen = function (minLen, maxLen) {
    var strlen = this.getLen(this);
    if (strlen > maxLen || strlen < minLen) {
        return false;
    } else {
        return true;
    }
};
String.prototype.chkType = function (type) {
    /// <summary>字符串格式化验证</summary>
    /// <param name="type" type="String">验证类型，可选值number int url email idcard area money year input username cn phone mobile date minDate time</param>
    switch (type) {
        case 'number':
            return (/^[\+\-]?\d*?\.?\d*?$/).test(this);
        case 'int':
            return (/^-?[1-9][0-9]+$|^-?[0-9]$/).test(this);
        case 'url':
            return (/^https?:\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/).test(this);
        case 'email':
            return (/^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i).test(this);
        case 'idcard':
            return (/^[0-9]{15}$|^[0-9]{17}[a-zA-Z0-9]/).test(this);
        case 'area':
            return (/^\d+(\.\d{1,2})?$/).test(this);
        case 'money':
            return (/^\d+(\.\d{1,2})?$/).test(this);
        case 'year':
            return (/^(19|20)\d\d$/).test(this);
        case 'input':
            return (/^[\u4e00-\u9fa5A-Za-z0-9_\s\~\@\!\#\$\.\,\/\\\%\^\&\*\(\)_\+\?\>\<《〉》\:：〉、，。？！￥（）\{\}\[\]]+$/).test(this);
        case 'username':
            return (/^[\u4e00-\u9fa5]/).test(this);
        case 'cn':
            return (/^[\u4e00-\u9fa5]/).test(this);
        case 'phone':
            return (/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/).test(this);
        case 'mobile':
            return (/^\d{11,13}$/).test(this);
        case 'date':
            return (/^(\d{2,4})[\-\/](\d{1,2})[\-\/](\d{1,2})$/).test(this);
        case 'minDate':
            return (/^(\d{2,4})\-(\d{1,2})\-(\d{1,2})$/).test(this);
        case 'time':
            return (/^(\d{2,4})\-(\d{1,2})\-(\d{1,2}) ([0-1][0-9]|2[0-3]|^[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/).test(this);
    }
    return false;
};

/**jqGrid扩展*/
function transTime(c, o, r) {
    /// <summary>jqGrid用，格式化日期</summary>
    /// <param name="c" type="String">输入的日期字符串，支持/Date(****)类型的/</param>
    /// <returns>yy/M/d h格式字符串</returns>
    if (!c) {
        if (r)
            return "&nbsp;";
        else
            return "";
    }
    return transTimeBase(c, "yy/M/d h");
}
function transShortTime(c, o, r) {
    /// <summary>jqGrid用，格式化日期</summary>
    /// <param name="c" type="String">输入的日期字符串，支持/Date(****)类型的/</param>
    /// <returns>yy/M/d h:m格式字符串</returns>
    if (!c) {
        if (r)
            return "&nbsp;";
        else
            return "";
    }
    return transTimeBase(c, "yy-M-d h:m");
}
function transDateTime(c, o, r) {
    /// <summary>jqGrid用，格式化日期</summary>
    /// <param name="c" type="String">输入的日期字符串，支持/Date(****)类型的/</param>
    /// <returns>yyyy-MM-dd hh:mm格式字符串</returns>
    if (!c) {
        if (r)
            return "&nbsp;";
        else
            return "";
    }
    return transTimeBase(c, "yyyy-MM-dd hh:mm");
}
function transFullDateTime(c, o, r) {
    /// <summary>jqGrid用，格式化日期</summary>
    /// <param name="c" type="String">输入的日期字符串，支持/Date(****)类型的/</param>
    /// <returns>yyyy-MM-dd hh:mm:ss格式字符串</returns>
    if (!c) {
        if (r)
            return "&nbsp;";
        else
            return "";
    }
    return transTimeBase(c, "yyyy-MM-dd hh:mm:ss");
}
function transDate(c, o, r) {
    /// <summary>jqGrid用，格式化日期</summary>
    /// <param name="c" type="String">输入的日期字符串，支持/Date(****)类型的/</param>
    /// <returns>yyyy-M-d格式字符串</returns>
    if (!c) {
        if (r)
            return "&nbsp;";
        else
            return "";
    }
    return transTimeBase(c, "yyyy-M-d");
}
function transYearDate(c, o, r) {
    /// <summary>jqGrid用，格式化日期</summary>
    /// <param name="c" type="String">输入的日期字符串，支持/Date(****)类型的/</param>
    /// <returns>yyyy-M-d格式字符串</returns>
    if (!c) {
        if (r)
            return "&nbsp;";
        else
            return "";
    }
    return transTimeBase(c, "yyyy");
}
function transShortDate(c, o, r) {
    /// <summary>jqGrid用，格式化日期</summary>
    /// <param name="c" type="String">输入的日期字符串，支持/Date(****)类型的/</param>
    /// <returns>yy-MM-dd格式字符串</returns>
    if (!c) {
        if (r)
            return "&nbsp;";
        else
            return "";
    }
    return transTimeBase(c, "yy-MM-dd");
}
function transShortDateTime(c, o, r) {
    /// <summary>jqGrid用，格式化日期</summary>
    /// <param name="c" type="String">输入的日期字符串，支持/Date(****)类型的/</param>
    /// <returns>yy-MM-dd hh:mm格式字符串</returns>
    if (!c) {
        if (r)
            return "&nbsp;";
        else
            return "";
    }
    if (c == "") {
        return transTimeBase(c, "&nbsp;");
    }
    else {
        return transTimeBase(c, "yy-MM-dd hh:mm");
    }
}
function transHourAndMinTime(c, o, r) {
    /// <summary>jqGrid用，格式化时间</summary>
    /// <param name="c" type="String">输入的日期字符串，支持/Date(****)类型的/</param>
    /// <returns>hh:mm格式字符串</returns>
    if (!c) {
        if (r)
            return "&nbsp;";
        else
            return "";
    }
    return transTimeBase(c, "hh:mm");
}
function transTimeBase(c, format) {
    /// <summary>jqGrid用，格式化日期基函数，也用于其它地方</summary>
    /// <param name="c" type="String">输入的日期字符串，支持/Date(****)类型的/</param>
    /// <param name="format" type="String">格式化样式</param>
    /// <returns>yyyy-MM-dd hh:mm格式字符串</returns>
    if (!c) return "";
    if (c.indexOf("Date(") > -1) {
        var date_c;
        eval("date_c=new " + c.replaceAll("/", "") + ";");
        c = date_c.format(format);
    }
    else
        c = c.toDate().format(format);
    if (c.indexOf("NaN") > -1)
        return "";
    else
        return c;
}
function transPrice(c, o, r) {
    /// <summary>jqGrid用，格式化价格</summary>
    /// <param name="c" type="String">输入的价格</param>
    /// <returns>1位小数的金额</returns>
    return parseFloat(c).toFixed(1);
}
function transNull(c, o, r) {
    /// <summary>jqGrid用，格式化Null</summary>
    /// <param name="c" type="String">输入的字符串</param>
    /// <returns>如果null返回"&nbsp;"</returns>
    if (GetNullToString(c) == "")
        c = "&nbsp";
    return c;
}
function transDotFirst(c) {
    /// <summary>jqGrid用，处理逗号隔开的字符串</summary>
    /// <param name="c" type="String">输入的字符串</param>
    /// <returns>逗号隔开的字符串返回第一项</returns>
    if (!c) return "&nbsp;";
    if (c.indexOf(",") > -1)
        return c.split(',')[0];
    else
        return c;
}
/*数字字符串前面补充0
*/
pad = function () {
    var tbl = [];
    return function (num, n) {
        var len = n - num.toString().length;
        if (len <= 0) return num;
        if (!tbl[len]) tbl[len] = (new Array(len + 1)).join('0');
        return tbl[len] + num;
    }
}();
/**计算字符出现次数*/
String.prototype.getCount = function (str) {
    var ___r___ = new RegExp(str, 'gi');
    var g = this;
    return g.match(___r___).length;
    //return this;
};

/**全角字符转半角字符
**/
String.prototype.dbcToSbc = function () {
    var result = "";
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) == 12288) {
            result += String.fromCharCode(this.charCodeAt(i) - 12256);
            continue;
        }
        if (this.charCodeAt(i) > 65280 && this.charCodeAt(i) < 65375)
            result += String.fromCharCode(this.charCodeAt(i) - 65248);
        else
            result += String.fromCharCode(this.charCodeAt(i));
    }
    return result;
};
/**null等转成空字符串
*/
String.prototype.cleanNull = function () {
    if (this == undefined || this == null || this == "")
        return "";
    else
        return this;
}
//获取年的前两位
function getPrefixYear() {
    var y = (new Date()).getFullYear();
    return parseInt(y / 100);
}
//如果日期是14-2-2类型的，自动加上前缀，参数是日期字符串
function fixDatePrefix(date) {
    date = date.replace("-", "/");
    var _p = date.indexOf("/");
    var _year = date.substring(0, _p);
    if (_year.length == 2)
        date = getPrefixYear() + date;
    return date;
}
/**
字符串转成日期格式
*/
String.prototype.toDate = function () {
    if (!this) return "";
    var temp = this;
    if (temp.indexOf("Date(") > -1) {
        var date_c;
        eval("date_c=new " + temp.replaceAll("/", "") + ";");
        return date_c;
    }
    else {
        if (temp.indexOf('+') > -1)
            temp = this.replace("+", " ");
        if (temp.indexOf('T') > -1)
            temp = temp.replace('T', ' ');
        if (temp.indexOf('.') > -1)
            temp = temp.substring(0, this.indexOf('.'));
        if (temp.length > 19)
            temp = temp.substring(0, 19);
        temp = fixDatePrefix(temp);
        toDate = new Date(Date.parse(temp.replace(/-/g, "/")));
    }
    return toDate;
}
/**format使用示例
var result1 = template1.format("loogn", 22);
var result2 = template2.format({ name: "loogn", age: 22 });
*/
/*
格式化字符串函数
*/
String.prototype.format = function (args) {
    if (arguments.length > 0) {
        var result = this;
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key]);
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] == undefined) {
                    return "";
                }
                else {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
        return result;
    }
    else {
        return this;
    }
}
/*
字符串转Json格式数据
*/
$.par2Json = function (string, overwrite) {
    var obj = {}, pairs = string.split('&'), d = decodeURIComponent, name, value;
    $.each(pairs, function (i, pair) {
        pair = pair.split('=');
        name = d(pair[0]);
        value = d(pair[1]);
        obj[name] = overwrite || !obj[name] ? value : [].concat(obj[name]).concat(value);
    });
    return obj;
};

/**
格式化日期
*/
Date.prototype.format = function (format) {
    var o =
    {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

Date.daysBetween = function (DateOne, DateTwo) {
    /// <summary>计算时间差,One-Two</summary>
    /// <param name="DateOne">格式为yyyy-MM-dd的字符串</param>
    /// <param name="DateTwo">格式为yyyy-MM-dd的字符串</param>
    /// <returns>返回天数</returns>
    var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
    var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
    var OneYear = DateOne.substring(0, DateOne.indexOf('-'));

    var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
    var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
    var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));

    //var cha = ((Date.parse(OneYear + "-" + OneMonth + "-" + OneDay) - Date.parse(TwoYear + "-" + TwoMonth + "-" + TwoDay)) / 86400000);
    //var cha = new Date(OneYear + "-" + OneMonth + "-" + OneDay) - new Date(TwoYear + "-" + TwoMonth + "-" + TwoDay);
    var cha = new Date(OneYear, OneMonth - 1, OneDay) -
        new Date(TwoYear, TwoMonth - 1, TwoDay);
    return cha / 86400000;
};
Date.yearsBetween = function (DateOne, DateTwo) {
    /// <summary>计算年份差DateOne-DateTwo</summary>
    /// <param name="DateOne">格式为yyyy-MM-dd的字符串</param>
    /// <param name="DateTwo">格式为yyyy-MM-dd的字符串</param>
    /// <returns>返回年份差</returns>
    return (Date.daysBetween(DateOne, DateTwo) / 365).toFixed(1);
};
Date.prototype.DateAdd = function (strInterval, Number) {
    /// <summary>时间增</summary>
    /// <param name="strInterval">s秒 n分 h时 d天 w周 q季 m y</param>
    /// <returns>结果时间</returns>
    var dtTmp = this;
    switch (strInterval) {
        case 's': return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n': return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h': return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd': return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w': return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y': return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}
///某年月的最后一天，返回日期类型
function getLastDay(year, month) {
    var new_year = year;    //取当前的年份      
    var new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）      
    if (month > 12)            //如果当前大于12月，则年份转到下一年      
    {
        new_month -= 12;        //月份减      
        new_year++;            //年份增      
    }

    var new_date = new Date(new_year, new_month, 1);             //取当年当月中的第一天
    return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)); //获取当月最后一天日期      
}
///当月第一天，一个参数是日期，两个参数是年、月,返回日期格式
function getFirstDay(year, month) {
    if (arguments.length == 1) {
        var _date = year;
        year = _date.getFullYear();
        month = _date.getMonth() + 1;
    }


    var new_date = new Date(year, month - 1, 1);             //取当年当月中的第一天
    return new_date; //获取当月最后一天日期      
}
///处理safari的日期问题
function parseDate(input, format) {
    format = format || 'yyyy-MM-dd hh:mm:ss'; // default format
    var parts = input.match(/(\d+)/g),
      i = 0, fmt = {};
    // extract date-part indexes from the format
    format.replace(/(yyyy|dd|MM|hh|mm|ss)/g, function (part) { fmt[part] = i++; });

    return new Date(parts[fmt['yyyy']], parts[fmt['MM']] - 1, parts[fmt['dd']], parts[fmt['hh']], parts[fmt['mm']], parts[fmt['ss']]);
}
function getDayOfWeek(day) {
    // var day = new Date(Date.parse(dayValue.replace(/-/g, '/')));   //将日期值格式化 
    var today = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");  //创建星期数组
    return today[day.getDay()];   //返一个星期中的某一天，其中0为星期日 
}
function randomInt(x1, x2) {
    var min_int = parseInt(x1);
    var max_int = parseInt(x2);
    if (isNaN(min_int) || isNaN(max_int)) {
        alert('parameter error');
        return false;
    }

    x1 = Math.min(min_int, max_int);
    x2 = Math.max(min_int, max_int);

    return x1 + Math.floor(Math.random() * (x2 - x1 + 1));
}
/**
弹出对话框，参数：
标题 显示内容 宽 高 打开事件 确定事件 关闭事件
*/
function Dialog(winTitle, winAlert, width, height, openFunc, yesFunc, closeFunc) {
    /// <summary>淘汰方法，避免调用</summary>
    var winid = randomInt(1, 1000);

    $("<div id='win_dialog_" + winid + "'>" + winAlert + "</div>").appendTo("body");
    var $win = $("#win_dialog_" + winid);
    $win.dialog({
        autoOpen: true,
        bgiframe: true,
        width: width,
        height: height,
        position: 'center',
        draggable: true,
        resizable: false,
        title: winTitle,
        display: 'block',
        open: function (d) {
            if (openFunc != null) openFunc(d);
            var $dialog = $(this);
            var atext = $(".ui-dialog-titlebar-close").replaceWith('<p class="ui-xlgwr"> <span class="ui-icon ui-icon-extlink">extlink</span><span class="ui-icon ui-icon-closethick">close</span></p>');
            var isMax = false;
            $(".ui-xlgwr>span").click(function () {
                var spantext = $(this).text();
                if (spantext == "extlink") {
                    var myw, myh;
                    if (!isMax) {
                        myw = screen.availWidth - 25;   //定义一个myw，接受到当前全屏的宽
                        myh = screen.availHeight - 90;  //定义一个myw，接受到当前全屏的高
                    }
                    else {
                        myw = width;
                        myh = height;
                    }

                    $dialog.dialog({
                        position: 'center',
                        width: myw,
                        height: myh
                    });
                    if (!isMax) {
                        $("body").css("overflow-y", "hidden");
                    } else {
                        $("body").css("overflow-y", "auto");
                    }
                    isMax = !isMax;
                } else if (spantext == "close") {
                    $dialog.dialog("close");
                }
            });
        },
        close: function (event, ui) {
            if (closeFunc != null) closeFunc();
            $win.remove();
        }
    }).css("padding", "0px");//.css("line-height", "27px");

    $win.dialog("open");
}
function encodeHTML(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&gt;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "'");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
}
function html2txt(str, noEnter) {
    return str.replace(/<\/?.+?>/g, ""); //去掉所有的html标记
}
function decodeHTML(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/'/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
}
function GetNullToString(o) {

    if (o)
        return o + "";
    else
        return "";
    //if (o == undefined || o == null || o == "" || o == "undefined")
    //    return "";
    //else
    //    return o;
}
function GetNullToInt(o) {
    var returnval = 0;
    try {
        returnval = parseInt(o);
    } catch (e) {
    }

    if (typeof (returnval) != "number") {
        returnval = 0;
    }
    if (isNaN(returnval)) returnval = 0;
    return returnval;
}
function CreateWin(moduleName, winTitle, templateName, width, height,
    openFunc, yesFunc, notAdminDisabled, nonTemplateBodyStr, Model, YesDisableValidate, modal) {
    /// <summary>最常用的窗体类方法，加载时要加载模板html</summary>
    /// <param name="moduleName">模块名，一般以/开头根目录的某个文件夹名</param>
    /// <param name="winTitle">窗体标题</param>
    /// <param name="templateName">模板文件名，放在模块下的Templates文件夹里，htm结尾不需要带扩展名,.aspx要带扩展名</param>
    /// <param name="width" type="int"></param>
    /// <param name="height" type="int"></param>
    /// <param name="openFunc"></param>
    /// <param name="yesFunc"></param>
    /// <param name="notAdminDisabled"></param>
    /// <param name="nonTemplateBodyStr"></param>
    /// <param name="Model">1：关闭  0：确定 取消</param>
    /// <param name="YesDisableValidate">点击确定时的验证，是否无效</param>
    /// <param name="modal">是否模式窗口，默认否</param>
    /// <returns>无返回</returns>

    var fileName = templateName;
    if (fileName.indexOf(".aspx") < 0) fileName += ".htm";
    var isRoot = (moduleName.indexOf("/")) == 0;
    if (isRoot) moduleName = moduleName.substring(1, moduleName.length);
    var __path__ = "Templates/" + fileName;
    if (fileName.indexOf("?") > -1)
        __path__ += "&";
    else
        __path__ += "?";
    __path__ += "t=" + Math.random();
    if (isRoot) {
        if (templateName.indexOf("_") == 0)
            __path__ = "/" + __path__;
        else
            __path__ = "/" + moduleName + "/" + __path__;
    }
    if (templateName.indexOf(".") > -1) {
        templateName = templateName.substring(0, templateName.indexOf("."));
    }
    var __winId__ = "win_" + moduleName + "_" + templateName;
    if ($("#" + __winId__).height() != null) {
        return;
    }
    $("<div id='" + __winId__ + "'></div>").appendTo("body");
    var $win = $("#" + __winId__);
    var background_color;
    if (templateName) {
        $win.load(__path__, function () {
            var reg = /\[\!\-\-\{([^}]*?)\}\-\-\]/g;//模板处理
            if (reg.test($win.html())) {
                $win.html(replaceJsTemplate($win.html()));
            }
            loadedWin();
        });
    }
    else {
        $win.html(nonTemplateBodyStr);
        loadedWin();
    }
    if (!modal) modal = false;
    var loading = function () {
        $("#header").append("<img class='loading' src='/Images/Loading.gif' />");
        $(".ui-button").prop("disabled", true);
    };
    var unloading = function () {
        $(".loading").remove();
        $(".ui-button").prop("disabled", false);
    };
    var loadedWin = function () {
        $win.dialog({
            autoOpen: false,
            bgiframe: true,
            modal: modal,
            width: width,
            height: height,
            position: 'middle',
            draggable: true,
            resizable: false,
            title: winTitle,
            display: 'block',
            open: function (event, ui) {
                renderUserControls($win); //在main.js里定义
                openFunc(event, ui, $win);
                var $btnOk = $win.parent().find(".ui-button-text:eq(1)");
                var oldBtnString = $btnOk.text();
                var winButtonTimeOut = 1;
                $win.parent().find("button").prop("disabled", true);
                $btnOk.text("【" + winButtonTimeOut + "】");
                var winButtonTime = setInterval(function () {
                    winButtonTimeOut--;
                    $btnOk.text(winButtonTimeOut);
                    if (winButtonTimeOut == 0) {
                        $btnOk.text(oldBtnString);
                        $win.parent().find("button").prop("disabled", false);
                        clearInterval(winButtonTime);
                    }
                    else {
                        $btnOk.text("【" + winButtonTimeOut + "】");
                    }
                }, 1000);

                if (notAdminDisabled)
                    if ($ADMINLEVEL == 0) {
                        background_color = $(".ui-dialog input").css("background-color");
                        $(".ui-dialog input,.ui-dialog select,.ui-dialog textarea").attr("disabled", "disabled").css("border", "0px").css("background-color", "#f3f3f3");
                    }
                $win.height(height);
                $win.dialog("option", "position", "middle");
            },
            close: function (event, ui) {
                if (notAdminDisabled)
                    if ($ADMINLEVEL == 0) {
                        $(".ui-dialog input,.ui-dialog select,.ui-dialog textarea").removeAttr("disabled").css("border", "1px").css("background-color", background_color);
                    }
                $win.dialog("close");
                $win.remove();
            }
        }).css("padding", "0px");//.css("line-height", "27px");
        //renderUserControls($win);
        if (Model == 1) {
            $win.dialog({
                buttons: {
                    "关闭": function () {
                        rollbackClose(true);
                    }
                }
            });
        }
        else {
            $win.dialog({
                buttons: {
                    "确定": function () {
                        loading();
                        ///有效性验证
                        if (!YesDisableValidate) {
                            var isPass = true;
                            isPass = $win.validate();
                            if (!isPass) {
                                unloading();
                                return false;
                            }
                        }
                        var _result_ = yesFunc(rollbackClose);
                    }, "取消": function () {
                        rollbackClose(true);
                    }
                }
            });
        }
        $win.dialog("open");
        //获取该input或radio或select的 前面的标签文本值,主要判断布局是TD布局还是元素普通布局
        function getFormParentLabelText(_this) {
            var _templabeltext = "";
            if (_this.parent().get(0).tagName == 'TD')
                _templabeltext = _this.parent().prev().text();
            else
                _templabeltext = _this.prev().text();
            return _templabeltext;
        }
        function rollbackClose(isClose) {
            unloading();
            if (isClose == null)
                $win.dialog("close");
            else if (isClose)
                $win.dialog("close");
        }
    }
}
/**
下拉框操作
*/
jQuery.fn.size = function () {
    var ______i = 0;
    $(this).find("option").each(function () {
        ______i++;
    });
    return ______i;
}
//获得选中项的索引   
jQuery.fn.getSelectedIndex = function () {
    return jQuery(this).get(0).selectedIndex;
}
//获得当前选中项的文本
jQuery.fn.getSelectedText = function () {
    if (this.size() == 0) { } // return "下拉框中无选项";
    else {
        var index = this.getSelectedIndex();
        if (index < 0) return;
        return jQuery(this).get(0).options[index].text;
    }
}
//获得当前选中项的值
jQuery.fn.getSelectedValue = function () {
    if (this.size() == 0)
        // return "下拉框中无选中值";
    { }
    else
        return jQuery(this).val();
}
//设置select中值为value的项为选中   
jQuery.fn.setSelectedValue = function (value) {
    jQuery(this).get(0).value = value;
}
//设置select中文本为text的第一项被选中   
jQuery.fn.setSelectedText = function (text) {
    var isExist = false;
    var count = this.size();
    for (var i = 0; i < count; i++) {
        if (jQuery(this).get(0).options[i].text == text) {
            jQuery(this).get(0).options[i].selected = true;
            isExist = true;
            break;
        }
    }
    if (!isExist) {
        //        alert("下拉框中不存在该项");
    }
}
//设置选中指定索引项   
jQuery.fn.setSelectedIndex = function (index) {
    var count = this.size();
    if (index >= count || index < 0) {
        //        alert("选中项索引超出范围");
    }
    else {
        jQuery(this).get(0).selectedIndex = index;
    }
}
//判断select项中是否存在值为value的项   
jQuery.fn.isExistItem = function (value) {
    var isExist = false;
    var count = this.size();
    for (var i = 0; i < count; i++) {
        if (jQuery(this).get(0).options[i].value == value) {
            isExist = true;
            break;
        }
    }
    return isExist;
}
//向select中添加一项，显示内容为text，值为value,如果该项值已存在，则提示   
jQuery.fn.addOption = function (text, value) {
    /// <summary>Select下拉列表的最后增加选项</summary>
    /// <param name="text">标签文本</param>
    /// <param name="value">值</param>
    /// <returns>无返回</returns>
    if (this.isExistItem(value)) {
        //        alert("待添加项的值已存在");
    }
    else {
        jQuery(this).get(0).options.add(new Option(text, value));
    }
    return jQuery(this);
}
jQuery.fn.addOptionIndex = function (text, value, index) {
    /// <summary>Select下拉列表的某位置增加选项</summary>
    /// <param name="text">标签文本</param>
    /// <param name="value">值</param>
    /// <param name="index" type="int">从0开始计算</param>
    /// <returns>无返回</returns>
    $("<option value=" + value + ">" + text + "</option>").insertAfter(jQuery(this).find("option[value='" + index + "']"));
}
jQuery.fn.addOptionPosition = function (text, value, Position) {
    $("<option value=" + value + ">" + text + "</option>").insertBefore(jQuery(this).get(0).options[Position]);
}
//删除select中值为value的项，如果该项不存在，则提示   
jQuery.fn.removeItem = function (value) {
    if (this.isExistItem(value)) {
        var count = this.size();
        for (var i = 0; i < count; i++) {
            if (jQuery(this).get(0).options[i].value == value) {
                jQuery(this).get(0).remove(i);
                break;
            }
        }
    }
    else {
        //        alert("待删除的项不存在!");
    }
}
//删除select中指定索引的项   
jQuery.fn.removeIndex = function (index) {
    var count = this.size();
    if (index >= count || index < 0) {
        //        alert("待删除项索引超出范围");
    }
    else {
        jQuery(this).get(0).remove(index);
    }
}
//删除select中选定的项   
jQuery.fn.removeSelected = function () {
    var index = this.getSelectedIndex();
    this.removeIndex(index);
}
//清除select中的所有项   
jQuery.fn.clearAll = function () {
    jQuery(this).get(0).options.length = 0;
}
jQuery.fn.extend({
    validate: function () {
        var $form = $(this);
        var isPass = true;
        $form.find(".need").each(function (k, v) {
            var $_this = $(v);
            var _templabel = "";
            var $_this = $(this);
            switch ($_this.get(0).tagName) {
                case "LABEL": //单选按钮
                    if (!$("input[name='" + $_this.find("input").attr("name") + "']:checked").val()) {
                        _templabel = getFormParentLabelText($_this);
                        if (!$_this.attr("title")) $_this.attr("title", "请检查" + _templabel + "内容!");
                        $_this.tooltip().tooltip("open");
                        isPass = false;
                        $_this.focus();
                        return false;
                    }
                    break;
                case "TEXTAREA":
                    if ($_this.val() == "") {
                        _templabel = getFormParentLabelText($_this);
                        if (!$_this.attr("title")) $_this.attr("title", "请检查" + _templabel + "内容!");
                        $_this.tooltip().tooltip("open");
                        isPass = false;
                        $_this.focus();
                        return false;
                    }
                    break;
                case "INPUT":
                    var _name = $_this.attr("name");

                    switch (($_this).attr("type")) {
                        case "radio":
                            if (_name) {
                                if (!$("input[name=" + _name + "]:checked").length) {
                                    if (!$_this.attr("title")) $_this.attr("title", "请检查" + _templabel + "内容!");
                                    $_this.tooltip().tooltip("open");
                                    isPass = false;
                                    $_this.focus();
                                    return false;
                                }
                            }
                            break;
                        case "checkbox":
                            if (_name) {
                                if (!$("input[name=" + _name + "]:checked").length) {
                                    if (!$_this.attr("title")) $_this.attr("title", "请检查" + _templabel + "内容!");
                                    $_this.tooltip().tooltip("open");
                                    isPass = false;
                                    $_this.focus();
                                    return false;
                                }
                            }
                            break;
                        default:
                            if (!$_this.val().trim()) {
                                _templabel = getFormParentLabelText($_this);
                                if (!$_this.attr("title")) $_this.attr("title", "请检查" + _templabel + "内容!");
                                $_this.tooltip().tooltip("open");
                                isPass = false;
                                $_this.focus();
                                return false;
                            }
                            break;
                    }
                    break;
                case "SELECT":
                    if ($_this.val() == "") {
                        _templabel = getFormParentLabelText($_this);
                        if (!$_this.attr("title")) $_this.attr("title", "请检查" + _templabel + "内容!");
                        $_this.tooltip().tooltip("open");
                        isPass = false;
                        $_this.focus();
                        return false;
                    }
                    break;
            }
        });
        if (!isPass) return false;
        //有效性验证
        ///有效性验证
        $form.find("input[type='text'][validate!='']").each(function (k, v) {
            var $_this = $(v);
            if ($_this.val() != "" && $_this.attr("validate")) {
                if (!$_this.val().chkType($_this.attr("validate"))) {
                    var _templabel = getFormParentLabelText($_this);
                    if (!$_this.attr("title")) $_this.attr("title", "请检查" + _templabel + "内容!");
                    $_this.tooltip().tooltip("open");
                    $_this.select();
                    isPass = false;
                    return false;
                }
                ///todo:数字关联验证
                if ($_this.attr("validate") == "number" || $_this.attr("validate") == "int") {
                    var _templabel = getFormParentLabelText($_this);
                    var _tempmin = $_this.attr("min");
                    var _tempmax = $_this.attr("max");
                    if (_tempmin) {
                        if ($_this.val() < parseFloat(_tempmin)) {
                            if (!$_this.attr("title")) $_this.attr("title", "{0}不得小于：{1}".format(_templabel, _tempmin));
                            $_this.tooltip().tooltip("open");
                            isPass = false;
                            return false;
                        }
                    }
                    if (_tempmax) {
                        if ($_this.val() > parseFloat(_tempmax)) {
                            if (!$_this.attr("title")) $_this.attr("title", _templabel + "最大值为：" + _tempmax);
                            $_this.tooltip().tooltip("open");
                            isPass = false;
                            return false;
                        }
                    }

                }
            }
        });
        if (!isPass)
            return false;
        else
            return true;
        //获取该input或radio或select的 前面的标签文本值,主要判断布局是TD布局还是元素普通布局
        function getFormParentLabelText(_this) {
            var _templabeltext = "";
            if (_this.parent().parent().get(0).tagName == 'TD')
                _templabeltext = _this.parent().parent().prev().text();
            else
                _templabeltext = _this.prev().text();
            return _templabeltext;
        }
    }
});
/**
数组操作*/
Array.prototype.max = function () {
    return Math.max.apply({}, this)

}
Array.prototype.min = function () {
    return Math.min.apply({}, this)

}
//去掉重复项
Array.prototype.unique = function () {
    var hash = {};
    for (var i = 0, j = 0; i < this.length; i++) {
        if (this[i] !== undefined) {
            if (!hash[this[i]]) {
                this[j++] = this[i];
                hash[this[i]] = true;
            }
        }
    }
    this.length = j;
    return this;
};
Array.prototype.clone = function () {//为数组添加克隆自身方法，使用递归可用于多级数组
    var newArr = new Array();
    for (var i = 0; i <= this.length - 1; i++) {
        var itemi = this[i];
        if (itemi.length && itemi.push) itemi = itemi.clone();//数组对象，进行递归
        else if (typeof (itemi) == "object") itemi = objClone(itemi);//非数组对象，用上面的objClone方法克隆
        newArr.push(itemi);
    }
    return newArr;
};
Array.prototype.insertAt = function (index, value) {
    var part1 = this.slice(0, index);
    var part2 = this.slice(index);
    part1.push(value);
    return (part1.concat(part2));
};
///是否包含
Array.prototype.indexOf = function (value) {
    for (var __jj__ = 0; __jj__ < this.length; __jj__++) {
        if (this[__jj__] == value) {
            return __jj__;
            break;
        }
    }
    return -1;
};
Array.prototype.del = function (n) {
    if (n < 0)//如果n<0，则不进行任何操作。
        return this;
    else
        return this.slice(0, n).concat(this.slice(n + 1, this.length));
}
//*/
function QueryString() {
    var name, value, i;
    var str = location.href;
    var num = str.indexOf("?");
    str = str.substr(num + 1);
    str = str.replace("#", "&");
    var arrtmp = str.split("&");
    for (i = 0; i < arrtmp.length; i++) {
        num = arrtmp[i].indexOf("=");
        if (num > 0) {
            name = arrtmp[i].substring(0, num); value = arrtmp[i].substr(num + 1);
            this[name] = value
        }
    }
}
var SiteTracker = function () {
    var _q = new QueryString();
    this.q = _q;    //地址栏参数
    var _tempP = GetNullToInt(_q.p);
    var strUrl = window.location.href;
    var arrUrl = strUrl.split("/");
    var strPage = arrUrl[arrUrl.length - 1];
    this.module = arrUrl[arrUrl.length - 2];
    arrUrl = strPage.split(".");
    this.action = arrUrl[0];
    this.path = "/" + this.module + "/" + this.action;
}
var siteTracker = new SiteTracker();
/**Cookie*/
function GetCookieVal(offset) { var endstr = document.cookie.indexOf(";", offset); if (endstr == -1) endstr = document.cookie.length; var returnvalue = unescape(document.cookie.substring(offset, endstr)); returnvalue = (returnvalue == null || returnvalue == '') ? null : returnvalue; return returnvalue; } function SetCookie(sName, sValue, oExpires, sPath, sDomain, bSecure) {
    var sCookie = sName + "=" + (sValue); if (oExpires) { sCookie += "; expires=" + oExpires.toGMTString(); } else
        sCookie += "; expires=Tuesday, 01-Dec-2050 12:00:00 GMT"; if (sPath) { sCookie += "; path=" + sPath; } if (sDomain) { sCookie += "; domain=" + sDomain; } if (bSecure) { sCookie += "; secure"; } document.cookie = sCookie;
} function DelCookie(name) {
    var exp = new Date(); exp.setTime(exp.getTime() - 1); var cval = GetCookie(name); if (cval != "" || cval != null) document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString(); else
        return;
} function GetCookie(name) { var arg = name + "="; var alen = arg.length; var clen = document.cookie.length; var i = 0; while (i < clen) { var j = i + alen; if (document.cookie.substring(i, j) == arg) return GetCookieVal(j); i = document.cookie.indexOf(" ", i) + 1; if (i == 0) break; } return null; } function GetCookieKey(name, key) { var myCookie = GetCookie(name); if (myCookie == null) return null; var clen = myCookie.length; var myCookies = myCookie.split("&"); var item; for (var i = 0; i < myCookies.length; i++) { item = myCookies[i].split("="); if (item[0] == key) { return item[1]; break; } } return ""; }
function xtraAlert(xtraText, type) {
    /// <summary>封装的弹出提示框</summary>
    /// <param name="xtraText" type="string">提示文本</param>
    /// <param name="type" type="string">可选值：alert success error information</param>
    /// <returns>无返回</returns>
    if (type)
        type = type.toLocaleLowerCase();
    if (type == 'alert') {
        noty({
            text: xtraText,
            type: 'alert',
            timeout: 2000,
            layout: 'center'
        });
    } else if (type == 'success') {
        noty({
            text: xtraText,
            type: 'information',
            timeout: 2000,
            layout: 'center'
        });
    } else if (type == 'error') {
        noty({
            text: xtraText,
            type: 'error',
            timeout: 2000,
            layout: 'center'
        });

    } else {
        noty({
            text: xtraText,
            type: 'information',
            timeout: 2000,
            layout: 'center'
        });
    }
}
(function ($) {
    /// <summary>数据绑定，Grid事件，模板使用[!----]</summary>
    /// <param name=""></param>
    /// <returns>无返回</returns>
    $.fn.xGrid = function (options) {
        var opts = $.extend({}, $.fn.xGrid.defaults, options);
        opts.TemplateId = $(this);
        $.fn.xGrid.load(opts);
    }
    $.fn.xGrid.defaults = {
        TemplateId: null,   //jQuery选择器，表格放在这个选择器的元素里，不用赋值，内部使用
        Template: "",       //模板页文件位置
        TemplateBody: "",    //模板页内容,如果设置了就不会从Template加载模板页
        rows: 20,           //每页多少条
        Url: "",            //数据源
        Data: { page: 1, rows: 20, sidx: '', sord: '' },
        Pager: null,        //分页位置选择器
        onLoad: null,       //显示完数据要执行的函数
        Filter: null
    };
    $.fn.xGrid.load = function (options) {
        if (options.TemplateBody) {
            $.fn.xGrid.render(options, options.TemplateBody);
        }
        else {
            options.TemplateId.css("display", "none");
            options.TemplateId.load(options.Template, function () {
                var _template = options.TemplateId.html();
                $.fn.xGrid.render(options, _template);

            });
        }
    }
    $.fn.xGrid.render = function (options, _template) {
        $.ajax({
            type: "get",
            url: options.Url,
            dataType: "json",
            contentType: "application/json;utf-8",
            data: options.Data,
            success: function (data) {
                if (options.Filter) {
                    data = options.Filter(data);
                }
                var rows = loadFilter(data).rows;
                var Records = data.d.Records;
                var Total = data.d.Total;
                var Page = data.d.Page;
                if (options.Pager) {
                    options.Pager.empty();
                    if (Page > 1) {
                        options.Pager.append("<li><a href='javascript:;'>首页</a></li>");
                        options.Pager.append("<li><a href='javascript:;'>&laquo;</a></li>");
                    }
                    var beginPage = Page - 3;
                    var endPage = Page + 3;
                    if (beginPage < 1) beginPage = 1;

                    if (endPage - beginPage < 6) endPage = beginPage + 6;
                    if (endPage > Total) endPage = Total;
                    if (endPage - beginPage < 6) beginPage = endPage - 6;
                    if (beginPage < 1) beginPage = 1;

                    for (var _p = beginPage; _p <= endPage; _p++) {
                        options.Pager.append("<li {0}><a href='javascript:;'>{1}</a></li>".format(_p == Page ? "class='active'" : "", _p));
                    }
                    if (Page < Total) {
                        options.Pager.append("<li><a href='javascript:;'>&raquo;</a></li>");
                        options.Pager.append("<li><a href='javascript:;'>尾页</a></li>");
                    }

                    $(".pagination li").click(function () {
                        var _click = $(this).text();
                        if (_click.chkType("int")) {
                            options.Data.page = parseInt(_click);
                        } else {
                            if (_click == "«") {
                                options.Data.page--;
                            }
                            else if (_click == "»") {
                                options.Data.page++;
                            }
                            else if (_click == "尾页") {
                                options.Data.page = Total;
                            }
                            else if (_click == "首页") {
                                options.Data.page = 1;
                            }
                        }
                        $.fn.xGrid.load(options);
                    });
                }
                var _html = "";
                $.map(rows, function (item, index) {
                    var _temp = _template;
                    var reg = /\[\!\-\-\{([^}]*?)\}\-\-\]/g;

                    if (!_temp) return false;
                    var _temp1 = _temp.replace(reg, function ($1, $2) {
                        var _result = "";
                        eval("_result=" + $2.replace("&gt;", ">").replace("&lt;", "<"));
                        return _result;
                    });
                    _html += _temp1;
                });
                options.TemplateId.html(_html);
                options.TemplateId.fadeIn(500);
                renderUserControls(options.TemplateId);
                if (options.onLoad) {
                    options.onLoad(options.TemplateId);
                }
            }
        });
    }
})(jQuery);
(function ($) {
    $.fn.xBindData = function (options) {
        /// <summary>给select绑定service数据源</summary>
        /// <returns>无返回</returns>
        var opts = $.extend({}, $.fn.xGrid.defaults, options);
        $.fn.xBindData.load(this, opts);
    }
    $.fn.xBindData.defaults = { "url": "", "text": "", "value": "", "data": "", "async": true };
    $.fn.xBindData.load = function (_control, options) {
        $.ajax({
            type: "get",
            url: options.url,
            dataType: "json",
            contentType: "application/json;utf-8",
            data: options.data,
            success: function (data) {
                var rows = loadFilter(data).rows;
                _control.find("option:gt(0)").remove();
                $.map(rows, function (item) {
                    _control.addOption(item[options.text], item[options.value]);
                });
                if (_control.attr("value1")) {
                    _control.val(_control.attr("value1"));
                } else if (_control.attr("value")) {
                    _control.val(_control.attr("value"));
                }
                if (_control.hasClass("form-select")) {
                    _control.selectpicker("refresh");
                }
            },
            async: options.async
        });
    }
})(jQuery);
function clearHtml(str) {
    return str.replace(/<[^>]+>/g, "");
}
function callPageRender() {
    /// <summary>调用某个页面上的render()方法,可以有多个参数,格式为模块-方法，即目录名-文件名</summary>
    /// <returns>无返回</returns>
    for (var _i = 0; _i < arguments.length; _i++) {
        var _item = arguments[_i];
        if ('undefined' != typeof window[_item]) {
            if (window[_item].render)
                window[_item].render();
        }
    }
}
function getRemoteObject(url, data, async, callback) {
    /// <summary>从服务器同步获取一个对象</summary>
    /// <param name="url" type="String">Service地址</param>
    /// <param name="data" type="String">请求数据</param>
    /// <returns></returns>
    var _tempobj = {};
    if (typeof (async) == 'undefined') async = false;
    $.ajax({
        type: "get",
        url: url,
        dataType: 'json',
        data: data,
        contentType: "application/json;utf-8",
        success: function (data) {
            _tempobj = data.d;
            if (callback) callback(_tempobj);
        }, async: async
    });
    return _tempobj;
}
function getRemoteRows(url, data, async, callback) {
    /// <summary>从服务器同步获取一个rows</summary>
    /// <param name="url" type="String">Service地址</param>
    /// <param name="data" type="Json对象">请求数据</param>
    /// <returns></returns>
    if ('undefined' == typeof (async)) async = false;
    var _rows = [];
    $.ajax({
        type: "get",
        url: url,
        dataType: 'json',
        data: data,
        contentType: "application/json;utf-8",
        success: function (data) {
            _rows = loadFilter(data).rows;
            if (callback)
                callback(_rows);
        }, async: async
    });
    return _rows;
}
function rowsToObj(rows, key) {
    /// <summary>数组转成以key为键值的数组</summary>
    /// <returns>返回对象</returns>
    var obj = {};
    $.map(rows, function (item) {
        obj[item[key]] = item;
    });
    return obj;
}
/// <summary>模板替换</summary>
/// <param name="_template"></param>
/// <returns>返回替换后的</returns>
function replaceJsTemplate(_template) {
    //模板替换
    var _temp = _template;
    var reg = /\[\!\-\-\{([\s\S]*?)\}\-\-\]/g;
    var _temp1 = _temp.replace(reg, function ($1, $2) {
        var _result = "";
        var _js = $2.replace("&gt;", ">").replace("&lt;", "<");
        eval("_result=" + _js);
        return _result;
    });
    return _temp1;
}
(function ($) {
    $.fn.fillForm = function (options) {
        /// <summary>用Json对象给表单赋值</summary>
        /// <param name="options">{ params: {}, url: '', data: {}, filter: null, after: null }</param>
        /// <returns>无返回</returns>
        var defaults = { params: {}, url: '', data: {}, filter: null, after: null };
        var opts = $.extend(defaults, options);
        var $form = this;

        if ((!!opts.url) && (!!opts.data)) {
            $.ajax({
                type: "get",
                url: opts.url,
                dataType: "json",
                contentType: "application/json;utf-8",
                data: opts.data,
                success: function (data) {
                    opts.params = data.d;
                    if (opts.filter) {
                        opts.params = opts.filter(opts.params);
                    }
                }, async: false
            });
        }
        if (opts.params) {
            window[$($form[0]).attr("name")] = opts.params;
            $form.find("*").each(function (i, item) {
                if ($(item).is("input") || $(item).is("select") || $(item).is("textarea") || $(item).is("img")) {
                    var name = $(item).attr("name");
                    var val = opts.params[name];

                    if (val) {
                        val = val + "";
                        if (!$(item).is("textarea")) {
                            if (/Date\(\-?\d*\)/.test(val)) {
                                val = val.toDate().format("yyyy-MM-dd");
                            }
                        }
                        //val = val.replace(/\+/g, "");//2014-5-6,在AddBI_Items.js，这一句影响对textarea的同赋值
                        if ($(item).is("input")) {
                            switch ($(item).attr("type")) {
                                case "text":
                                    $(item).val(val);
                                    break;
                                case "hidden":
                                    $(item).val(val);
                                    break;
                                case "radio":
                                    $(item).each(function (k, v) {
                                        if ($(v).val() == val) {
                                            $(v).prop("checked", true);
                                        }
                                    });
                                    break;
                                case "checkbox":
                                    $(item).each(function (k, v) {
                                        var vals = val.split(',');
                                        for (var j = 0; j < vals.length; j++) {
                                            if ($(v).val() == vals[j]) {
                                                $(v).prop("checked", true);
                                                break;
                                            }
                                        }
                                    });
                                    break;
                            }
                        }
                        else if ($(item).is("select")) {
                            if (val.chkType("int")) {
                                $(item).val(parseInt(val));
                            } else
                                $(item).val(val);
                            $(item).attr("value", val).attr("value1", val);
                            $(item).find("option[value='" + val + "']").prop("selected", true);
                            if ($(item).hasClass("form-select")) {
                                $(item).selectpicker("refresh");
                            }
                        }
                        else if ($(item).is("textarea")) {
                            ///以下代码，配合 KindEditor使用
                            if ($(item).prev().hasClass("ke-container")) {
                                if ('undefined' != typeof KindEditor) {
                                    var __id__ = $(item).attr("id");
                                    if (!$(item).attr("id")) {
                                        __id__ = parseInt(Math.random() * 10000);
                                        $(item).attr("id", __id__)
                                    }
                                    KindEditor.ready(function (K) {
                                        for (var k = 0; k < K.instances.length; k++) {
                                            var editor = K.instances[k];
                                            if ($(editor.options.srcElement).attr("id") == __id__) {
                                                editor.html(val);
                                                editor.sync();
                                                break;
                                            }
                                        }
                                    });
                                }
                            } else {
                                $(item).val(val);
                            }
                        }
                        else if ($(item).is("img")) {
                            $(item).attr("src", val);
                        }
                    }
                } else if ($(item).is("a")) {
                    if ($(item).attr("name")) {
                        var _href = $(item).attr("href") || '';
                        _href = replaceJsTemplateInner(_href);
                        $(item).attr("href", _href);

                        var _arg = $(item).attr("arg0") || '';
                        _arg = replaceJsTemplateInner(_arg);
                        $(item).attr("arg0", _arg);


                    }
                }
                else if ($(item).text().indexOf("[!--") > -1) {
                    var _html = $(item).html();
                    _html = replaceJsTemplate(_html);
                    $(item).html(_html);
                }
                else if ($(item).attr("data-val")) {
                    var _property = $(item).attr("data-val");
                    var _result = "";
                    eval("_result=" + _property);
                    $(item).html(_result);
                }
            });

            function replaceJsTemplateInner(_template) {
                //模板替换
                var _temp = _template;
                var reg = /\[\!\-\-\{([^}]*?)\}\-\-\]/g;
                var _temp1 = _temp.replace(reg, function ($1, $2) {
                    var _result = "";
                    eval("_result=" + $2.replace("&gt;", ">").replace("&lt;", "<"));
                    return _result;
                });
                return _temp1;
            }
        }
        if (opts.after) {
            opts.after(opts.params);
        }
    }
})(jQuery);
var Interface = function (name, methods) {
    /// <summary>Interface定义</summary>
    /// <param name="name"></param>
    /// <param name="methods"></param>
    /// <returns></returns>
    if (arguments.length != 2) {
        throw new Error("the interface length is bigger than 2");
    }
    this.Name = name;
    this.Method = [];
    for (var i = 0; i < methods.length; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error("the method name is not string");
        }
        this.Method.push(methods[i]);
    }
}
/*static method in interface*/
Interface.ensureImplement = function (object) {
    if (arguments.length < 2) {
        throw new Error("there is not Interface or the instance");
    }

    for (var i = 1; i < arguments.length; i++) {
        var interface1 = arguments[i];
        if (interface1.constructor !== Interface) {
            throw new Error("the argument is not interface");
        }
        for (var j = 0; j < interface1.Method.length; j++) {
            var method = interface1.Method[j];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error("you instance doesn't implement the interface");

            }
        }
    }
}
function fixedNumber(c) {
    //c = c * 100;
    c = parseFloat(c);
    //c = c / 100;
    if (c < 10) c = '0000000000' + c;
    else if (c < 100) c = '000000000' + c;
    else if (c < 1000) c = '00000000' + c;
    else if (c < 10000) c = '0000000' + c;
    else if (c < 100000) c = '000000' + c;
    else if (c < 1000000) c = '00000' + c;
    else if (c < 10000000) c = '0000' + c;
    else if (c < 100000000) c = '000' + c;
    else if (c < 1000000000) c = '00' + c;
    else if (c < 10000000000) c = '0' + c;
    return c;
}
function transFloat(c, dot) {
    if (!c) return 0;
    if (typeof c == 'undefined') return 0;
    if (c == 'undefined') return 0;
    var r = 0;
    try {
        r = c.toFixed(dot);
    } catch (e) {
    }
    return r;
}
function require(path, callback) {
    if (!window['scripts']) {
        window['scripts'] = {};
    }
    if (window['scripts'][path]) {
        callback();
    }
    else {
        $.getScript(path, function () {
            window['scripts'][path] = 1;
            callback();
        });
    }
}
