'use strict';
require('./sourceList.scss');

import React from 'react';
import PropTypes from 'prop-types';
import classPrefixer from '../helpers/classPrefixer';
import { dateParser } from '../helpers/dateParser';

const cx = classPrefixer('source-list');

const checkLength = (text) => {
    let string = text;
    let tL = string.length;

    if (tL >= 40) { string = string.substring(0, 40); }

    return string;
};

export default class SourceList extends React.PureComponent {
    render() {
        const { category, source, published, pubDateDiff, center, percentage } = this.props;

        const baseUrl = window.location.protocol + '//' + window.location.host;

        return (
            <div className={cx('wrapper', ['secondary', center && 'center'])}>
                {percentage &&
                    <div className={cx('percent')}>
                        {`${percentage}%`}
                        {(category || source || published) && <span className={cx('separator')}>&#8226;</span>}
                    </div>
                }
                {category &&
                    <div className={cx('cat')}>
                        <a href={baseUrl + '/kategorija/' + category.toLowerCase()} target="_self">{checkLength(category)}</a>
                        {(source || published || pubDateDiff) && <span className={cx('separator')}>&#8226;</span>}
                    </div>
                }
                {source && <div className={cx('source')}>
                    <a href={baseUrl + '/novice/najdi/vse/vir/' + source} target="_self">{checkLength(source)}</a>
                    {(published || pubDateDiff) && <span className={cx('separator')}>&#8226;</span>}
                </div>}
                {(published || pubDateDiff) && <div className={cx('time')}>{pubDateDiff ? pubDateDiff : dateParser(published)}</div>}
            </div>
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
