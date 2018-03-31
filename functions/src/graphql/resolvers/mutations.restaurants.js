export default {
    updateLikes(parent, args, context) {
        const { db, restaurantRef, userRef } = context;
        const targetRestaurant = restaurantRef.doc(args.id);
        const targetUser = userRef.doc(args.uid);

        return db.runTransaction(async transaction => {
            // Fetch from the server
            const restaurant = await transaction.get(targetRestaurant);

            // Crack what comes back
            const restaurantData = restaurant.data();
            restaurantData.likes += 1;

            // Update the restaurant with the like
            transaction.update(targetRestaurant, {
                likes: restaurantData.likes
            });

            // Update the list of restaurants the user likes
            transaction.update(targetUser, {
                [`likes.${restaurant.id}`]: true
            });

            // Return the restaurant
            return { id: restaurant.id, ...restaurantData };
        });
        // const doc = await transaction.get(ref);
        // console.log(doc);
        // const data = doc.data();
        // data.likes += 1;

        // transaction.update();

        // return {};

        // return db
        //     .runTransaction(t => {
        //         return t.get(ref).then(doc => {
        //
        //
        //             // Add one person to the city population
        //
        //             return Promise.resolve();
        //         });
        //     })
        //     .then(result => result)
        //     .catch(err => console.error(err));
    }
};
