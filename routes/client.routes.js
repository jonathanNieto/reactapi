const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client.controller');


/* new client */
router.post('/', clientController.create_client_post);

/* get all clients */
router.get('/all', clientController.get_all_clients_get);

/* get one client by id */
router.get('/:id', clientController.get_one_client_get);

/* update one client */
router.put('/:id', clientController.update_client_put)

/* delete one client */
router.delete('/:id', clientController.delete_client_delete);

module.exports = router;
