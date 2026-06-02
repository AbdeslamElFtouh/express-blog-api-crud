function notFound(request, response, next) {
    response.status(404).json({
        error: 'Route not Found',
        results: null
    });
}

export default notFound;

