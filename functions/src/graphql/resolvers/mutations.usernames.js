export default {
    async setUsername(parent, args, context) {
        const { username, user } = args;
        const ref = context.usernameRef.doc(username);
        // Add the database the username and user
        const newUsername = await ref.set({ user });
        // TODO : Catch the error
        return true;
    }
};

// TODO : Set a thing that saves username to user object
