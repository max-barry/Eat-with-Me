import React, { Component } from 'react';
import { Spring, animated } from 'react-spring';
import { interpolate } from 'flubber'; // TODO : Polymorph is a small alternative
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
import { cx, css } from 'emotion';
import { onlyUpdateForKeys } from 'recompose';
import { omit } from 'ramda';
import { colors, dimensions } from '../../settings/styles';

const SvgBase = ({ height, width, children, ...props }) => (
    <svg
        height={height || dimensions.svg}
        width={width || dimensions.svg}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        {...props}
    >
        {children}
    </svg>
);

export const Svg = onlyUpdateForKeys(['path', 'fill'])(
    ({ path, fill = colors.black, ...props }) => (
        <SvgBase {...props}>
            <path d={path} fill={fill} />
        </SvgBase>
    )
);

// TODO : Remove all the silly state stuff and just add a "from" "to" on the parent
class SvgMorphComponent extends Component {
    state = {
        previousPath: this.props.path,
        path: this.props.path,
        previousFill: this.props.fill,
        fill: this.props.fill
    };

    // TODO : Remove the getDerivedState. You can use the props next and previous
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
        const props = omit(['fill', 'path'], this.props);
        const { previousFill, fill, previousPath, path } = this.state;

        const interpolator = interpolate(previousPath, path, {
            maxSegmentLength: 0.1
        });

        return (
            <SvgBase {...props}>
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
            </SvgBase>
        );
    }
}

SvgMorphComponent.propTypes = {
    path: PropTypes.string.isRequired,
    fill: PropTypes.string
};

export const SvgMorph = onlyUpdateForKeys(['path'])(SvgMorphComponent);

export const SvgFromFileComponent = ({ svgClassName, fill, ...props }) => (
    <ReactSVG
        {...props}
        svgClassName={cx(
            css({
                height: dimensions.svg,
                width: dimensions.svg,
                [`& path, & circle, & rect`]: { color: fill, fill }
            }),
            svgClassName
        )}
    />
);

SvgFromFileComponent.propTypes = {
    path: PropTypes.string.isRequired,
    fill: PropTypes.string,
    svgStyle: PropTypes.object,
    svgClassName: PropTypes.string
};

export const SvgFromFile = onlyUpdateForKeys(['path'])(SvgFromFileComponent);
