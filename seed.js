const mongoose = require('mongoose');
const Product = require('./src/models/Product');
const dotenv = require('dotenv');

dotenv.config();

const products = [
  {
    nome: 'Camiseta Polo Azul',
    preco: 89.90,
    categoria: 'Roupas',
    estoque: 100,
    descricao: 'Camiseta polo em algodão, azul marinho',
    especificacoes: {
      tamanho: 'M',
      cor: 'Azul',
      tecido: 'Algodão 100%'
    }
  },
  {
    nome: 'Smart TV 55"',
    preco: 2999.00,
    categoria: 'Eletrônicos',
    estoque: 50,
    descricao: 'Smart TV 4K com HDR e Wi-Fi',
    especificacoes: {
      voltagem: '110V',
      polegadas: 55,
      resolucao: '4K'
    }
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('✅ Dados inseridos com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
};

seedDB();