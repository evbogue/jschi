import { Hono } from 'npm:hono'
import sanitizeHtml from 'npm:sanitize-html'
import { human } from './human.js'

const app = new Hono()

const db = []

const render = async () => {
  let entries 
  for (const msg of db) {
    const sani = await sanitizeHtml(msg.content)
    const ts = await human(new Date(parseInt(msg.timestamp)))
    if (entries) {
      entries = `${sani} - ${ts}<br />${entries}`
    } else {
      entries = `${sani} - ${ts}</p>`
    }
  }
  if (entries) {
    return entries
  } else {return ''}
}

const form = `
  <style>body { font-family: sans-serif;}</style>
  <h1>Guestbook</h1>
  <p>Sign my guestbook</p>
  <form method="POST">
    <label for="message">Write a message: </label><br>
    <input type="text" id="message" name="message"><br>
    <button>Send</button>
  </form>
  <p>
  ${await render()}
`

app.get('/', c => c.html(form))
app.post('/', async c => {
  const body = await c.req.parseBody()
  db.push({content: body.message, timestamp: Date.now()})
  return c.html(form + await render()) 
})

export default app
