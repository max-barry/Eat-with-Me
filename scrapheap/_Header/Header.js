import React from 'react';

import { Link } from 'react-router-dom';
import { withPropsOnChange, compose } from 'recompose';

import urls from '../../settings/urls';
import { AuthenticationConsumer } from '../../hocs/Authentication';
import HeaderLinkLoading from './HeaderLink.loading';

// const DEFAULT_LINKS = [];
// const POST_LOGIN_LINKS = [
//     [urls.PROFILE, 'Profile'],
//     [urls.PROFILE_COLLECTIONS, 'My collections']
// ];
// const PRE_LOGIN_LINKS = [[urls.REGISTER, 'Register']];

// const _userfy = (path, user) =>
//     path.pathname.replace(':username', user.username);

// const buildNavigation = ({
//     user: { user, query, firebaseAuthPreload: preload, ...authObj }
// }) => {
//     const extraLinks = [];
//     const isLoading = preload || query.loading;

//     if (!isLoading && !user) {
//         extraLinks.push(...PRE_LOGIN_LINKS);
//     } else if (!isLoading && user) {
//         const loggedInLinks = POST_LOGIN_LINKS.map(([link, copy]) => [
//             _userfy(link, user),
//             copy
//         ]);

//         extraLinks.push(...loggedInLinks);
//     }

//     return {
//         isLoading,
//         links: [...DEFAULT_LINKS, ...extraLinks]
//     };
// };

// const Header = ({ links, isLoading: headerLinkLoading }) => (
//     <header>
//         <nav>
//             {links.map(([link, copy], i) => (
//                 <Link key={i} to={link}>
//                     {copy}
//                 </Link>
//             ))}
//             {headerLinkLoading && [
//                 <HeaderLinkLoading key={1} />,
//                 <HeaderLinkLoading key={2} />
//             ]}
//         </nav>
//     </header>
// );

// const enhance = compose(
//     AuthenticationConsumer,
//     withPropsOnChange(['user'], buildNavigation)
// );

// export default enhance(Header);
