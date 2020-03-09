const http = require('http');
const url = require('url');
const fs = require('fs')

const server = http.createServer((req, res) => {
  const {pathname, query} = url.parse(req.url,true);
  let body = '';
  req.on('data', (chunk) =>{
    body += chunk;
    console.log(body);
  })
  req.on('end', () =>{
    res.writeHead(200, {'content-type': 'text/html'});
    res.write(`
      <main>
        <h1>Welcome to Dictionary</h1>
        <form>
          <label for='word'>Word</label>
          <input name='word'>
        </form>
      </main>
    `)
    fs.readFile('./data.txt','utf8',(err,foundWord) => {
      if (err) {
        console.log(err)
      }
      let arrOfWords = foundWord.split('\n')
      
      for (let char of arrOfWords) {
        if (char.startsWith(query.word)) {
          res.write(`
            <h1>Defination</h1>
            <p>${char}<p>
          `)
          console.log(char);
        }
      }
    })
    res.end()
  })
});

const PORT = 4000;
const DOMAIN = 'localhost';

server.listen(PORT, DOMAIN, () => {
  console.log(`Server Running on ${DOMAIN}:${PORT}`);
})