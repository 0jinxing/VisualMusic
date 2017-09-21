var fileInput = _("#file-input")[0]
var fr = new FileReader()
fileInput.onchange = function(){
    fr.readAsArrayBuffer(fileInput.files[0])
    fr.onload = function (ev){
        ev = ev || window.event
        var re = ev.target.result
        audioContext.decodeAudioData(re, function (buffer)
    }
}