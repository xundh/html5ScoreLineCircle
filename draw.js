(function () {
    $.fn.drawLineCircle = function (options) {
        /// <summary>用画评分图</summary>
        /// <param name="options">{ }</param>
        /// <returns>无返回</returns>
        var defaults = {
            params: {}, radius: 90, width: 360, height: 200, border: 'border:0px solid #424533',
            circleBackCorlor: '#F7F7F7', fontColor: '#000000', textPaddingLine: -7, lineColor: "#CBCBCB", uom: '分',
            valuePaddingLine: 13, valueFillColor: '#88C276', titleFont: '14px 微软雅黑 bold', valueFont: '14px 宋体'
        };
        var opts = $.extend(defaults, options);
        var $this = this;
        var pointsOnCircle = [];//圆周上的点
        var pointsBranchEnd = [];//每条线终端
        var ctx;        //画布
        var center;     //圆心
        if (!opts.params) return;

        init();         //初始化画布
        render();       //加载数值

        function init() {
            //初始化画布
            $this.append("<canvas id=\"myCanvas\" width={0} height={1} style='{2}'></canvas>".format(opts.width, opts.height, opts.border));
            ctx = $("#myCanvas")[0].getContext("2d");
            center = { x: opts.width / 2, y: opts.height / 2 };
            //画圆
            drawCircle(center, opts.radius);
            ctx.lineWidth = "1";
            //计算出圆周上的点位置，同时画出半径线及分支线
            var angles = []; var left = 0; var right = opts.width;
            var perAngle = 2 * Math.PI / opts.data.length; //每一个角度
            for (var i = 0; i < 8; i++) {
                angles.push(perAngle / 2 + perAngle * i);
                var _point = getPointByAngle(center, angles[i])
                pointsOnCircle.push(_point);
                drawLine(center, _point);
                var _to = { x: 0, y: _point.y };
                if (_point.x > center.x) _to.x = right; else _to.x = left;
                pointsBranchEnd.push(_to);
                drawLine(_point, _to);
            }
            ctx.closePath();
        }
        function render() {
            var valuePoints = [];
            $.map(opts.data, function (item, k) {
                drawText(pointsBranchEnd[k], item.title);
                var _tempPoint = getPointOnLine(k, item.value);
                valuePoints.push(_tempPoint);
            });
            drawPolygon(valuePoints);
            $.map(opts.data, function (item, k) {
                drawValue(pointsBranchEnd[k], item.value, k);
            });
        }

        //基础函数
        function drawPolygon(points) {
            ctx.beginPath();
            $.map(points, function (item, k) {
                if (k == 0)
                    ctx.moveTo(item.x, item.y);
                else
                    ctx.lineTo(item.x, item.y);
            });
            ctx.fillStyle = opts.valueFillColor;
            ctx.lineTo(points[0].x, points[0].y);
            ctx.fill();
            ctx.closePath();
        }
        function getPointOnLine(k, value) {
            //计算多变形端点,value示例：75，不要除以100
            var end = pointsOnCircle[k];
            var _x = center.x + (end.x - center.x) * value / 100;
            var _y = center.y + (end.y - center.y) * value / 100;
            return { x: _x, y: _y };
        }
        function getPointByAngle(center, angle) {
            //计算一个角度的点位置
            var result = { x: center.x + opts.radius * Math.cos(angle), y: center.y + opts.radius * Math.sin(angle) };
            return result;
        }
        function drawValue(point, text, k) {
            //分值画到画板上
            ctx.beginPath();
            ctx.fillStyle = opts.fontColor;
            ctx.font = opts.valueFont;
            if (point.x > center.x) {
                ctx.fillText(text + " " + opts.uom, point.x - 42, point.y + opts.valuePaddingLine); //42是实验出来数值
            } else {
                ctx.fillText(text + " " + opts.uom, point.x + (pointsOnCircle[k].x - point.x) * 1.8 / 3, point.y + opts.valuePaddingLine);
            }
            ctx.closePath();
        }
        function drawText(point, text) {
            //标签画到画板上
            ctx.beginPath();
            ctx.fillStyle = opts.fontColor;
            ctx.font = opts.titleFont;
            if (point.x > center.x) {
                ctx.fillText(text, point.x - 14 * 5, point.y + opts.textPaddingLine); //5是标签最大字数，14是默认字体大小
            } else
                ctx.fillText(text, point.x, point.y + opts.textPaddingLine);
            ctx.closePath();
        }
        function drawLine(from, to) {
            ctx.beginPath();
            ctx.strokeStyle = opts.lineColor;
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
            ctx.closePath();
        }
        function drawCircle(center, radiu) {
            ctx.beginPath();
            ctx.arc(center.x, center.y, opts.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = opts.circleBackCorlor;
            ctx.fill();
            ctx.closePath();
        }
    }
})();
