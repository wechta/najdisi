'use strict';
require('./articleWithSubarticles.scss');

import React from 'react';
import PropTypes from 'prop-types';
import classPrefixer from '../helpers/classPrefixer';
import { cmpApiHoc } from '../helpers/cmpApiHoc';
import Article from './article';
import Arrow from '../common/arrow';
import SourceList from '../common/sourceList';
import NanoClamp from 'nanoclamp';

const cx = classPrefixer('article-with-sub');

const TEXT_LINE_H = 20;
class SubSwitcher extends React.PureComponent {
    constructor(props) {
        super(props);

        this.supportsTouch = false;
        this.state = {
            filtered: this.filterData(props),
            isHover: true,
            translateX: 0,
            lineCount: false,
            lock: false // stupid user protection
        };
    }

    componentDidMount() {
        if(this.state.hasData){
            window.addEventListener('resize', this.updateHeight);
            this.getTxtElHeight(this.containerRef.offsetHeight);
        }
    }

    componentWillUnmount() {
        if (this.t) {
            clearTimeout(this.t);
        }
        window.removeEventListener('resize', this.updateHeight);
        this.containerRef = null;
    }

    updateHeight = () => {
        if(this.state.hasData){
            const height = this.containerRef && this.containerRef.offsetHeight;
            this.getTxtElHeight(height);
        }
    }

    getTxtElHeight = (textElH) => {
        let lines = false;
        for (let i = 1; i <= 20; i++) {
            if ((textElH >= (TEXT_LINE_H * i)) && (textElH < (TEXT_LINE_H * (i + 1)))) {
                lines = i;
                this.setState({ lineCount: lines });
                return;
            }
        }
    }

    setRef = (ref) => {
        this.containerRef = ref;
    };

    filterData = (props) => {
        let filteredArticles = [];
        if (props.data && Array.isArray(props.data) && props.data.length) {
            filteredArticles = props.data.filter(art => art.title && art.image && art);
        }
        return filteredArticles;
    }

    onSlide = () => {
        const { filtered, translateX, lock } = this.state;
        if (!lock) {
            const step = 100 / filtered.length;

            let next = ((translateX - step) < -95) ? 0 : translateX - step;

            if (!this.t) {
                this.t = setTimeout(() => {
                    delete this.t;

                    this.setState({
                        lock: false
                    });
                }, 500);
            }

            this.setState({
                translateX: next,
                lock: true
            });
        }
    }

    onNextClick = (ev) => {
        ev.preventDefault();
        if (ev.type === 'touchend') {
            return;
        } else {
            this.setState({ isHover: true });
        }
        this.onSlide();
    }

    onNextTouch = (ev) => {
        ev.preventDefault();
        if (!this.supportsTouch) {
            this.setState({ isHover: false });
            this.supportsTouch = true;
        }
        this.onSlide();
    }

    render() {
        const { filtered, isHover, lineCount, translateX } = this.state;
        let article, idx;

        return (
            <If condition={filtered.length}>
                <div className={cx('wrapper')}>
                    <div className={cx('holder')}>
                        <div className={cx('sub-transformer')} style={{ width: `${filtered.length * 100}%`, transform: `translateX(${translateX}%)`}} >
                            <For each="article" index="idx" of={filtered}>
                                <div key={`article_${idx}`} className={cx('sub-article')} style={{ flex: `1 1 ${100 / filtered.length}%` }}>
                                    <SourceList category={article.category} source={article.channel} published={article.published} pubDateDiff={article.pubDateDiff} />
                                    <div ref={this.setRef} className={cx('title', 'title')}>
                                        {(lineCount && article.title.length) &&
                                            <NanoClamp
                                                accessibility={false}
                                                debounce={100}
                                                is="div"
                                                lines={lineCount}
                                                text={article.title}
                                            />
                                        }
                                    </div>
                                </div>
                            </For>
                        </div>
                    </div>
                    {(filtered.length > 1) && isHover &&
                        <div className={cx('arrow-holder')}>
                            <Arrow side={'right'} size={'small'} self={this} />
                        </div>
                    }
                </div>
            </If>
        );
    }
}

@cmpApiHoc({ articles: 6, mock: false })
export default class ArticleWithSubarticles extends React.PureComponent {
    render() {
        const { data } = this.props;
        const mainArticleData = data.length ? data[0] : [];
        const subArticleData = data.length ? data.slice(1, data.length + 1) : [];

        const subComponent = <SubSwitcher data={subArticleData} />;

        return (
            <If condition={data.length}>
                <Article data={mainArticleData} subCmp={subComponent} />
            </If>
        );
    }
}

const { array } = PropTypes;
ArticleWithSubarticles.propTypes = {
    data: array
};
