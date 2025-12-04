/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Role management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostRoleBody:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Admin
 *           description: Role name
 *         description:
 *           type: string
 *           example: Full access to all resources
 *           description: Role description
 *     UpdateRoleBody:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Admin
 *           description: Role name
 *         description:
 *           type: string
 *           example: Updated description
 *           description: Role description
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Admin
 *         description:
 *           type: string
 *           example: Full access to all resources
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           example: ["users.create","users.read","roles.manage"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-03T13:12:01Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-04T13:16:01Z
 *     RoleListResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Role'
 *         total:
 *           type: integer
 *           example: 10
 *     RoleResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Role created successfully
 *         data:
 *           $ref: '#/components/schemas/Role'
 */

/**
 * @swagger
 * /api/role:
 *   post:
 *     summary: Add Role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostRoleBody'
 *     responses:
 *       200:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponse'
 */

/**
 * @swagger
 * /api/role:
 *   get:
 *     summary: List Roles
 *     tags: [Role]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by role search (partial match)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page size for pagination
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleListResponse'
 */

/**
 * @swagger
 * /api/role/{id}:
 *   get:
 *     summary: Get Role by ID
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponse'
 */

/**
 * @swagger
 * /api/role/{id}:
 *   patch:
 *     summary: Update Role
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRoleBody'
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponse'
 */

/**
 * @swagger
 * /api/role/{id}:
 *   delete:
 *     summary: Delete Role
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role deleted successfully
 */
