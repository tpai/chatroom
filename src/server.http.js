import express from 'express';
import http from 'http';
import path from 'path';

const port = (__SERVER_PORT__ || 8080);
const app = express();
const server = http.createServer(app);

const root = path.resolve(__dirname, '../www');
app.use(express.static(root));
app.get('*', (req, res) => {
    res.sendFile(path.join(root, 'index.html'));
});
server.listen(port);

export default server;
