const express = require('express');
const router = express.Router();

router.get('/myRoute', async (req, res) => {
   try {
       res.json({ hello: 'world' });
   } catch (e) {
       console.error(e);
       return res.status(500).send('There was an error processing your request:', e);
   }
});

module.exports = router;