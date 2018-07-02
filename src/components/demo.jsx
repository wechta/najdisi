'use strict';
require('./demo.scss');

import React from 'react';
import PropTypes from 'prop-types';

import StandaloneArticle from './standaloneArticle';
import ArticleWithSubarticles from './articleWithSubarticles';

import ArticleSwitcher from './articleSwitcher';
import BoxArticle from './boxArticle';

import NavBar from './navBar';

import data from './mock.json';
import classPrefixer from '../helpers/classPrefixer';

const cx = classPrefixer('demo');

const urlMock = 'http://demo6733620.mockable.io/';

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

const menuArray = [
    {
        title: 'N',
        link: 'http://novice.najdi.si'
    },
    {
        title: 'Vroče zgodbe',
        link: '/kategorija/vroce-zgodbe'
    },
    {
        title: 'Slovenija',
        link: '/kategorija/slovenija'
    },
    {
        title: 'Regionalne novice',
        link: '/kategorija/regionalne-novice'
    },
    {
        title: 'Svet',
        link: '/kategorija/svet'
    },
    {
        title: 'Gospodarstvo',
        link: '/kategorija/gospodarstvo'
    },
    {
        title: 'Šport',
        link: '/kategorija/sport'
    },
    {
        title: 'Kronika',
        link: '/kategorija/kronika'
    },
    {
        title: 'Zanimivosti',
        link: '/kategorija/zanimivosti'
    },
    {
        title: 'Avtomobilizem',
        link: '/kategorija/avtomobilizem'
    },
    {
        title: 'Znanost in IT',
        link: '/kategorija/znanost-in-it'
    },
    {
        title: 'Kultura',
        link: '/kategorija/kultura'
    },
    {
        title: 'Lepota in zdravje',
        link: '/kategorija/lepota-in-zdravje'
    },
    {
        title: 'Vreme',
        link: 'http://vreme.alpha.najdi.si'
    },
    {
        title: 'Seznam virov',
        link: 'http://novice.alpha.najdi.si/seznamvirov'
    }
];


export default class Demo extends React.PureComponent {
    render() {
        const { displayDemo, displayComponents } = this.props;

        const demoContent = (
            <div key={1} className={'ns-demo'}>
                <div className={cx('header')} />

                <div className={cx('navbar')}>
                    <NavBar data={menuArray} />
                </div>

                <div className={cx('wrapper')}>

                    <div className={cx(['ad', 'ad--central', 'box'])}>
                        <div className={cx('box__small-inner')}>{'ad space'}</div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('central')}>

                            <ArticleSwitcher apiUrl={urlMock} />

                            <div className={cx('spacer')} />
                            <BoxArticle apiUrl={urlMock} />

                            <div className={cx('spacer')} />

                            <ArticleWithSubarticles apiUrl={urlMock} />

                            <div className={cx('spacer')} />

                            {false && <DemoMultiArtcls apiUrl={urlMock} count={4} special />}

                            {getDemoArticles(data.articles, [2, 3])}

                            <div className={cx(['ad', 'ad--central', 'ad-central-small', 'box'])}>
                                <div className={cx('box__small-inner')}>{'ad space'}</div>
                            </div>

                            {getDemoArticles(data.articles, [4, 5])}

                            <DemoMultiArtcls apiUrl={urlMock} count={4} last />
                        </div>
                    </div>
                </div>
            </div>
        );

        const articles = (
            <div className={'ns-standalone'}>
                {true && <ArticleSwitcher apiUrl={urlMock} />}
                {true && <ArticleWithSubarticles apiUrl={urlMock} /> }
                {true && <StandaloneArticle apiUrl={urlMock} showVideo /> }
                {true && <BoxArticle apiUrl={urlMock} />}
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
