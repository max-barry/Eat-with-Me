// const PAGE_DEFAULT_LIMIT = 50;
const PAGE_MAX_LIMIT = 50;

export default {
    async restaurants(parent, args, context) {
        // Get the stuff out of the args
        // TODO : Use something else for the cursor (like the ordering unit) because this would fail if the ID is deleted
        let { after, orderBy, limit } = args;
        // Make sure that we're not getting asked for too many results
        limit = Math.min(PAGE_MAX_LIMIT, limit);
        // Start building a query
        let query = context.restaurantRef;
        // Do we need to include closed?
        // if (!includeClosed) {
        //     query = query.where('permanently_closed', '==', false);
        // }
        // if (!includeLandmarks) {
        //     query = query.where('is_restaurant', '==', true);
        // }
        // Add the order by. If it startsWith - then it should be descending
        query = query.orderBy(...context.utils.setOrder(orderBy));
        // Do we need to start after?
        if (after) {
            query = query.startAfter(
                await context.restaurantRef.doc(after).get()
            );
        }
        // Get the restaurants with a limit
        const snapshot = await query.limit(limit).get();
        // Get the snapshot or an empty array
        return snapshot.docs.map(doc => ({ likes: 0, ...doc.data() } || []));
    },
    async restaurant(parent, args, context) {
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

        return { ...data.data() };
    }
};
