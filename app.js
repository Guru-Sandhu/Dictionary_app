const http = require('http');
const url = require('url');
const fs = require('fs')

const server = http.createServer((req, res) => {
  const {pathname, query} = url.parse(req.url,true);
  let body = '';
  let foundWord = [];
  fs.readFile('./data.txt','utf8',(err,fileData) => {
    if (err) {
      console.log(err)
    }
    let arrOfWords = fileData.split('\n')
    
    for (let i = 0;i < arrOfWords.length; i++) {
      if (arrOfWords[i].startsWith(query.word)) {
        foundWord.push(arrOfWords[i]);
      }
    }
    console.log(foundWord)
    req.on('data', (chunk) =>{
      body += chunk;
      console.log(body);
    })
    req.on('end', () =>{
      res.writeHead(200, {'content-type': 'text/html'});
      res.write(`<main>
      <h1>Welcome to Dictionary</h1>
      <form>
        <label for='word'>Word</label>
        <input name='word'>
      </form>
      </main>`)
      if (foundWord.length !== 0) {
        res.write(`
            <h2>Defination:</h2>
            <p>${foundWord[0]}</p>
        `)
      } else {
        res.write(`
            <h2>Defination:</h2>
            <p>Sorry the word was not found</p>
        `)
      }
      res.end()
    })
  })
});

const PORT = 4000;
const DOMAIN = 'localhost';

server.listen(PORT, DOMAIN, () => {
  console.log(`Server Running on ${DOMAIN}:${PORT}`);
})