const Blog = require("../models/blogModel");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     NewBlog:
 *       type: object
 *       properties:
 *         img:
 *           type: string
 *         postMeta:
 *           type: string
 *         title:
 *           type: string
 *         postDescriptions:
 *           type: string
 *       required:
 *         - postMeta
 *         - title
 *         - postDescriptions
 */

/**
 * @swagger
 * tags:
 *    name: blogs
 *    description: The Blog managing API
 */

/**
 * @swagger
 * /api/blog/get-blogs:
 *  get:
 *    summary: To get all blogs from mongo DB
 *    tags: [blogs]
 *    description: This api is used to fetch Blog from mongoDB
 *    responses:
 *        200:
 *            description: This api is used to fetch Blog from mongoDB
 *            content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                        $ref: '#/components/schemas/Blog'
 */
router.get("/get-blogs", async (req, res) => {
  try {
    const { page, perPage } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(perPage, 10) || 3,
    };

    const blogs = await Blog.paginate({}, options);
    res.status(200).json({ blogs });
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
});

/**
 * @swagger
 * /api/blog/create-blog:
 *   post:
 *     summary: Create a new blog post in MongoDB
 *     tags: [blogs]
 *     description: Creates a new blog post in MongoDB using the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBlog'
 *     responses:
 *       201:
 *         description: The new blog post was successfully created in MongoDB.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: The request data was invalid or incomplete.
 */

router.post("/create-blog", async (req, res) => {
  try {
    const { img, postMeta, title, postDescriptions } = req.body;

    if (!postMeta || !title || !postDescriptions) {
      return res
        .status(400)
        .json({ message: "Post meta, title, and descriptions are required." });
    }

    const newBlog = new Blog({
      img,
      postMeta,
      title,
      postDescriptions,
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({ blog: savedBlog });
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
});

/**
 * @swagger
 * /api/blog/get-blog/{id}:
 *   get:
 *     summary: Get a single blog by ID.
 *     tags: [blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog to get.
 *     responses:
 *       '200':
 *         description: A single blog object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '404':
 *         description: Blog with provided ID not found.
 */

router.get("/get-blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ blog });
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
});

module.exports = router;
