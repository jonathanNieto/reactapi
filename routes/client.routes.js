const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client.controller');
const auth = require('../middlewares/auth.middleware');


/* new client */
router.post('/', auth.is_authenticated,  clientController.create_client_post);

/* get all clients */
router.get('/all', auth.is_authenticated,  clientController.get_all_clients_get);

/* get one client by id */
router.get('/:id', auth.is_authenticated,  clientController.get_one_client_get);

/* update one client */
router.put('/:id', auth.is_authenticated,  clientController.update_client_put)

/* delete one client */
router.delete('/:id', auth.is_authenticated,  clientController.delete_client_delete);

module.exports = router;
