import React, { Component, Fragment } from 'react';
import {
    compose,
    setPropTypes,
    onlyUpdateForKeys,
    withState,
    defaultProps,
    withHandlers,
    lifecycle
} from 'recompose';
import PropTypes from 'prop-types';
import { Spring, animated, config, Keyframes, interpolate } from 'react-spring';
import {
    ChipLabel as Label,
    chipDotClass as dotClass,
    chipDotActiveClass as dotActiveClass,
    chipFocusClass as focusClass,
    chipLabelTextClass as textClass,
    CHIP_EDGE_PADDING,
    CHIP_DOT_DIMENSION,
    CHIP_HEIGHT
} from './Chip.styles';
import { ariaCheckboxProps, requiredPropTypes } from './shared';
import { colors, bs, bsint } from '../../settings/styles';
import { cross as crossSvgPath } from '../SVGs/paths';
import Svg from '../SVGs';
import { cx, css, keyframes } from 'emotion';

// Move these basic update and state handlers to an abstract

class Chip extends Component {
    render() {
        const { checked, onChange, label, ...props } = this.props;
        const checkboxProps = ariaCheckboxProps(checked, onChange, props);
        // We want the tab index on the label not on the checkbox TODO : check roles aren't fucked with here
        delete checkboxProps.tabIndex;

        return (
            <Label
                tabIndex={props.tabIndex || 0}
                htmlFor={checkboxProps.id}
                className={props.className}
                data-checked={checked}
                onClick={checkboxProps.onClick}
                innerRef={ref => (this.ref = ref)}
                onKeyPress={checkboxProps.onKeyPress}
                style={{
                    borderColor: checked ? props.color : colors.grey1
                }}
            >
                <Spring
                    native
                    to={{
                        x: checked ? -1 * CHIP_DOT_DIMENSION - bsint(0.5) : 0
                        // sx: checked ? this.state.sx : 1,
                        // sy: checked ? this.state.sy : 1,
                        // radius: checked ? 0 : '50%'
                    }}
                    config={config.stiff}
                >
                    {/* script={next => (this.label = next)} */}

                    {({ x }) => {
                        // const translation = x.interpolate(
                        //     x => `translate3d(${x}px, 0px, 0)`
                        // );
                        // const scale = sx.interpolate(sx => `scaleX(${sx})`);
                        // console.log(translation);
                        // console.log(scale);
                        delete checkboxProps.onClick;
                        delete checkboxProps.onKeyPress;
                        return (
                            <Fragment>
                                <animated.span
                                    id={props.name}
                                    className={textClass}
                                    style={{
                                        // color: checked ? props.textColor : 'inherit',
                                        transform: x.interpolate(
                                            x => `translate3d(${x}px, 0px, 0)`
                                        )
                                    }}
                                >
                                    {label}
                                </animated.span>
                                <animated.span
                                    {...checkboxProps}
                                    className={cx(
                                        dotClass,
                                        checked ? dotActiveClass : null
                                    )}
                                    style={{
                                        backgroundColor: props.color
                                        //     pointerEvents: checked
                                        //         ? 'none'
                                        //         : 'default',
                                        //     borderRadius: radius.interpolate(
                                        //         r => r
                                        //     ),
                                        //     // transform: interpolate(
                                        //     //     [x, sx, sy],
                                        //     //     (x, sx, sy) =>
                                        //     //         `translate3d(${x}px, 0px, 0) scaleX(${sx}) scaleY(${sy})`
                                        //     // ),
                                        //     transformOrigin: 'left center'
                                    }}
                                />
                            </Fragment>
                        );
                    }}
                </Spring>
                {/* <Keyframes native script={next => (this.dot = next)}>
                {({ x }) => (
                    
                )}
            </Keyframes> */}
            </Label>
        );
    }
}

// ${x.interpolate(
//     x =>
//         `translate3d(${x}px, 0px, 0))} ${sx.interpolate(x => `scale(${x})`)}`
// )`

// const Chip = ({
//     checked,
//     onChange,
//     label,
//     color = colors.secondary,
//     textColor = colors.white,
//     ...props
// }) => {
//     const checkboxProps = ariaCheckboxProps(checked, onChange, props);
//     // We want the tab index on the label not on the checkbox TODO : check roles aren't fucked with here
//     delete checkboxProps.tabIndex;

//     return (
//         <Label
//             onClick={checkboxProps.onClick}
//             onKeyPress={checkboxProps.onKeyPress}
//             tabIndex={props.tabIndex || 0}
//             htmlFor={checkboxProps.id}
//             className={props.className}
//             data-checked={checked}
//             style={{
//                 borderColor: checked ? color : colors.grey1
//             }}
//         >
//             <Spring
//                 native
//                 config={config.gentle}
//                 from={{
//                     backgroundColor: color
//                 }}
//                 to={{
//                     transform: checked ? `scale(20)` : `scale(1)`,
//                     transformLabel: checked
//                         ? `translate3d(-${bs(1.5)}, 0px, 0)`
//                         : `translate3d(0px, 0px, 0)`,
//                     scaleClose: checked ? 'scale(1)' : 'scale(0)'
//                 }}
//             >
//                 {styles => (
//                     <animated.span>
//                         <animated.span
//                             id={props.name}
//                             className={textClass}
//                             style={{
//                                 color: checked ? textColor : 'inherit',
//                                 transform: styles.transformLabel
//                             }}
//                         >
//                             {label}
//                         </animated.span>
//                         <animated.span
//                             className={checkDot}
//                             {...checkboxProps}
//                             style={{
//                                 backgroundColor: styles.backgroundColor,
//                                 transform: styles.transform,
//                                 left: CHIP_EDGE_PADDING,
//                                 transformOrigin: `1px center`,
//                                 pointerEvents: checked ? 'none' : 'default'
//                             }}
//                         />
//                         <animated.span
//                             className={checkDot}
//                             style={{
//                                 transform: styles.scaleClose,
//                                 right: CHIP_EDGE_PADDING,
//                                 backgroundColor: textColor
//                             }}
//                         >
//                             <Svg
//                                 height={CHIP_DOT_DIMENSION * 0.65}
//                                 width="100%"
//                                 fill={color}
//                                 path={crossSvgPath}
//                             />
//                         </animated.span>
//                     </animated.span>
//                 )}
//             </Spring>
//         </Label>
//     );
// };

const enhance = compose(
    defaultProps({
        color: colors.secondary,
        textColor: colors.white
    }),
    setPropTypes({
        ...requiredPropTypes,
        label: PropTypes.string.isRequired,
        color: PropTypes.string,
        textColor: PropTypes.string
    })

    // withHandlers({
    // async startAnimation(next) {

    // this.label(Spring, {
    //     to: {
    //
    //     },
    //
    // });
    // this.container(Spring, { from: { x: -100 }, to: { x: 0 }, config: config.slow })
    // await delay(100)
    // await this.content(Trail, { from: { x: -120, opacity: 0 }, to: { x: 0, opacity: 1 } })
    // this.content(Trail, { to: { x: -120, opacity: 0 } })
    // await delay(500)
    // await this.container(Spring, { to: { x: -100 }, config: config.slow })
    //     }
    // })
);

export default enhance(Chip);
