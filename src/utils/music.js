
export default function createAudio() {
  var audioTag = document.createElement('audio')
  if (document.getElementsByClassName('audioTag').length > 0) {
    document.getElementById('app').removeChild(document.getElementsByClassName('audioTag')[0])
  }
  audioTag.className = "audioTag"
  // audioTag.preload = "auto"
  audioTag.loop = "loop"
  // audioTag.muted="muted"
  document.getElementById('app').appendChild(audioTag)
}

