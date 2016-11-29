// ... so it can be used with `curl`
process.stdin.on('data', chunk => console.log(JSON.stringify(JSON.parse(chunk), null, 4)))
