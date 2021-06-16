import app from './app';
import config from './config/config';

// Initiate http server
app.listen(config.server.port, (): void => {
  console.log(
    `Server is running on ${config.server.hostname}:${config.server.port}`
  );
});
