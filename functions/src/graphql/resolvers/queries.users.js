import { createUser } from '../../firebase/fireauth/functions';

export default {
    async user(parent, args, context) {
        const uid = args.id;
        const docRef = context.userRef.doc(uid);
        // Get the user
        let doc = await docRef.get();
        // If it doesn't exist then create a new user ID
        if (!doc.exists) {
            // Wait for that transaction to complete
            await createUser({ uid });
            // Get the UID that's been created
            let doc = await docRef.get();
        }
        // Return the doc
        return {
            id: doc.id,
            ...doc.data()
        };
    }
};
