// 方便获取DOM节点
function _(s) {
    return document.querySelectorAll(s)
}
// 获取audioContext对象
var audioContext = new(window.AudioContext || window.webkitAudioContext)()
// 获取gainNode对象(可调节音量)
var gain = audioContext[audioContext.createGain ? "createGain" : "createGainNode"]()
// 获取analyser对象(可分析音频数据)
var analyser = audioContext.createAnalyser()
analyser.fftSize = 512
// 创建联系
gain.connect(audioContext.destination)
analyser.connect(gain)

// ajax对象
var xhr = new XMLHttpRequest()
// 当前的音乐播放源
var curSource = null
// 获取音频
function loadData(url) {
    xhr.open("GET", url, true)
    xhr.responseType = "arraybuffer"
    xhr.onload = function () {
        audioContext.decodeAudioData(xhr.response, function (buffer) {
            var bufferSource = audioContext.createBufferSource()
            bufferSource.buffer = buffer
            bufferSource.connect(analyser)
            /**
             * bufferSource => analyser => gain => destination
             */
            // 停止上一个的播放
            curSource && curSource[curSource.stop ? "stop" : "noteOff"]()
            curSource = bufferSource
            curSource && curSource[curSource.start ? "start" : "noteOn"](0)
        }, function (err) {
            return err
        })
    }
    xhr.send()
}
// 加载和播放音乐
loadData("./src/李想Evelyn - 分赃.mp3")

// 选择文件播放
var fileInput = _("#file-input")[0]
var fr = new FileReader()
fileInput.onchange = function () {
    fr.readAsArrayBuffer(fileInput.files[0])
    fr.onload = function (ev) {
        ev = ev || window.event
        var re = ev.target.result
        console.log(321)
        audioContext.decodeAudioData(re, function (buffer) {
            var bufferSource = audioContext.createBufferSource()
            bufferSource.buffer = buffer
            bufferSource.connect(analyser)
            /**
             * bufferSource => analyser => gain => destination
             */
            // 停止上一个的播放
            curSource && curSource[curSource.stop ? "stop" : "noteOff"]()
            curSource = bufferSource
            curSource && curSource[curSource.start ? "start" : "noteOn"](0)
        })
    }
}
var arr = null

function visual() {
    arr = new Uint8Array(analyser.frequencyBinCount)
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        mozRequestAnimationFrame ||
        msRequestAnimationFrame
    requestAnimationFrame(start)

    function start() {
        analyser.getByteFrequencyData(arr)
        // console.log(arr)
        requestAnimationFrame(start)
    }
}
visual()

// 下面是开始绘制工作
// 一些好看的颜色
var foregroundColor = "#E57B85"
var backgroundColor = "white"

var canvasDom = _("#visual-block")[0]
var ctx = canvasDom.getContext("2d")

function draw() {
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvasDom.width, canvasDom.height)
    arr.forEach(function (element, index, arr) {
        ctx.fillStyle = foregroundColor
        ctx.fillRect(
            index * Math.floor(canvasDom.width / (arr.length)),
            canvasDom.height - ((element / 255) * canvasDom.height),
            Math.ceil(canvasDom.width / (arr.length)),
            ((element / 255) * canvasDom.height)
        )
    }, this);
}
setInterval(draw, 10)