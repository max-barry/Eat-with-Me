import React, { Component } from 'react';
import { Spring, animated } from 'react-spring';
import { interpolate } from 'flubber'; // Polymorph is a small alternative

class Svg extends Component {
    state = {
        previousPath: this.props.path,
        path: this.props.path,
        previousFill: this.props.fill,
        fill: this.props.fill
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        return prevState.path !== nextProps.path
            ? {
                  ...prevState,
                  previousPath: prevState.path,
                  previousFill: prevState.fill,
                  path: nextProps.path,
                  fill: nextProps.fill
              }
            : null;
    }

    render() {
        const { height = 16, width = 16, ...props } = this.props;

        const { previousFill, fill, previousPath, path } = this.state;

        const interpolator = interpolate(previousPath, path, {
            maxSegmentLength: 0.1
        });

        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                height={height}
                width={width}
                {...props}
            >
                <Spring reset native from={{ t: 0 }} to={{ t: 1 }}>
                    {({ t }) => (
                        <animated.path
                            d={t.interpolate(interpolator)}
                            fill={t.interpolate({
                                range: [0, 1],
                                output: [previousFill, fill]
                            })}
                        />
                    )}
                </Spring>
            </svg>
        );
    }
}

export default Svg;
