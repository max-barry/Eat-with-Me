const resolveFunctions = {
    Query: {
        restaurants(parent, args, context) {
            return context.restaurantRef
                .get()
                .then(snapshot =>
                    snapshot.docs.map(doc =>
                        Object.assign({ id: doc.id }, doc.data())
                    )
                );
        },
        restaurant(parent, args, context) {
            // CHeck we have some sort of argument to find our restaurant
            if (!(args.id || args.slug)) throw new Error('Specify id or slug');

            let query = null;
            const restaurantRef = context.restaurantRef;

            if (args.id) {
                query = restaurantRef.doc(args.id);
            } else {
                query = restaurantRef.where('slug', '==', args.slug).limit(1);
            }

            return query.get().then(snapshot => {
                if (snapshot.empty) throw new Error('Not found');
                const doc = snapshot.docs[0];
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
        }
    },
    Mutation: {
        like(parent, args, context) {
            const db = context.db;
            const ref = db.collection('restaurants').doc(args.id);
            return context.db
                .runTransaction(t => {
                    return t.get(ref).then(doc => {
                        const data = doc.data();
                        data.likes += 1;
                        // Add one person to the city population
                        t.update(ref, { likes: data.likes });
                        return Promise.resolve({ id: doc.id, ...data });
                    });
                })
                .then(result => {
                    return result;
                })
                .catch(err => {
                    console.log('Transaction failure:', err);
                });
        }
    }
};

module.exports = resolveFunctions;

/**
const authors = [
    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' }
];

const posts = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
    { id: 2, authorId: 2, title: 'GraphQL Rocks', votes: 3 },
    { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 }
];

const resolveFunctions = {
    Query: {
        posts() {
            return posts;
        },
        author(_, { id }) {
            return authors.find(author => author.id === id);
        }
    },
    Mutation: {
        upvotePost(_, { postId }) {
            const post = posts.find(post => post.id === postId);
            if (!post) {
                throw new Error(`Couldn't find post with id ${postId}`);
            }
            post.votes += 1;
            // pubsub.publish('postUpvoted', post);
            return post;
        }
    },
    Author: {
        posts(author) {
            return posts.filter(post => post.authorId === author.id);
        }
    },
    Post: {
        author(post) {
            return authors.find(author => author.id === post.authorId);
        }
    }
};
*/
