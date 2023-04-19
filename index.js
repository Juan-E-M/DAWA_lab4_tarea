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
    // Si la URL es "/calculadora", procesamos la solicitud de la calculadora
    if (req.method === 'GET') {
      // Si la solicitud es por GET, mostramos el formulario
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
    } else if (req.method === 'POST') {
      // Si la solicitud es por POST, procesamos los datos del formulario
      let body = '';
      req.on('data', function(data) {
        body += data;
      });

      req.on('end', function() {
        const postData = querystring.parse(body);
        const operacion = postData.operacion;
        const numero1 = parseFloat(postData.numero1);
        const numero2 = parseFloat(postData.numero2);
        const resultado = calculadora.calcularPost(operacion, numero1, numero2);

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`<p>Resultado: ${resultado}</p>`);
        res.end();
      });
    }
  } else if (pathname === '/procesadorDeTexto') {
    // Si la URL es "/procesadorDeTexto", procesamos la solicitud del procesador de texto
    if (req.method === 'GET') {
      // Si la solicitud es por GET, mostramos el formulario
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
                }
            }
            console.log(texto)
            texto = texto.replace('+',' ')
            console.log(texto)
            if (accion === 'dividir') {
            resultado = procesadorDeTexto.dividirPalabras(texto);
            } else if (accion === 'extraer') {
            resultado = procesadorDeTexto.extraerCadenaDeTexto(texto);
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
    } else if (req.method === 'POST') {
      // Si la solicitud es por POST, procesamos los datos del formulario
      let body = '';
      req.on('data', function(data) {
        body += data;
      });

      req.on('end', function() {
        const postData = querystring.parse(body);
        const texto = postData.texto;
        const accion = postData.accion;
        let resultado = '';

        if (accion === 'dividir') {
          resultado = procesadorDeTexto.dividirPalabra(texto);
        } else if (accion === 'extraer') {
          resultado = procesadorDeTexto.extraerCadenaDeTexto(texto);
        } else if (accion === 'eliminarEspacios') {
          resultado = procesadorDeTexto.eliminarEspacios(texto);
        } else if (accion === 'capitalizar') {
          resultado = procesadorDeTexto.capitalizar(texto);
        } else if (accion === 'minusculas') {
          resultado = procesadorDeTexto.minusculas(texto);
        } else if (accion === 'mayusculas') {
          resultado = procesadorDeTexto.mayusculas(texto);
        } else if (accion === 'contarPalabras') {
        resultado = procesadorDeTexto.contarPalabras(texto);
        } else if (accion === 'invertir') {
        resultado = procesadorDeTexto.invertirTexto(texto);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<p>Resultado: ${resultado}</p>`);
    res.end();
  });
}} else {
    // Si la URL no es "/calculadora" ni "/procesadorDeTexto", mostramos un mensaje de error
    res.writeHead(404);
    res.end('Error: página no encontrada');
    }
    }).listen(3000);
    
    console.log('Servidor web iniciado en el puerto 3000');
