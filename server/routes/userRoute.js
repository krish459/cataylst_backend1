const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
  //   authByRole,
} = require("../utils/Auth");
const { ROLES } = require("../utils/Enum");

const router = require("express").Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - username
 *          - password
 *        properties:
 *                name:
 *                    type: String
 *                email:
 *                     type: String
 *                role:
 *                     type: String
 *                username:
 *                     type: String
 *                password:
 *                     type: String
 *
 */

/**
 * @swagger
 * tags:
 *    name: Users
 *    description: The User managing API
 */

/**
 * @swagger
 * /api/users/register:
 *  post:
 *    summary: Signup
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: The User was created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Invalid Input
 *      500:
 *        description: The User was not created
 *
 *
 */

//  Registration route
router.post("/register", async (req, res) => {
  await userRegister(req.body,ROLES.CUSTOMER, res);
});

/**
 * @swagger
 * /api/users/login:
 *  post:
 *    summary: Login
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: The User was loggen in
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Invalid Input
 *      500:
 *        description: The User was not logged in
 *
 *
 */

// Owner Login route
router.post("/login", async (req, res) => {
  await userLogin(req.body, [ROLES.CUSTOMER,ROLES.ADMIN], res);
});


// broker registration 
/**
 * @swagger
 * /api/users/register-broker:
 *  post:
 *    summary: Signup for Brokers
 *    tags: [broker]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: The Broker was created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Invalid Input
 *      500:
 *        description: The Broker was not created
 *
 *
 */

//  Registration route Brokers
router.post("/register-broker", async (req, res) => {
  await userRegister(req.body,ROLES.BROKER, res);
});



/**
 * @swagger
 * /api/users/login-broker:
 *  post:
 *    summary: Login for brokers
 *    tags: [broker]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: The User Broker was loggen in
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Invalid Input
 *      500:
 *        description: The User Broker was not logged in
 *
 *
 */

// Owner Login route
router.post("/login-broker", async (req, res) => {
  await userLogin(req.body, ROLES.BROKER, res);
});

module.exports = router;
