import { joinRoom, selfId } from './trystero-torrent.min.js'
import { h } from './h.js'

const room = joinRoom({appId: 'example6', password: 'blerg'}, 'channel6')

const [send, receive] = room.makeAction('message')

const [typing, typed] = room.makeAction('typing')

const input = h('input', {
  placeholder: 'Write a message',
  oninput: () => {
    const get = document.getElementById(selfId)
    if (get) { get.remove()}
    const newDiv = h('div', {id: selfId}, [`${selfId} ${input.value}`])
    input.after(newDiv)
    typing({typing: input.value})
  },
  onkeyup: ({key}) => { if (key === 'Enter') {
    const msg = h('div', [`${selfId} ${input.value}`])
    input.after(msg)
    send({message: input.value})
    input.value = ''
    const get = document.getElementById(selfId)
    get.remove()
  }
}})

document.body.appendChild(input)
input.after(h('div', {id: selfId}, [`${selfId} is here.`]))

room.onPeerJoin(id => { input.after(h('div', {id}, [`${id} is here.`]))})

room.onPeerLeave(id => {
  const get = document.getElementById(id)
  if (get) {get.remove()}
  input.after(h('div', {id}, [`${id} has left.`]))
})

receive((data, id) => {
  input.after(h('div', [`${id} ${data.message}`]))
  const get = document.getElementById(id)
  if (get) { get.remove()}
})

typed((data, id) => {
  const get = document.getElementById(id)
  if (get) { get.remove() }
  const peerDiv = h('div', {id})
  peerDiv.textContent = id + ' ' + data.typing
  input.after(peerDiv)
})

