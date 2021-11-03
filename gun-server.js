const http = require('http');
const gun = require('gun');
require('gun/sea');

const PORT = process.env.PORT || 8080;

const server = http
  .createServer()
  .listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

gun({ web: server, localStorage: false, radisk: true });
