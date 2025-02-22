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
  <style>body { background: #f5f5f5; font-family: sans-serif; margin-left: auto; margin-right: auto; padding: 1em; width: 680px; color: #333; max-width: 89%;} 
  input { font-size: 1em; font-family: sans-serif; border: 1px solid #e4e4e4; border-radius: 5px; background: #fff; color: #555; padding: 5px; box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075)}</style>
  <form method="POST">
    <input type="text" placeholder="Sign my Guestbook" id="message" name="message"><br>
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
