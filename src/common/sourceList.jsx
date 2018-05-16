'use strict';
require('./sourceList.scss');

import React from 'react';
import PropTypes from 'prop-types';
import classPrefixer from '../helpers/classPrefixer';
import { dateParser } from '../helpers/dateParser';

const cx = classPrefixer('source-list');

const check = (val) => { return (val || ''); };

export default class SourceList extends React.PureComponent {
    render() {
        const { category, source, published, pubDateDiff, center, percentage } = this.props;
        let krep = ' • ';

        const string =
            (percentage ? ((check(percentage) + '%') + ((category || source || published) ? krep : '')) : '') +
            (category ? (check(category) + ((source || published || pubDateDiff) ? krep : '')) : '') +
            (source ? (check(source) + ((published || pubDateDiff) ? krep : '')) : '') +
            ((published || pubDateDiff) ? check(pubDateDiff ? pubDateDiff : dateParser(published)) : '');

        return (
            <div className={cx('wrapper', ['secondary', center && 'center'])}>{(string)}</div>
        );
    }
}

const { string, bool, number, oneOfType } = PropTypes;
SourceList.propTypes = {
    category: string,
    source: string,
    published: string,
    center: bool,
    percentage: oneOfType([number, bool]),
    pubDateDiff: string
};
