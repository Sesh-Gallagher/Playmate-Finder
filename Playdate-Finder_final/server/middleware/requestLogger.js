/**
 * Imports the logger module from the '../config/logger.js' file.
 * The logger module is used for logging information about requests in the application.
 */
import logger from '../config/logger.js';

export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    logger.info('Request completed', {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration,
      userId: req.user?.id,
      userRole: req.user?.role
    });
  });

  next();
}
