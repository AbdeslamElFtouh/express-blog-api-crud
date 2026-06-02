import posts from '../data/posts.js';

function filterPosts(query) {
    const {title, maxPrepTime} = query;
    const prepTimeNumber = Number(maxPrepTime);

    const postsFiltered = posts.filter(post => {
        if (!isNaN(prepTimeNumber)) {
            if (post.prep_time > prepTimeNumber) {
                return false;
            }
        }

        if (title !== undefined) {
            if (!post.title.toLowerCase().includes(title.toLowerCase())) {
                return false;
            }
        }
        return true;
    });
    return postsFiltered;
}

function findPostIndexBySlug(slug) {
    const realSlug = slug.trim();
    
    const indexFound = posts.findIndex(post => {
        return post.slug === realSlug;
    });
    
    return indexFound;
}

function validateBody(body) {
    const { title, prep_time, tags, published = false } = body || {};

    if (!title ||
        title.trim() === ''
    ) {
        return {
            error: '"title" is required and must be a non-empty string',
            data: null
        };
    }

    if (typeof prep_time !== 'number' ||
        prep_time < 0
    ) {
        return {
            error: '"prep_time" must be a positive number',
            data: null
        };
    }

    if (!Array.isArray(tags) ||
        tags.length === 0 ||
        tags.some(t => typeof t !== 'string')
    ) {
        return {
            error: '"tags" must be an array of non-empty strings',
            data: null
        };
    }

    if (typeof published !== 'boolean') {
        return {
            error: '"Published" must be a boolean value',
            data: null
        };
    }

    return {
        error: null,
        data: { title, prep_time, tags, published }
    };
}

function generateSlug(post) {
    const postName = post.title.toLowerCase();
    const slug = postName.trim().replaceAll(' ', '-');
    let increment = 0;
    let uniqueSlug;
    let postWithSlug; 
    do {
        uniqueSlug = slug + ((increment === 0) ? '' : `-${increment}`);
        postWithSlug = posts.find(p => p.slug === uniqueSlug);
        increment++;
    } while (postWithSlug !== undefined);
    return uniqueSlug;
}

function generateId() {
    if (posts.length === 0) return 1;
    const lastPost = posts[posts.length - 1];
    return lastPost.id + 1;
}

export { 
    filterPosts, 
    findPostIndexBySlug, 
    validateBody, 
    generateSlug, 
    generateId, 
};