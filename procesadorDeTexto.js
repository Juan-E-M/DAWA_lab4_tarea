// procesadorDeTexto.js

module.exports = {
    dividirPalabras: function(texto) {
      return texto.split(' ');
    },
  
    extraerTexto: function(texto, inicio, fin) {
      var indiceInicio = texto.indexOf(inicio) + inicio.length;
      var indiceFin = texto.indexOf(fin, indiceInicio);
      return texto.substring(indiceInicio, indiceFin);
    },
  
    eliminarEspacios: function(texto) {
      return texto.trim();
    },
  
    capitalizar: function(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1);
    },
  
    convertirMinusculas: function(texto) {
      return texto.toLowerCase();
    },
  
    convertirMayusculas: function(texto) {
      return texto.toUpperCase();
    },
  
    contarCaracteres: function(texto) {
      return texto.length;
    }
  };
  