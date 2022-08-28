const { Pizza, Comment } = require("../models");

const commentController = {
  async addComment(req, res) {
    try {
      const dbCommentData = await Comment.create(req.body);
      console.log(dbCommentData._id);
      const dbPizzaData = await Pizza.findOneAndUpdate(
        { _id: req.params.pizzaId },
        { $push: { comments: dbCommentData._id } },
        { new: true, runValidators: true }
      );
      if (!dbPizzaData) {
        res.status(404).json({ message: "no pizza with that id was found" });
        return;
      }
      res.json(dbPizzaData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteComment(req, res) {
    try {
      const dbCommentData = await Comment.findOneAndDelete({
        _id: req.params.commentId,
      });
      if (!dbCommentData) {
        res.status(404).json({ message: "no comment with that id was found" });
        return;
      }
      const dbPizzaData = await Pizza.findOneAndUpdate(
        { _id: req.params.pizzaId },
        { $pull: { comments: req.params.commentId } },
        { new: true }
      );
      if (!dbPizzaData) {
        res.status(404).json({ message: "no pizza with that id was found." });
        return;
      }
      res.json(dbPizzaData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  async addReply(req, res) {
    try {
      const dbCommentData = await Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        { $push: { replies: req.body } },
        { new: true }
      );
      if (!dbCommentData) {
        res.status(404).json({ message: "No pizza found with this id." });
        return;
      }
      res.json(dbCommentData);
    } catch (err) {
      res.json(err);
    }
  },
  async removeReply(req, res) {
    try {
      const dbCommentData = await Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        { $pull: { replies: { replyId: req.params.replyId } } },
        { new: true }
      );
      res.json(dbCommentData);
    } catch (err) {
      res.json(err);
    }
  },
  //   addComment({ params, body }, res) {
  //     console.log(body);
  //     Comment.create(body)
  //       .then(({ _id }) => {
  //         return Pizza.findOneAndUpdate(
  //           { _id: params.pizzaId },
  //           { $push: { comments: _id } },
  //           { new: true }
  //         );
  //       })
  //       .then(dbPizzaData => {
  //         if (!dbPizzaData) {
  //           res.status(404).json({ message: 'No pizza found with this id!' });
  //           return;
  //         }
  //         res.json(dbPizzaData);
  //       })
  //       .catch(err => res.json(err));
  //   }
};

module.exports = commentController;
