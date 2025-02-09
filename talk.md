# Everett Bogue

+ From Chicago circa 1985
+ JavaScript coder since 1999
+ Developing the Bog5 distributed social networking protocol
+ Kayak Guide on the Chicago River (during Kayaking season)
+ Former middle manager for a californa-based company (at the mall)
+ Ten years ago developed "Decent" a client for Secure Scuttlebot 
+ Frequent speaker at Chicago JavaScript

# The web was intended to be static (Web 1.0)

> I just had to take the hypertext idea and connect it to the TCP and DNS ideas and — ta-da!— the World Wide Web - Tim Burners Lee

https://jschi.deno.dev/

# Forms make the web single player (Web 2.0)

> The Internet has always been, and always will be, a magic box. - Marc Andressen

Example 2. My Service -- Web 1.0 Guestbook

https://jschi2.deno.dev/

Question: Will this type of app work on Serverless Servers?

Example 3. Ntfy API -- Make Ev's phone buzz

https://jschi.deno.dev/example3.html

# But people want multiplayer collaborative websites

> "I hate almost all software" - Ryan Dahl, 2012
 
Websockets?! HTMX? All require servers. Which is fine as long as your server isn't serverless.

Example 4. BroadcastChannel API
Example 5. Htmx Chatroom

# How about WebRTC (web real-time communication)?

> "Ultimately, in the Internet, openness has always won." - Eric Schmidt, 2010

https://webrtc.org/

No example. WebRTC is hard! I have to set up a STUN server? What is an ICE server?! 

# Trystero! Build instant multiplayer webapps, no server required 

> Trystero manages a clandestine courier network that lets your application's users talk directly with one another, encrypted and without a server middleman. - Dan Motzenbecker

+ Magic WebRTC matchmaking over BitTorrent, Nostr, MQTT, IPFS, Supabase, and Firebase 

https://github.com/dmotz/trystero

# Trystero Chatroom

```
const room = joinRoom({appId, password}, channel)
const [send, receive] = room.makeAction(type)
room.onPeerJoin(id => {})
room.onPeerLeave(id => {})
```

Example 6: https://jschi.deno.dev/example6.html

# Trystero Presence

# Trystero Wave

# Trystero Video



# What will you build? And complete examples.

> Chitchatter is a communication tool designed to make secure and private communication accessible to all. - Jeremy Kahn

+ https://chitchatter.im/
+ https://github.com/jeremyckahn/awesome-trystero

Questions?

# Homework

Distributed AI Chat! Trystero into Ollama running behind NAT.
