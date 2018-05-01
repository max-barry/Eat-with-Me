import React, { Component } from 'react';
import Script from 'react-load-script';
import { Query } from 'react-apollo';

import { GOOGLE_MAPS_SCRIPT_URL } from './constants';
import { GET_GOOGLE_PLACE } from '../../data/graphql.state/googlemaps/queries';

const withGooglePlaces = get_place_id => BaseComponent => {
    class WithGooglePlaces extends Component {
        state = { hasLoadedMaps: false };
        place_id = typeof get_place_id === 'function'
            ? get_place_id(this.props)
            : get_place_id;
        render() {
            return (
                <div>
                    <Script
                        url={GOOGLE_MAPS_SCRIPT_URL}
                        // onCreate={this.handleScriptCreate.bind(this)}
                        // onError={this.handleScriptError.bind(this)}
                        onLoad={() => this.setState({ hasLoadedMaps: true })}
                    />
                    <Query
                        query={GET_GOOGLE_PLACE}
                        variables={{ place_id: this.place_id }}
                        skip={!this.state.hasLoadedMaps}
                    >
                        {({ loading, error, data }) => {
                            console.log(loading);
                            console.log(data);
                            return (
                                <BaseComponent
                                    GooglePlace={this.props.place_id}
                                    {...this.props}
                                />
                            );
                        }}
                    </Query>
                </div>
            );
        }
    }
    return WithGooglePlaces;
};

export default withGooglePlaces;

// {
/*  */
// }

// export default function withSubscription(WrappedComponent, selectData) {
//     // ...and returns another component...
//     return class extends React.Component {
//         constructor(props) {
//             super(props);
//             this.handleChange = this.handleChange.bind(this);
//             this.state = {
//                 data: selectData(DataSource, props)
//             };
//         }

//         componentDidMount() {
//             // ... that takes care of the subscription...
//             DataSource.addChangeListener(this.handleChange);
//         }

//         componentWillUnmount() {
//             DataSource.removeChangeListener(this.handleChange);
//         }

//         handleChange() {
//             this.setState({
//                 data: selectData(DataSource, this.props)
//             });
//         }

//         render() {
//             // ... and renders the wrapped component with the fresh data!
//             // Notice that we pass through any additional props
//             return <WrappedComponent data={this.state.data} {...this.props} />;
//         }
//     };
// }
