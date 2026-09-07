const app = require('./src/app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar:', err.message);
  });