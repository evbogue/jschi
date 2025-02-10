# About me

https://evbogue.com/

773-510-8601

+ From Chicago circa 1985
+ JavaScript coder since 1999
+ Developing the Bog5 distributed messaging protocol
+ Kayak Guide on the Chicago River (during Kayaking season) since 2024
+ Former substitute middle manager for a Californa-based company (at the mall)
+ Developed "Decent", a client (and an alt-network) for Secure Scuttlebot in 2016
+ Frequent speaker on JavaScripts in Chicago since 2018

---

# The web was intended to be static (Web 1.0)

> I just had to take the hypertext idea and connect it to the TCP and DNS ideas and — ta-da!— the World Wide Web — Tim Burners Lee, dude who invented the web

```
import { serveDir } from 'jsr:@std/http/file-server'

Deno.serve(r => { return serveDir(r, {showDirListing: true})})
```

https://jschi.deno.dev/

<iframe src='https://jschi.deno.dev/'></iframe>

---

# Forms make the web single player (Web 2.0)

> The Internet has always been, and always will be, a magic box. — Marc Andressen, dude who invented the web browser

**Example 2.** Web 1.0 Guestbook

```
const app = new Hono()

app.get('/', c => c.html(form))

app.post('/', async c => {
  const body = await c.req.parseBody()
  db.push({content: body.message, timestamp: Date.now()})
  return c.html(form + await render())
})

```

https://jschi2.deno.dev/

<iframe src='https://jschi2.deno.dev/'></iframe>

Question: Will this type of app work on Serverless Servers?

---

**Example 3.** Ntfy API -- Make Ev's phone buzz

```
fetch('https://ntfy.sh/evbogue', {
  method: 'POST',
  body: msg
})
```

https://jschi.deno.dev/example3.html

<iframe src='https://jschi.deno.dev/example3.html'></iframe>

---

# But people want to multiplayer websites!

> "I hate almost all software" — Ryan Dahl, dude who invented Node/Deno
 
Websockets?! They require nonserverless servers.

Let's try the BroadcastChannel API!

```
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
```

Example 4: https://jschi4.deno.dev/example4.html

<iframe src='https://jschi4.deno.dev/example4.html'></iframe>

---

# How about WebRTC (web real-time communication)?

> "Ultimately, in the Internet, openness has always won." — Eric Schmidt, dude who paid for WebRTC

https://webrtc.org/

No example. WebRTC is hard! I have to set up a STUN server? What is an ICE server?! 

---

# Trystero! Build instant multiplayer webapps, no server required 

> Trystero manages a clandestine courier network that lets your application's users talk directly with one another, encrypted and without a server middleman. — Dan Motzenbecker, dude with a Github repo

+ Magic WebRTC matchmaking over BitTorrent, Nostr, MQTT, IPFS, Supabase, and Firebase 

https://github.com/dmotz/trystero

---

# Trystero Chatroom

```
const room = joinRoom({appId, password}, channel)
const [send, receive] = room.makeAction(type)
room.onPeerJoin(id => {})
room.onPeerLeave(id => {})
```

Example 5: https://jschi.deno.dev/example5.html

---

# Trystero Wave

```
const [typing, typed] = room.makeAction('typing')

input.oninput: () => {
  typing({typing: input.value})
},
```

Example 6: https://jschi.deno.dev/example6.html

---

# Trystero Video

```
const selfStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true})
room.onPeerStream((stream, id) => { ... }
```

Example 7: https://jschi.deno.dev/example7.html#jschi

---

# What will you build? And complete examples.

+ https://chitchatter.im/
+ https://github.com/jeremyckahn/awesome-trystero

Anyone else?

Questions?

# Homework

+ Distributed AI Chat! Trystero into Ollama running behind NAT in your home office/garage.
