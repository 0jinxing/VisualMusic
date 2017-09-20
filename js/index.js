// 方便获取DOM节点
function _(s) {
    return document.querySelectorAll(s)
}
// 获取audioContext对象
var audioContext = new(window.AudioContext || window.webkitAudioContext)()
// 获取gainNode对象(可调节音量)
var gain = audioContext[audioContext.createGain? "createGain":"createGainNode"]()
// 获取analyser对象(可分析音频数据)
var analyser = audioContext.createAnalyser()
// 创建联系
gain.connect(audioContext.destination)
analyser.connect(gain)

// 获取音频
var xhr = new XMLHttpRequest()
var curSource = null
function loadData(url){
    xhr.open("GET", url, true)
    xhr.responseType = "arraybuffer"
    xhr.onload = function () {
        audioContext.decodeAudioData(xhr.response, function(buffer){
            var bufferSource = audioContext.createBufferSource()
            bufferSource.buffer = buffer
            bufferSource.connect(analyser)
            curSource && curSource[curSource.stop? "stop":"noteOff"]()
            curSource = bufferSource
            curSource && curSource[curSource.start? "start":"noteOn"](0)
        }, function(err){
            return err
        })
    }
    xhr.send()
}
loadData("./src/李想Evelyn - 分赃.mp3")
