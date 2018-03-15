'use strict';
require('./demo.scss');

import React from 'react';
import PropTypes from 'prop-types';

import Article from './article';
import ArticleSwitcher from './articleSwitcher';
import data from './mock.json';
import classPrefixer from '../helpers/classPrefixer';

const cx = classPrefixer('demo');

const getDemoArticles = (articles, keys) => {
    return (
        keys.map((idx, i) =>
                <div key={idx} className={cx('article-regular')} >
                    <Article
                        title={articles[idx].title }
                        description={articles[idx].description}
                        img={articles[idx].img}
                        url={articles[idx].url}
                        category={articles[idx].category}
                        source={articles[idx].source}
                        published={articles[idx].published}
                    />
                </div>
        )
    );
};

const DemoMultiArtcls = ({ count, special, last }) => {
    let content = [];
    for (let i = 0; i < count; i++) {
        content.push(
            <div key={i} className={cx(['box', 'box__small'])}>
                <div className={cx('box__small-inner', ['is-multi', `is-${i}`, special && ' is-special'])}>
                    {'article'}
                </div>
            </div>
        );
    }
    return (
        <div className={cx(['article-selector', 'box'], last && 'box-last')}>{content}</div>
    );
};
const { number, bool } = PropTypes;
DemoMultiArtcls.propTypes = {
    count: number.isRequired,
    special: bool,
    last: bool
};

export default class demo extends React.PureComponent {
    render() {
        const { displayDemo, displayComponents } = this.props;

        const demoContent = (
            <div key={1} className={'ns-demo'}>
                <div className={cx('header')} />
                <div className={cx('wrapper')}>
                    <div className={cx(['ad', 'ad--central', 'box'])}>
                        <div className={cx('box__small-inner')}>{'ad space'}</div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('central')}>
                            <div className={cx('article-slider')}>
                                <ArticleSwitcher articles={data.articles} />
                            </div>

                            <DemoMultiArtcls count={4} />
                            {getDemoArticles(data.articles, [0, 1])}
                            <DemoMultiArtcls count={4} special />

                            {getDemoArticles(data.articles, [2, 3])}

                            <div className={cx(['ad', 'ad--central', 'ad-central-small', 'box'])}>
                                <div className={cx('box__small-inner')}>{'ad space'}</div>
                            </div>

                            {getDemoArticles(data.articles, [4, 5])}

                            <DemoMultiArtcls count={4} last />
                        </div>
                        <div className={cx(['sidebar', 'box'])}>
                            <div className={cx('box__small-inner')}>{'sidebar'}</div>
                        </div>
                    </div>
                </div>
            </div>
        );

        const articles = (
                <div className={'ns-standalone'}>
                    <ArticleSwitcher articles={data.articles} />
                    <Article
                        title={data.articles[0].title}
                        description={data.articles[0].description}
                        img={data.articles[0].img}
                        url={data.articles[0].url}
                        category={data.articles[0].category}
                        source={data.articles[0].source}
                        published={data.articles[0].published}
                    />
                </div>
        );

        return (
            [
                <div key={0}>{displayComponents && articles}</div>,
                <div key={1}>{displayDemo && demoContent}</div>
            ]
        );
    }
}
