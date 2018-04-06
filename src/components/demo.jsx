'use strict';
require('./demo.scss');

import React from 'react';
import PropTypes from 'prop-types';

import StandaloneArticle from './standaloneArticle';
import ArticleWithSubarticles from './articleWithSubarticles';

import ArticleSwitcher from './articleSwitcher';
import BoxArticle from './boxArticle';

import data from './mock.json';
import classPrefixer from '../helpers/classPrefixer';

const cx = classPrefixer('demo');


const getDemoArticles = (articles, keys) => {
    return (
        keys.map((idx, i) => {
            const showVideo = idx % 2 === 1;
            return (
                <div key={idx} className={cx('article-regular')} >
                    <StandaloneArticle showVideo={showVideo} />
                </div>
            );
        })
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


export default class Demo extends React.PureComponent {
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

                            <ArticleSwitcher />

                            <div className={cx('spacer')} />
                            <BoxArticle />

                            <div className={cx('spacer')} />

                            <ArticleWithSubarticles />

                            <div className={cx('spacer')} />

                            {false && <DemoMultiArtcls count={4} special />}

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
                {true && <ArticleSwitcher />}
                {true && <ArticleWithSubarticles /> }
                {true && <StandaloneArticle showVideo /> }
                {true && <BoxArticle />}
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

const { bool, number } = PropTypes;
Demo.propTypes = {
    displayDemo: bool,
    displayComponents: bool
};
DemoMultiArtcls.propTypes = {
    count: number.isRequired,
    special: bool,
    last: bool
};
