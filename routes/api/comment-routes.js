const router = require("express").Router();
const {
  addComment,
  deleteComment,
  addReply,
  removeReply,
} = require("../../controllers/comment-controller");

router.post("/:pizzaId", addComment);
router.delete("/:pizzaId/:commentId", deleteComment);
router.put("/:pizzaId/:commentId", addReply);
router.delete("/:pizzaId/:commentId/:replyId", removeReply);

module.exports = router;
