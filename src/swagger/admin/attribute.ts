/**
 * @swagger
 * tags:
 *   name: Attribute
 *   description: Attribute management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostAttributeBody:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Admin
 *           description: Attribute name
 *     UpdateAttributeBody:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Admin
 *           description: Attribute name
 *     Attribute:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Admin
 *     AttributeListResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Attribute'
 *         total:
 *           type: integer
 *           example: 10
 *     AttributeResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Attribute created successfully
 *         data:
 *           $ref: '#/components/schemas/Attribute'
 */

/**
 * @swagger
 * /api/attribute:
 *   post:
 *     summary: Add Attribute
 *     tags: [Attribute]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostAttributeBody'
 *     responses:
 *       200:
 *         description: Attribute created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttributeResponse'
 */

/**
 * @swagger
 * /api/attribute:
 *   get:
 *     summary: List Attributes
 *     tags: [Attribute]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by attribute name (partial match)
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
 *               $ref: '#/components/schemas/AttributeListResponse'
 */

/**
 * @swagger
 * /api/attribute/{id}:
 *   get:
 *     summary: Get Attribute by ID
 *     tags: [Attribute]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Attribute ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttributeResponse'
 */

/**
 * @swagger
 * /api/attribute/{id}:
 *   patch:
 *     summary: Update Attribute
 *     tags: [Attribute]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Attribute ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAttributeBody'
 *     responses:
 *       200:
 *         description: Attribute updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttributeResponse'
 */

/**
 * @swagger
 * /api/attribute/{id}:
 *   delete:
 *     summary: Delete Attribute
 *     tags: [Attribute]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Attribute ID
 *     responses:
 *       200:
 *         description: Attribute deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Attribute deleted successfully
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostRoleAttributeBody:
 *       type: object
 *       required:
 *         - role_id
 *         - attribute_id
 *       properties:
 *         role_id:
 *           type: string
 *           example: Admin
 *           description: Attribute Role
 *         attribute_id:
 *           type: string
 *           example: Admin
 *           description: Attribute Role
 *     UpdateAttributeBody:
 *       type: object
 *       properties:
 *         role_id:
 *           type: string
 *           example: Admin
 *           description: Attribute Role
 *         attribute_id:
 *           type: string
 *           example: Admin
 *           description: Attribute Role
 *     RoleAttribute:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         role_id:
 *           type: string
 *           example: Admin
 *           description: Attribute Role
 *         attribute_id:
 *           type: string
 *           example: Admin
 *           description: Attribute Role
 *     RoleAttributeListResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RoleAttribute'
 *         total:
 *           type: integer
 *           example: 10
 *     RoleAttributeResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Attribute created successfully
 *         data:
 *           $ref: '#/components/schemas/RoleAttribute'
 */

/**
 * @swagger
 * /api/role-attribute:
 *   post:
 *     summary: Add Attribute
 *     tags: [Attribute]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostRoleAttributeBody'
 *     responses:
 *       200:
 *         description: Attribute created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleAttributeResponse'
 */

/**
 * @swagger
 * /api/role-attribute:
 *   get:
 *     summary: List Attributes
 *     tags: [Attribute]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by attribute name (partial match)
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
 *               $ref: '#/components/schemas/RoleAttributeListResponse'
 */

/**
 * @swagger
 * /api/role-attribute/{id}:
 *   get:
 *     summary: Get Attribute by ID
 *     tags: [Attribute]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Attribute ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleAttributeResponse'
 */

/**
 * @swagger
 * /api/role-attribute/{id}:
 *   patch:
 *     summary: Update Attribute
 *     tags: [Attribute]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Attribute ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAttributeBody'
 *     responses:
 *       200:
 *         description: Attribute updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleAttributeResponse'
 */

/**
 * @swagger
 * /api/role-attribute/{id}:
 *   delete:
 *     summary: Delete Attribute
 *     tags: [Attribute]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Attribute ID
 *     responses:
 *       200:
 *         description: Attribute deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Attribute deleted successfully
 */
