export default {
    updateLikes(parent, args, context) {
        const { db, restaurantRef, userRef } = context;
        const targetRestaurant = restaurantRef.doc(args.id);
        const targetUser = userRef.doc(args.uid);
        const increment = args.increment;

        return db.runTransaction(async transaction => {
            // Fetch from the server
            const restaurant = await transaction.get(targetRestaurant);
            const user = await transaction.get(targetUser);

            // Fetch the current data records
            const restaurantData = restaurant.data();
            const userData = user.data();

            // Check if the user has already liked or disliked
            // TODO : Move to a proper graphql validator (if that exists)
            const commit =
                // The user has no relationship with the restaurant OR
                !(restaurant.id in userData.likes) ||
                // The user's increment is opposite to their current total
                (restaurant.id in userData.likes &&
                    userData.likes[restaurant.id] !== increment);

            if (commit) {
                // Update some values on the local objects
                restaurantData.likes += increment ? 1 : -1;
                userData.likes[restaurant.id] = increment;

                // Update the restaurant with the like
                transaction.update(targetRestaurant, {
                    likes: restaurantData.likes
                });

                // Update the list of restaurants the user likes
                transaction.update(targetUser, {
                    [`likes.${restaurant.id}`]: increment
                });
            }

            // Return the restaurant and user
            return {
                user: { id: user.id, ...userData },
                restaurant: { id: restaurant.id, ...restaurantData }
            };
        });
    }
};
