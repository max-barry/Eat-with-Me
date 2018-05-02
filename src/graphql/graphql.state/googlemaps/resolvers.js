export default {
    Query: {
        googleplace: async (_, { place_id }) => {
            if (!place_id) return null;

            try {
                const service = new window.google.maps.places.PlacesService(
                    document.createElement('div')
                );

                // TODO : Handle the error
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
                console.error(e);
                return null;
            }
        }
    }
};
