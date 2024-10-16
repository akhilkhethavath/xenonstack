exports.errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); 
    const statusCode = err.status || 500; 
    const message = err.message || 'Something went wrong'; 
    res.status(statusCode).json({
        success: false,
        error: message
    });
};
