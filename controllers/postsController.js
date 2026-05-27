import posts from '../data/posts.js';

function index(request, responce) {
    const { title, maxPrepTime } = request.query;
    const prepTimeNumber = Number(prep_time);

    const postsFiltered = posts.filter(post => {
        if (!isNaN(maxPrepTime)) {
            if (post.prep_time > maxPrepTime) {
                return false;
            }
        }
        if (title !== undefined) {
            for (i = 0; i < post.length; i++) {
                const currentTitle = post.title[i];
                if (currentTitle.indexOf(title)) {
                    return true;
                }
            }
            return false;
        }
        return true;
    })
    responce.json(postsFiltered)
}

function show(request, responce) {
    const { id } = request.params;
    const idAsNumber = Number(id.trim());

    const postFound = posts.find(post => {
        return post.id === idAsNumber;
    })

    if (idAsNumber <= 0 || isNaN(idAsNumber)) {
        responce
            .status(400)
            .json({
                error: 'uncorrect ID',
                results: null
            })
        return;
    }

    if (postFound === undefined) {
        responce
            .status(404)
            .json({
                error: 'Resource not found',
                results: null
            })
        return;
    }

    responce.json({
        error: null,
        results: postFound
    })
    return;

}

function store(request, responce) {
    console.log(request.body);
    const { title, prepTime } = request.body;
    const prepTimeAsNumber = Number(prepTime);

    if (isNaN(prepTime) || prepTime <= 0) {
        responce
            .status(400)
            .json({
                error: 'Preparation time must be a valid number',
                results: null
            })
        return;
    }

    if (!title || title.trim() === '') {
        responce.status(400).json({
            error: 'Il campo "name" è obbligatorio',
            results: null
        });
        return;
    }

    responce
        .status(201)
        .json({
            message: 'Creation request',
            data: { title, prepTime }
        })
}

function modify(request, responce) {
    const { id } = request.params;
    const idAsNumber = Number(id.trim());

    const postFound = posts.find(post => {
        return post.id === idAsNumber
    });

    if (idAsNumber <= 0 || isNaN(idAsNumber)) {
        responce
            .status(400)
            .json({
                error: 'uncorrect ID',
                results: null
            })
        return;
    }

    if (postFound === undefined) {
        responce
            .status(404)
            .json({
                error: 'Resource not found',
                results: null
            })
        return;
    }

    responce.json({
        error: null,
        results: `Modification request for post with id: ${idAsNumber}`

    });
}

function destroy(request, responce) {
    const { id } = request.params;
    const idAsNumber = Number(id.trim());

    const postIndex = posts.indexOf(post =>{
        return post.id === idAsNumber;
    })

    if (idAsNumber <= 0 || isNaN(idAsNumber)) {
        responce
            .status(400)
            .json({
                error: 'uncorrect ID',
                results: null
            })
        return;
    }

    if (postIndex === -1) {
        responce
            .status(404)
            .json({
                error: 'Resource not found',
                results: null
            })
        return;
    }
    posts.splice(postIndex, 1);
    responce.sendStatus(204);
}

export { index, show, store, modify, destroy };