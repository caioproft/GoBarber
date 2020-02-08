import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const { page } = req.query;

    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      order: ['name'],
      limit: 20,
      offset: (page - 1) * 20,
      include: {
        model: File,
        as: 'avatar',
        attributes: ['name', 'path', 'url'],
      },
    });

    return res.json(providers);
  }
}

export default new ProviderController();
