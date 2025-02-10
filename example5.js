import { h } from './h.js'
import { human } from './human.js'
import { joinRoom, selfId } from './trystero-torrent.min.js'

const render = async (id, message, timestamp) => {
  const ts = h('span', [await human(new Date(parseInt(timestamp)))])
  setInterval(async () => {ts.textContent = await human(new Date(parseInt(timestamp)))}, 100)
  
  return h('div', [`${id} ${message} - `, ts])
}

const input = h('input', {
  placeholder: 'Write a message',
  onkeyup: async ({key}) => { if (key === 'Enter') {
    input.after(await render(selfId, input.value, Date.now()))
    send({message: input.value, timestamp: Date.now()})
    input.value = ''
  }}
})

document.body.appendChild(input)

const room = joinRoom({appId: 'example3', password: '384759843!?!!!'}, 'room')
const [send, receive] = room.makeAction('message')

room.onPeerJoin(id => { input.after(h('div', [`${id} joined room.`]))})
room.onPeerLeave(id => { input.after(h('div', [`${id} left room.`]))})

receive(async (data, id) => {
  input.after(await render(id, data.message, data.timestamp))
})

