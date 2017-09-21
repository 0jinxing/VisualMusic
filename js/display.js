// 一些好看的颜色
var colors = ["#C3BED4", "#C7FFEC", "#FD5B78", "#426ab3", "#da765b"]
var backgroundColor = "#404040"

var canvasDom = _("#visual-block")[0]
var ctx = canvasDom.getContext("2d")
var fsqus = []
var ssqus = []
ctx.fillStyle = backgroundColor
ctx.fillRect(0, 0, 600, 600)
arr.forEach(function (element) {
    var x = Math.floor(Math.random() * canvasDom.width)
    var y = canvasDom.height
    var len = element / 255 * 30
    var color = colors[Math.floor(Math.random() * colors.length)]
    var sx = 0
    var sy = Math.floor(element / 255 * 4)
    fsqus.push(new Squ(x, y, len, color, sx, sy))
}, this);
fsqus.forEach(function(element){
    element.draw(ctx)
    element.sport()
})