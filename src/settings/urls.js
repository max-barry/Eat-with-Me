export default {
    REGISTER: {
        pathname: '/register',
        state: { modal: true }
    },
    RESTAURANT_SLUG: {
        pathname: '/restaurant/:slug'
    },
    PROFILE: {
        pathname: '/u/:username',
        hasOwner: true
    },
    PROFILE_COLLECTIONS: {
        pathname: '/u/:username/collections',
        hasOwner: true
    },
    PROFILE_COLLECTIONS_NEW: {
        pathname: '/u/:username/collections/new',
        hasOwner: true
    },
    HOME: {
        pathname: '/'
    }
};
