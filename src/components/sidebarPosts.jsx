'use strict';
require('./sidebarPosts.scss');

import React from 'react';
import PropTypes from 'prop-types';
import classPrefixer from '../helpers/classPrefixer';
import { cmpApiHoc } from '../helpers/cmpApiHoc';
import SourceList from '../common/sourceList';

const cx = classPrefixer('sidebarposts');

const getPosts = ( data, recentPosts ) => {
    return (
        data.map((d, i) =>
            <div key={i} className={cx('post', (i === (data.length - 1)) && 'last')}>
                <div className={cx('p-source')}>
                    <SourceList percentage={!recentPosts && 13} category={d.category} source={d.channel} published={d.published} pubDateDiff={d.pubDateDiff} />
                </div>
                <div className={cx('p-title')}>
                    <a className={d.linkSeo && 'nsmod-clickable'} href={d.linkSeo} target="_blank">{d.title}</a>
                </div>
            </div>
        )
    );
};

//RecentPosts or MostRead posts.

@cmpApiHoc({ articles: 5, mock: false })
export default class RecentPosts extends React.PureComponent {
    render() {
        const { data, title, recentPosts } = this.props;

        return (
            <div className={cx('wrapper')}>
                <div className={cx('title', recentPosts ? 'recent' : 'mostread')}>{title}</div>
                {(data && data.length) && getPosts(data, recentPosts)}
            </div>
        );
    }
}

const { object, string, bool, number } = PropTypes;
RecentPosts.propTypes = {
    data: object,
    title: string,
    recentPosts: bool,
    limit: number
};
