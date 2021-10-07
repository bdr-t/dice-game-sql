const express = require('express');
const auth = require('../middlewares/auth');
const playersController = require('../controllers/players.controller');

const router = express.Router();

// router.get('/', function (req, res) {
//   res.send('user');
// });

router.post('/', auth(), playersController.createUser);
router.get('/', auth(), playersController.getAllUsers);

router.get('/:id', auth(), playersController.getUser);
router.put('/:id', auth(), playersController.updateUser);
router.delete('/:id', auth(), playersController.deleteGames);
router.post('/:id', auth(), playersController.createGame);

module.exports = router;

/*
1. TODO router.post('/') => crear jugador 
2. TODO router.put('/') => modifica el nom jugador
3. TODO router.post('/:id/games') => jugar partida
4. TODO router.delete('/:id:games') => elimina jocs del jugadore
5. TODO router.get('/') => retorna tots els jugadors amb percentatje exits
6. TODO router.get('/:id:games) => retorna llista de juagades per jugador
*/

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Players management and retrieval
 */

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Get all users
 *     description: Only admins can retrieve all users.
 *     tags: [Players]
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
 *   post:
 *     summary: Create a player
 *     description: Only admins can create other users.
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: fake name
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 */

/**
 * @swagger
 * /players/{id}:
 *   post:
 *     summary: Plag game
 *     description: Only admin can play
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: User name
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Game'
 *       "400":
 *         $ref: '#/components/responses/InexistentName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *     summary: Get a user
 *     description: Only admins can fetch other users.
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: User name
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/InexistentName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'

 *
 *   put:
 *     summary: Update a user name
 *     description: Only admins can update other users.
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: User name
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 * 
 *   delete:
 *     summary: Delete user games
 *     description: Only admins can update other users.
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: User name
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/InexistentName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   

 */
