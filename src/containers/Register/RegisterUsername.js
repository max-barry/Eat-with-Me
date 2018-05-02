import React from 'react';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { object, string } from 'yup';
import { withFormik, Field, Form } from 'formik';
import { CHECK_USERNAME_EXISTS } from '../../graphql/graphql.usernames/queries';
import { SET_USER_USERNAME } from '../../graphql/graphql.usernames/mutations';
import { GET_USER_PROFILE } from '../../graphql/graphql.users/queries';
import urls from '../../settings/urls';
import { withAuthenticationConsumer } from '../../hocs/Authentication';

const USERNAME_MIN_LENGTH = 3;
const USERNAME_VALID_CHARACTERS = /[^a-zA-Z0-9]/;

const usernameValidationSchema = ({ client, ...props }) =>
    object({
        username: string()
            .required()
            .min(USERNAME_MIN_LENGTH)
            .test(
                'special',
                "Username can't include special characters",
                username => !USERNAME_VALID_CHARACTERS.test(username)
            )
            .test(
                'taken',
                'Is taken',
                username =>
                    !username ||
                    username.length < USERNAME_MIN_LENGTH ||
                    !USERNAME_VALID_CHARACTERS.test(username)
                        ? true
                        : client
                              .query({
                                  query: CHECK_USERNAME_EXISTS,
                                  variables: { username },
                                  fetchPolicy: 'network-only'
                              })
                              .then(query => !query.data.usernameExists)
            )
    });

const formikEnhancer = withFormik({
    displayName: 'SetUsername',
    validationSchema: usernameValidationSchema,
    mapPropsToValues: props => ({
        username: ''
    }),
    handleSubmit: (
        { username },
        {
            props: { client, auth: { user }, history },
            setSubmitting,
            ...actions
        }
    ) => {
        console.log(user);
        return client
            .mutate({
                mutation: SET_USER_USERNAME,
                variables: {
                    user: user.id,
                    username: username
                },
                update: (proxy, { data: { setUsername } }) => {
                    // Read the data from our cache for this query.
                    const currentUser = proxy.readQuery({
                        query: GET_USER_PROFILE,
                        variables: { id: user.id }
                    });
                    currentUser.user.username = username;
                    // Mutate it with the new username
                    proxy.writeQuery({
                        query: GET_USER_PROFILE,
                        data: currentUser
                    });
                }
            })
            .then(({ data: { setUsername: saved } }) => {
                if (saved) return history.push(urls.HOME);
                // TODO : Raise errors
                setSubmitting(false);
            })
            .catch(err => {
                setSubmitting(false);
                console.error(err);
            });
    }
});

const RegisterUsername = ({ errors, isSubmitting }) => (
    <Form>
        <Field name="username" />

        {errors.username}

        <button type="submit" disabled={isSubmitting}>
            Submit
        </button>
    </Form>
);

const enhancer = compose(
    withApollo,
    withRouter,
    withAuthenticationConsumer,
    formikEnhancer
);

export default enhancer(RegisterUsername);
