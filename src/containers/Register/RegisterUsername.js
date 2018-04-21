import React from 'react';

import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { object, string } from 'yup';
import { withFormik, Field, Form } from 'formik';

import { CHECK_USERNAME_EXISTS } from '../../data/graphql.usernames/queries/checkUsernameExists';
import { SET_USER_USERNAME } from '../../data/graphql.usernames/mutations/setUsername';
import { GET_USER_PROFILE } from '../../data/graphql.users/queries/getUser';
import urls from '../../settings/urls';

const USERNAME_MIN_LENGTH = 3;

const usernameValidationSchema = ({ client, ...props }) =>
    object({
        username: string()
            .required()
            .min(USERNAME_MIN_LENGTH)
            .test(
                'taken',
                'Is taken',
                username =>
                    !username || username.length < USERNAME_MIN_LENGTH
                        ? true
                        : client
                              .query({
                                  query: CHECK_USERNAME_EXISTS,
                                  variables: { username }
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
        { props: { client, user, history }, setSubmitting, ...actions }
    ) =>
        client
            .mutate({
                mutation: SET_USER_USERNAME,
                variables: {
                    user: user.id,
                    username: username
                },
                update: (proxy, { data: { setUsername } }) => {
                    // Read the data from our cache for this query.
                    console.log('Updaing');
                    const currentUser = proxy.readQuery({
                        query: GET_USER_PROFILE,
                        variables: { id: user.id }
                    });
                    console.log(currentUser);
                    currentUser.user.username = username;
                    console.log(currentUser);
                    // Mutate it with the new username
                    proxy.writeQuery({
                        query: GET_USER_PROFILE,
                        data: currentUser
                    });
                }
            })
            .then(({ data: { setUsername: saved } }) => {
                console.log('in then');
                if (saved) return history.push(urls.HOME);
                // TODO : Raise errors
                setSubmitting(false);
            })
            .catch(err => {
                setSubmitting(false);
                console.error(err);
            })
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

const enhancer = compose(withApollo, withRouter, formikEnhancer);

export default enhancer(RegisterUsername);
