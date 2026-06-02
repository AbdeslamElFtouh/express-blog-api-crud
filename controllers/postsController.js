import posts from '../data/posts.js';
import { filterPosts, findPostIndexBySlug, validateBody, generateSlug, generateId } from '../utils/posts.js';

function index(request, response, next) {
    const filteredList = filterPosts(request.query);

    response.json({
        error: null,
        results: filteredList
    });
}

function show(request, response, next) {
    const { slug } = request.params;
    const realSlug = slug.trim();

    const postFound = posts.find(post => {
        return post.slug === realSlug;
    })

    if (postFound === undefined) {
        response
            .status(404)
            .json({
                error: 'Resource not found',
                results: null
            })
        return;
    }

    const { id, ...otherProperties } = postFound;

    response.json({
        error: null,
        results: otherProperties
    });
}

function store(request, response, next) {
    const validation = validateBody(request.body);
    if (validation.error) {
        response
            .status(400).json({
                error: validation.error,
                results: null
            });
        return;
    }

    const { title, prep_time, tags, published } = validation.data;

    const newPost = {
        id: generateId(),
        title,
        prep_time,
        tags,
        slug: null,
        published
    };

    newPost.slug = generateSlug(newPost);

    posts.push(newPost);

    response
        .status(201)
        .json({
            error: null,
            results: newPost
        });
}

function modify(request, response, next) {
    const postIndex = findPostIndexBySlug(request.params.slug);

    if (postIndex === -1) {
        response.status(404).json({
            error: 'Resource not found',
            results: null
        });
        return;
    }

    const validation = validateBody(request.body);
    if (validation.error) {
        response.status(400).json({
            error: validation.error,
            results: null
        });
        return;
    }

    const { title, prep_time, tags, published } = validation.data;
    const oldPost = posts[postIndex];
    const postUpdated = { ...oldPost, title, prep_time, tags, published };

    if (title !== oldPost.title) {
        postUpdated.slug = generateSlug(postUpdated);
    }
    posts.splice(postIndex, 1, postUpdated);

    response.status(200).json({
        error: null,
        results: postUpdated
    });
}

function destroy(request, response, next) {
    const postIndex = findPostIndexBySlug(request.params.slug);

    if (postIndex === -1) {
        response
            .status(404)
            .json({
                error: 'Resource not found',
                results: null
            })
        return;
    }
    posts.splice(postIndex, 1);
    response.sendStatus(204);
    console.log(posts)
}

export { index, show, store, modify, destroy };





