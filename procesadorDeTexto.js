// procesadorDeTexto.js

module.exports = {
    dividirPalabras: function(texto) {
      return texto.split('');
    },
  
    extraerTexto: function(texto, inicio, fin) {
      return texto.substring(inicio, fin);
    },
  
    eliminarEspacios: function(texto) {
      return texto.replace(/\s/g, '');
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
  