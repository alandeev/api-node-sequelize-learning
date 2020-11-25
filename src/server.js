require('dotenv').config();
const app = require('./app');

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running in the port ${process.env.SERVER_PORT} 🚀`);
});
