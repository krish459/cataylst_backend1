const Blog = require("../models/blogModel");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      Blog:
 *        type: object
 *        required:
 *          - postMeta
 *          - title
 *          - postDescriptions
 *        properties:
 *                postMeta:
 *                    type: String
 *                title:
 *                     type: String
 *                postDescriptions:
 *                     type: String
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
router.get(
    "/get-blogs",
    async (req, res) => {
      try {
  
        const { page, perPage } = req.query;
        const options = {
          page: parseInt(page, 10) || 1,
          limit: parseInt(perPage, 10) || 3,
        };
  
        const blogs = await Blog.paginate({},options);
        res.status(200).json({ blogs });
        
  
      }catch(error) {
        return res.status(400).json({ message: `${error}` });
      } 
    }
  );

module.exports = router;