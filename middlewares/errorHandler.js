function errorHandler(error, request, response, next) {
    console.error(error); 
    
    response.status(500).json({
        error: error.message,
        results: null
    });
}

export default errorHandler;

