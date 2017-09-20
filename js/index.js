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
// loadData("./src/李想Evelyn - 分赃.mp3")
function visual() {
    var arr = new Uint8Array(analyser.frequencyBinCount)
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        mozRequestAnimationFrame
    requestAnimationFrame(start)
    function start(){
        analyser.getByteFrequencyData(arr)
        console.log(arr)
        requestAnimationFrame(strat)
    }
}
visual()