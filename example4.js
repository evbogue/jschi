import { serveDir } from 'jsr:@std/http/file-server'

const sockets = new Set()
const channel = new BroadcastChannel("")

channel.onmessage = e => {
  (e.target != channel) && channel.postMessage(e.data)
  sockets.forEach(s => s.send(e.data))
}

Deno.serve(r => {
  try {
    const { socket, response } = Deno.upgradeWebSocket(r)
    sockets.add(socket)
    socket.onmessage = channel.onmessage
    socket.onclose = _ => sockets.delete(socket)
    return response
  } catch (err) { return serveDir(r) }
})
