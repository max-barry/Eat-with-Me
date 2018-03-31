export default {
    getRestaurants(parent, args, context) {
        return context.restaurantRef
            .get()
            .then(snapshot =>
                snapshot.docs.map(doc =>
                    Object.assign({ id: doc.id }, doc.data())
                )
            );
    },
    getRestaurant(parent, args, context) {
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
};
