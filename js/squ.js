// 矩形类(用于绘制) 
// 左上角的x,y坐标,及矩形的边长,水平方向的速度,垂直方向的速度
function Squ(x, y, len, color, sx, sy) {
    if (this === window) return new Squ(x, y, len, color, sx, sy)
    this.x = x
    this.y = y
    this.len = len
    this.color = color
    this.sx = sx
    this.sy = sy
}
Squ.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.len, this.len)
}
Squ.prototype.decay = function () {
    // 裂开个数
    var sonNum = Math.floor(Math.random() * 5)
    // 颜色亮度减低
    var colorData = {
        R: parseInt(this.color.slice(1, 3), 16),
        G: parseInt(this.color.slice(3, 5), 16),
        B: parseInt(this.color.slice(5, 7), 16)
    }
    for (var key in colorData) {
        if (colorData.hasOwnProperty(key)) {
            colorData[key] -= (colorData[key] * 0.5)
        }
    }
    var sonColor = "#" + colorData.R.toString(16) + colorData.G.toString(16) +
        colorData.B.toString(16)
    var sonSqus = []
    for (var _i = 0; _i < sonNum; _i++) {
        // 分裂的子矩形(运动方向为水平方向上随机,垂直方向上向下)
        var _sx = Math.pow(-1, Math.floor(Math.random() * 2)) * Math.floor(Math.random() * 2)
        var _sy = Math.floor(Math.random() * 5)
        sonSqus.concat(new Squ(this.x, this.y, this.len / sonNum, sonColor, _sx, _sy))
    }
    return sonSqus
}
Squ.prototype.sport = function () {
    this.x += this.sx
    this.y += this.sy
}
Squ.getManager = function (ctxW, ctxH, fsqus, ssqus) {
    fsqus.forEach(function (element, index, arr) {
        // fsqus(最初始的矩形)只进行垂直方向上的运动(向上)
        // 检查是否有出现在舞台之外的元素,将其删除
        if (element.y + element.len < 0) {
            arr.splice(index, 1)
        }
    }, this);
    ssqus.forEach(function (element, index, arr) {
        // ssqus(子矩形)同时进行垂直方向(向下)和水平方向(左或右)的运动
        // 检查是否有出现在舞台之外的元素,将其删除
        if (element.x + element.len < 0 || element.x > ctxW) {
            arr.splice(index, 1)
        } else if (element.y > ctxH) {
            arr.splice(index, 1)
        }
    })
}

// 一些好看的颜色
var colors = ["#C3BED4", "#C7FFEC", "#FD5B78", "#426ab3", "#da765b"]
var backgroundColor = "#404040"