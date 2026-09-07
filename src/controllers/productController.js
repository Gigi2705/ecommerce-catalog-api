const Product = require('../models/Product');

// RF01 - Criar produto
exports.createProduct = async (req, res) => {
  try {
    const { nome, preco, categoria, estoque, descricao, especificacoes } = req.body;

    const product = await Product.create({
      nome,
      preco,
      categoria,
      estoque,
      descricao,
      especificacoes: especificacoes || {}
    });

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// RF02 + RF03 + RF04 - Listar produtos com filtros, busca, paginação e ordenação
exports.getProducts = async (req, res) => {
  try {
    const {
      categoria,
      precoMin,
      precoMax,
      search,
      page = 1,
      limit = 10,
      sort = 'preco'
    } = req.query;

    const filter = {};

    // Filtro por categoria (RF02)
    if (categoria) {
      filter.categoria = categoria;
    }

    // Filtro por faixa de preço (RF02)
    if (precoMin || precoMax) {
      filter.preco = {};
      if (precoMin) filter.preco.$gte = Number(precoMin);
      if (precoMax) filter.preco.$lte = Number(precoMax);
    }

    // Busca textual (RF03)
    if (search) {
      filter.$text = { $search: search };
    }

    // Paginação (RF04)
    const skip = (Number(page) - 1) * Number(limit);

    // Ordenação (RF04)
    let sortOption = {};
    if (sort === 'preco_asc') sortOption = { preco: 1 };
    else if (sort === 'preco_desc') sortOption = { preco: -1 };
    else sortOption = { preco: 1 };

    const products = await Product.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort(sortOption);

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// RF05 - Atualizar produto e estoque (com $inc)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, categoria, descricao, especificacoes, estoqueDelta } = req.body;

    const updateData = {};
    if (nome) updateData.nome = nome;
    if (preco) updateData.preco = preco;
    if (categoria) updateData.categoria = categoria;
    if (descricao) updateData.descricao = descricao;
    if (especificacoes) updateData.especificacoes = especificacoes;

    // Atualização atômica do estoque com $inc (RF05)
    if (estoqueDelta !== undefined) {
      updateData.$inc = { estoque: Number(estoqueDelta) };
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// RF06 - Remover produto
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Produto removido com sucesso'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};