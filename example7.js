import { joinRoom } from './trystero-torrent.min.js'

const appId = 'trystream'
const password = 'woiefjowiejfwoijfeoiwejf'

const makeRoom = async (src) => {
  if (src) {
    const screen = document.getElementById('screen')
    const room = await joinRoom({appId, password}, src)

    const selfStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
    
    const myvideo = document.createElement('video')
    myvideo.autoplay =  true,
    myvideo.style = 'transform: rotateY(180deg); height: auto; width: 100%; object-fit: cover;',
    myvideo.muted = true,
    myvideo.srcObject = selfStream

    const myframe = document.createElement('div')
    myframe.style = 'width: 25vw; height: 25vw; display: flex;'
 
    screen.appendChild(myframe)
    myframe.appendChild(myvideo)

    room.onPeerJoin(id => {
      console.log(`${id} joined ${src}.`)
      room.addStream(selfStream)
    })

    room.onPeerLeave(id => {
      console.log(`${id} left ${src}.`)
    })

    room.onPeerStream((stream, id) => {
      const vid = document.createElement('video')
      vid.autoplay = true,
      vid.srcObject = stream,
      vid.style = 'height: auto; width: 100%; object-fit: cover;'
 
      const frame = document.createElement('div') 
      frame.id = id
      frame.style = 'width: 25vw; height: 25vw; display: flex;'

      screen.appendChild(frame)
      frame.appendChild(vid)
    })

  } else {
    const input = document.createElement('input')
    input.placeholder = 'Choose a room'
    input.onkeyup = ({key}) => {
      if (key === 'Enter' && input.value) {
        window.location.hash = input.value
        input.remove()
      }
    }
    document.body.appendChild(input)
  }
}

const route = async () => {
  const src = window.location.hash.substring(1)
  const screen = document.createElement('div')
  screen.id = 'screen'
  screen.style = 'display: flex; flex-direction: row; flex-wrap: wrap; max-height: 100vw; max-width: 100vw; margin: 0;'

  await document.body.appendChild(screen)

  await makeRoom(src)

}

window.onhashchange = async () => {
  const get = document.getElementById('screen')
  if (get) { get.remove()}
  await route()
}

await route()
