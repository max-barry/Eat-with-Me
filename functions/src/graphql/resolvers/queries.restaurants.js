// const PAGE_DEFAULT_LIMIT = 50;
const PAGE_MAX_LIMIT = 50;

export default {
    async getRestaurants(parent, args, context) {
        // Get the stuff out of the args
        // TODO : Use something else for the cursor (like the ordering unit) because this would fail if the ID is deleted
        let { after, orderBy, limit, includeClosed, includeLandmarks } = args;
        // Make sure that we're not getting asked for too many results
        limit = Math.min(PAGE_MAX_LIMIT, limit);
        // Start building a query
        let query = context.restaurantRef;
        // Do we need to include closed?
        if (!includeClosed) {
            query = query.where('permanently_closed', '==', false);
        }
        // if (!includeLandmarks) {
        //     query = query.where('category_aliases.landmarks', '<', true);
        // }
        // Add the order by
        query = query.orderBy(orderBy, 'desc');
        // Do we need to start after?
        console.log('!!');
        console.log(args);
        console.log('!!');
        if (after) {
            query = query.startAfter(after);
        }
        // Get the restaurants with a limit
        const snapshot = await query.limit(limit).get();
        // Get the snapshot or an empty array
        const restaurants = snapshot.docs || [];
        // Map back the response and ad the doc.id as the ID
        // TODO : I'd love to get rid of this for performance
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
