const express = require('express');
const auth = require('../middlewares/auth');
const rankingController = require('../controllers/ranking.controller');

const router = express.Router();

router.get('/', auth(), rankingController.getAllUsers);
router.get('/loser', auth(), rankingController.getLoser);
router.get('/winner', auth(), rankingController.getWinner);

module.exports = router;

/*
1. router.get('/') => retorna ranking de tots el jugadors per percentatge exit
2. router.get('/loser')=> retorna pitjor precentatje d¡exit
2. router.get('/winner')=> retorna millor precentatje d¡exit
*/

/**
 * @swagger
 * tags:
 *   name: Ranking
 *   description: Retrieval of ranking
 */

/**
 * @swagger
 * /ranking:
 *   get:
 *     summary: Get the ranking
 *     description: Only admins can retrieve the ranking.
 *     tags: [Ranking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /ranking/loser:
 *   get:
 *     summary: Get the loser
 *     description: Only admins can retrieve the ranking.
 *     tags: [Ranking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RankingUser'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /ranking/winner:
 *   get:
 *     summary: Get the winner
 *     description: Only admins can retrieve the ranking.
 *     tags: [Ranking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RankingUser'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
