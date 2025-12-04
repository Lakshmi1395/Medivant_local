/**
 *  @swagger
 *  /api/healthCheck:
 *    get:
 *      summary: Health Check API
 *      tags:
 *        - System
 *      description: Returns API health status.
 *      responses:
 *        '200':
 *          description: Successful health response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Health check data working
 *                required:
 *                  - message
 *              example:
 *                message: "Health check data working"
 * 
 */