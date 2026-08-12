// Servidor minimo pra o Railway servir o painel (arquivo estatico).
const http = require('http'), fs = require('fs'), path = require('path');
const port = process.env.PORT || 3000;
const TIPO = { '.html':'text/html; charset=utf-8', '.js':'text/javascript',
  '.css':'text/css', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml' };
http.createServer((req, res) => {
  let f = req.url.split('?')[0];
  if (f === '/' || f === '') f = '/index.html';
  const fp = path.join(__dirname, path.normalize(f).replace(/^(\.\.[\/\\])+/, ''));
  fs.readFile(fp, (e, data) => {
    if (e) { res.writeHead(404); res.end('nao encontrado'); return; }
    res.writeHead(200, { 'Content-Type': TIPO[path.extname(fp)] || 'text/plain' });
    res.end(data);
  });
}).listen(port, () => console.log('painel no ar na porta ' + port));
