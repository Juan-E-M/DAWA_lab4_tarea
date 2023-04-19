const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const calculadora = require('./calculadora.js');
const procesadorDeTexto = require('./procesadorDeTexto.js');
const parser = require('./parser_var.js');


http.createServer(function(req, res) {
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;

  if (pathname === '/calculadora') {
    if (req.method === 'GET') {

      fs.readFile('./calculadora.html', function(err, html) {
        if (err) {
          res.writeHead(500);
          res.end('Error interno');
          return;
        }
        var params = req.url.split('?')[1];
        var html_string = html.toString();
        if (params) {
            html_string = html_string.replace('{resultado}',calculadora.calcularGet(req))
        } 
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html_string);
        res.end();
      });
    }
  } else if (pathname === '/procesadorDeTexto') {

    if (req.method === 'GET') {

      fs.readFile('./procesadorDeTexto.html', function(err, html) {
        if (err) {
          res.writeHead(500);
          res.end('Error interno');
          return;
        }

        var params = req.url.split('?')[1];
        var html_string = html.toString();
        var resultado
        if (params) {
            var respuesta = parser.parse_vars(req),
            parametros = respuesta['parametros'],
            valores =respuesta['valores'];
            for(var i=0; i<parametros.length; i++){
                if (parametros[i] == 'accion'){
                    var accion = valores[i]
                }
                if (parametros[i] == 'texto'){
                    var texto = valores[i]
                    texto = texto.replace(/\+/g, ' ');
                }
            }
            if (accion === 'dividir') {
            resultado = procesadorDeTexto.dividirPalabras(texto);
            } else if (accion === 'extraer') {
            resultado = procesadorDeTexto.extraerTexto(texto, 2, 6);
            } else if (accion === 'eliminarEspacios') {
            resultado = procesadorDeTexto.eliminarEspacios(texto);
            } else if (accion === 'capitalizar') {
            resultado = procesadorDeTexto.capitalizar(texto);
            } else if (accion === 'minusculas') {
            resultado = procesadorDeTexto.convertirMinusculas(texto);
            } else if (accion === 'mayusculas') {
            resultado = procesadorDeTexto.convertirMayusculas(texto);
            } else if (accion === 'contarCaracteres') {
            resultado = procesadorDeTexto.contarCaracteres(texto);
            }
            html_string = html_string.replace('{resultado}',resultado)
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html_string);
        res.end();
      });
    }} else {

    res.writeHead(404);
    res.end('Error: página no encontrada');
    }
    }).listen(3000);
    
    console.log('Servidor web iniciado en el puerto 3000');
