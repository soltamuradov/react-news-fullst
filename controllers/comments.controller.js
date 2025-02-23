const Comment = require("../models/Comment.model");
const jwt = require("jsonwebtoken");
const e = require("express");

module.exports.commentscontroller = {
  createComments: async function (req, res) {
    const { text, categoryId} = req.body;

    try {
      
      const comment = await Comment.create({
        text,
        userId: req.user.id,
        categoryId
      });
      res.json(comment);
      console.log(comment)
    } catch (error) {
      return res.status(401).json(e.toString());
    }
  },
  deleteCommentById: async function (req, res) {
    const { id } = req.params;

    try {
      const comment = await Comment.findById(id);
      if (comment.userId.toString() === req.user.id) {
        await comment.remove();
        return res.json(id);
      }
      return res.status(401).json("ошибка! Нет доступа");
    } catch (error) {
      return res.status(401).json("Ошибка" + e.toString());
    }
  },

  getCommentsByCategory: async (req, res) => {
    try {
      let comments = await Comment.find({ categoryId: req.params.categoryId });
      res.json(comments);
    } catch (error) {
      res.json(error);
    }
  },
  getAllComments: async (req, res) => {
    try {
      let comments = await Comment.find();
      res.json(comments);
    } catch (error) {
      res.json(error);
    }
  },
};
