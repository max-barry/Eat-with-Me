export default {
    async getUserProfile(parent, args, context) {
        const uid = args.uid;
        // Get the user
        const doc = await context.userRef.doc(uid).get();
        // If it doesn't exist then throw
        if (!doc.exists) context.throwMissing();
        // Otherwise return the doc
        return {
            uid,
            ...doc.data()
        };
    }
};
