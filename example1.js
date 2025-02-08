import { serveDir } from 'jsr:@std/http/file-server'

Deno.serve(r => { return serveDir(r, {showDirListing: true})})
