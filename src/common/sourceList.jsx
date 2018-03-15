'use strict';
require('./sourceList.scss');

import React from 'react';
import PropTypes from 'prop-types';
import classPrefixer from '../helpers/classPrefixer';
import { dateParser } from '../helpers/dateParser';

const cx = classPrefixer('source-list');

export default class ArtMetadata extends React.PureComponent {
    render() {
        const { category, source, published, center } = this.props;

        return (
            <div className={cx('wrapper', ['secondary', center && 'center'])}>
                {category &&
                    <div className={cx('cat')}>
                        {category}
                        {(source || published) && <span className={cx('separator')}>&#8226;</span>}
                    </div>
                }
                {source && <div className={cx('source')}>
                    {source}
                    {published && <span className={cx('separator')}>&#8226;</span>}
                </div>}
                {published && <div className={cx('time')}>{dateParser(published)}</div>}
            </div>
        );
    }
}

const { string, bool } = PropTypes;
ArtMetadata.propTypes = {
    category: string,
    source: string,
    published: string,
    center: bool
};
