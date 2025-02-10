# Everett Bogue

+ From Chicago circa 1985
+ JavaScript coder since 1999
+ Developing the Bog5 distributed messaging protocol
+ Kayak Guide on the Chicago River (during Kayaking season) since 2024
+ Former substitute middle manager for a Californa-based company (at the mall)
+ Developed "Decent", a client (and an alt-network) for Secure Scuttlebot in 2016
+ Frequent speaker on JavaScripts in Chicago since 2018

---

# The web was intended to be static (Web 1.0)

> I just had to take the hypertext idea and connect it to the TCP and DNS ideas and — ta-da!— the World Wide Web — Tim Burners Lee

https://jschi.deno.dev/

---

# Forms make the web single player (Web 2.0)

> The Internet has always been, and always will be, a magic box. — Marc Andressen

Example 2. Web 1.0 Guestbook

https://jschi2.deno.dev/

Question: Will this type of app work on Serverless Servers?

Example 3. Ntfy API -- Make Ev's phone buzz

https://jschi.deno.dev/example3.html

---

# But people want to interact on websites! (Multiplayer)

> "I hate almost all software" — Ryan Dahl
 
Websockets?! HTMX? They require nonserverless servers.

Let's try the BroadcastChannel API!

Example 4: https://jschi4.deno.dev/

---

# How about WebRTC (web real-time communication)?

> "Ultimately, in the Internet, openness has always won." — Eric Schmidt

https://webrtc.org/

No example. WebRTC is hard! I have to set up a STUN server? What is an ICE server?! 

---

# Trystero! Build instant multiplayer webapps, no server required 

> Trystero manages a clandestine courier network that lets your application's users talk directly with one another, encrypted and without a server middleman. — Dan Motzenbecker

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
