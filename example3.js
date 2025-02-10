import { h } from './h.js'

const send = async (msg) => {
  fetch('https://ntfy.sh/evbogue', {
    method: 'POST',
    body: msg
  })
}

const input = h('input', {
  placeholder: `Send Ev's phone a message`,
  onkeyup: async ({key}) => { if (key === 'Enter') {
    input.after(h('div', [`${input.value} sent!`]))
    await send(input.value)
    input.value = ''
  }}
})

document.body.appendChild(input)

