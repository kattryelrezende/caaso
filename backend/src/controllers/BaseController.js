// src/controllers/BaseController.js
class BaseController {
    constructor(model, options = {}) {
        this.model = model;
        this.order = options.order || [['id', 'ASC']];
        this.include = options.include || [];
        this.filters = options.filters || {};
    }

    _buildFindOptions(additional = {}) {
        return {
            order: this.order,
            include: this.include,
            where: { ...this.filters, ...additional.where },
            ...additional,
        };
    }

    listar = async (req, res) => {
        try {
            const items = await this.model.findAll(this._buildFindOptions());
            res.json(items);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    };

    buscarPorId = async (req, res) => {
        try {
            const { id } = req.params;
            const item = await this.model.findOne(this._buildFindOptions({ where: { id } }));
            if (!item) return res.status(404).json({ erro: 'Registro não encontrado' });
            res.json(item);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    };

    criar = async (req, res) => {
        try {
            const item = await this.model.create(req.body);
            if (this.include.length) {
                const fullItem = await this.model.findByPk(item.id, { include: this.include });
                return res.status(201).json(fullItem);
            }
            res.status(201).json(item);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    };

    atualizar = async (req, res) => {
        try {
            const { id } = req.params;
            const item = await this.model.findByPk(id);
            if (!item) return res.status(404).json({ erro: 'Registro não encontrado' });
            await item.update(req.body);
            if (this.include.length) {
                const updatedItem = await this.model.findByPk(id, { include: this.include });
                return res.json(updatedItem);
            }
            res.json(item);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    };

    deletar = async (req, res) => {
        try {
            const { id } = req.params;
            const item = await this.model.findByPk(id);
            if (!item) return res.status(404).json({ erro: 'Registro não encontrado' });
            await item.destroy();
            res.json({ mensagem: 'Registro removido com sucesso' });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    };
}

module.exports = BaseController;