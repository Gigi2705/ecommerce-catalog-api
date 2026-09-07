const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());
app.use('/api', productRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
});

module.exports = app;