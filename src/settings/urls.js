import mapValues from 'lodash/mapValues';
import isString from 'lodash/isString';

const USER_PARAM = ':username';

const urls = {
    REGISTER: {
        pathname: '/register',
        state: { modal: true }
    },
    RESTAURANT_SLUG: {
        pathname: '/restaurant/:slug'
    },
    PROFILE: {
        pathname: `/u/${USER_PARAM}`,
        hasOwner: true
    },
    PROFILE_COLLECTIONS: {
        pathname: `/u/${USER_PARAM}/collections`,
        hasOwner: true
    },
    PROFILE_COLLECTIONS_NEW: {
        pathname: `/u/${USER_PARAM}/collections/new`,
        hasOwner: true
    },
    HOME: {
        pathname: '/'
    }
};

export default mapValues(urls, (value, key) => {
    // If it's a path with a username then
    // add a convenience method to add the username from the user
    if (value.hasOwner) {
        // Add the convenience method
        value.userfy = user =>
            value.pathname.replace(
                USER_PARAM,
                // We may pass in a username or a user object so check if it's a string
                // and if it isn't (it's a user object) grab the username property
                isString(user) ? user : user.username
            );
    }
    return value;
});
