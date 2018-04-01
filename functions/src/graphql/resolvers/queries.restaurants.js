export default {
    async getRestaurants(parent, args, context) {
        // Get all the restaurants
        const snapshot = await context.restaurantRef.get();
        const restaurants = snapshot.docs || [];
        return restaurants.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async getRestaurant(parent, args, context) {
        const { id, slug } = args;
        // Check we have some sort of argument to find our restaurant
        if (!(id || slug)) context.throwBadRequest();

        const ref = context.restaurantRef;
        let query, data;

        // If it's a slug then use a where
        if (slug) {
            query = await ref
                .where('slug', '==', slug)
                .limit(1)
                .get();
            if (query.empty) context.throwMissing();
            data = query.docs[0];
        } else {
            data = await ref.doc(id).get();
            if (!data.exists) context.throwMissing();
        }

        return {
            id: data.id,
            ...data.data()
        };
    }
};
