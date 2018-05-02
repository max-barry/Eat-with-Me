import gql from 'graphql-tag';

export const GET_GOOGLE_PLACE = gql`
    query GetGooglePlace($place_id: ID) {
        googleplace(place_id: $place_id) @client {
            name
        }
    }
`;

// import { CameraRoll } from 'react-native';

// const cameraRoll = {
//   Query: {
//     cameraRoll: async (_, { assetType }) => {
//       try {
//         const media = await CameraRoll.getPhotos({
//           first: 20,
//           assetType,
//         });

//         return {
//           ...media,
//           id: assetType,
//           __typename: 'CameraRoll',
//         };
//       } catch (e) {
//         console.error(e);
//         return null;
//       }
//     },
//   },
// };
