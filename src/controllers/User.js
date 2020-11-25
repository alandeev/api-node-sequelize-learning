class UserController {
  async update(req, res) {
    try {
      const { name, email } = req.body;
      console.log({ name, email });
      const user = req.requester;

      const updated = await user.update({ name, email });

      return res.status(200).json(updated);
    } catch (err) {
      return res.status(400).json({ errors: [err.message] });
    }
  }
}

module.exports = new UserController();
