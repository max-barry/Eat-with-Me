export default {
    Query: {
        googleplace: async (_, { place_id }) => {
            if (!place_id) return null;

            try {
                const service = new window.google.maps.places.PlacesService(
                    document.createElement('div')
                );

                const placeDetail = await new Promise((resolve, reject) => {
                    service.getDetails({ placeId: place_id }, (place, status) =>
                        resolve(place)
                    );
                });

                return {
                    ...placeDetail,
                    id: place_id,
                    __typename: 'GooglePlace'
                };
            } catch (e) {
                // TODO : Handle the error
                console.error(e);
                return null;
            }
        }
    }
};
