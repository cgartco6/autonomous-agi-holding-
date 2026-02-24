const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/payments', require('./routes/payments'));
app.use('/api/blockchain', require('./routes/blockchain'));
app.use('/api/market', require('./routes/market'));
app.use('/api/ai', require('./routes/ai-loops'));
app.use('/api/clients', require('./routes/clients'));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Backend running on port ${PORT}`));
