export default {
    async user(parent, args, context) {
        const uid = args.id;
        // Get the user
        const doc = await context.userRef.doc(uid).get();
        // If it doesn't exist then throw
        if (!doc.exists) context.throwMissing();
        // Otherwise return the doc
        return {
            id: doc.id,
            ...doc.data()
        };
    }
};
