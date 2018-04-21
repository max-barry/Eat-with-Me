export default {
    async usernameExists(parent, args, context) {
        const username = args.username;
        const ref = context.usernameRef.doc(username);
        const doc = await ref.get();
        return doc.exists;
    }
};
