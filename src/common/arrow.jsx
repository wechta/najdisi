'use strict';
require('./arrow.scss');

import React from 'react';
import PropTypes from 'prop-types';
import classPrefixer from '../helpers/classPrefixer';

import arrowPNG from '../assets/png/arrow-right.png';

const cx = classPrefixer('arrow');

export default class Arrow extends React.PureComponent {
    render() {
        const { side, size, self } = this.props;
        let handler = {},
            content = [];
        if (side && self) {
            if (side === 'left') {
                handler = {
                    click: self.onPrevClick,
                    touchEnd: self.onPrevTouch
                };
            } else {
                handler = {
                    click: self.onNextClick,
                    touchEnd: self.onNextTouch
                };
            }

            content = (
                <div className={cx('click', [`is-${side}`, 'clickable', size && `${size}`])} onClick={handler.click} onTouchEnd={handler.touchEnd}>
                    <img className={cx('arrow', [`is-${side}`, size && `${size}`])} src={arrowPNG} />
                </div>
            );
        }
        return content;
    }
}

const { string, object } = PropTypes;
Arrow.propTypes = {
    side: string.isRequired,
    size: string,
    self: object.isRequired
};
