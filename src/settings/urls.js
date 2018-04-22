export default {
    REGISTER: {
        pathname: `/register`,
        state: { modal: true }
    },
    RESTAURANT_SLUG: {
        pathname: `/restaurant/:slug`
    },
    PROFILE: {
        pathname: `/u/:username`
    },
    PROFILE_COLLECTIONS: {
        pathname: `/u/:username/collections`
    },
    HOME: {
        pathname: `/`
    }
};
