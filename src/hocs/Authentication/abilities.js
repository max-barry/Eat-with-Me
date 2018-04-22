import { AbilityBuilder, Ability } from '@casl/ability';

import urls from '../../settings/urls';

const defineAbilityForUser = user => {
    const { rules, can, cannot } = AbilityBuilder.extract();

    // Add all profile pages to the list of pages where the user is the owner
    for (const [key, path] of Object.entries(urls)) {
        if (path.hasOwner) {
            can('edit', path.pathname.replace(':username', user.username));
        }
    }

    return new Ability(rules);
};

export default defineAbilityForUser;
