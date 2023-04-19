function calcularPost(operacion, numero1, numero2) {
  let resultado;
  switch (operacion) {
    case 'suma':
      resultado = numero1 + numero2;
      break;
    case 'resta':
      resultado = numero1 - numero2;
      break;
    case 'multiplicacion':
      resultado = numero1 * numero2;
      break;
    case 'division':
      resultado = numero1 / numero2;
      break;
    default:
      resultado = 'Operación no válida';
  }
  return resultado;
}

function calcularGet(req) {
    var params = req.url.split('?')[1];
    var numero1 = parseFloat(params.split('&')[0].split('=')[1]);
    var numero2 = parseFloat(params.split('&')[1].split('=')[1]);
    var operacion = params.split('&')[2].split('=')[1];
    var resultado;

    switch (operacion) {
        case 'suma':
          resultado = numero1 + numero2;
          break;
        case 'resta':
          resultado = numero1 - numero2;
          break;
        case 'multiplicacion':
          resultado = numero1 * numero2;
          break;
        case 'division':
          resultado = numero1 / numero2;
          break;
        default:
          resultado = 'Operación no válida';
      }
      return resultado;
}

module.exports.calcularPost = calcularPost;
module.exports.calcularGet = calcularGet;