export default {
    async collections(parent, args, context) {
        const { user, username } = args;

        if (!user && !username)
            context.throwBadRequest('Username or user required');

        let query = context.collectionRef;

        if (username) {
            query = query.where('username', '==', username);
        } else {
            query = query.where('user', '==', user);
        }

        const querySnapshot = await query.get();

        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
};
