const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  preco: {
    type: Number,
    required: [true, 'Preço é obrigatório'],
    min: [0, 'Preço deve ser maior ou igual a 0']
  },
  categoria: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
    trim: true
  },
  estoque: {
    type: Number,
    required: [true, 'Estoque é obrigatório'],
    min: [0, 'Estoque deve ser maior ou igual a 0']
  },
  descricao: {
    type: String,
    trim: true,
    default: ''
  },
  especificacoes: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Índice para busca textual (RF03)
productSchema.index({ nome: 'text', descricao: 'text' });

module.exports = mongoose.model('Product', productSchema);