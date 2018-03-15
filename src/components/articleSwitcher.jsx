'use strict';
require('./articleSwitcher.scss');

import React from 'react';
import PropTypes from 'prop-types';
import classPrefixer from '../helpers/classPrefixer';
import Arrow from '../common/arrow';

import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

import SourceList from '../common/sourceList';

import Dimensions from 'react-dimensions';
import { responsive } from './sizeConf';

const cx = classPrefixer('articles-switcher');
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const TEXT_LINE_H = 14;

@Dimensions()
export default class ArticleSwitcher extends React.PureComponent {
    constructor(props) {
        super(props);

        this.supportsTouch = false;
        this.state = this.getIniState(props);
    }

    componentWillMount() {
        this.updateHeight();
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateHeight);
        this.getTxtElHeight(this.containerRef.offsetHeight);
    }

    componentWillReceiveProps(np, ns) {
        const p = this.props;

        // Reseting component if we get another set of articles from REST API
        if (Array.isArray(p.articles) && Array.isArray(np.articles) &&
            !(p.articles.length === np.articles.length && p.articles.every((v, i) => v === np.articles[i]))) {
            this.clearInterval();
            this.setState(this.getIniState(np));
        }
    }

    componentWillUnmount() {
        this.clearInterval();
        window.removeEventListener('resize', this.updateHeight);
        this.containerRef = null;
    }

    updateHeight = () => {
        const height = this.containerRef && this.containerRef.offsetHeight;
        this.getTxtElHeight(height);
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

    getIniState = (props) => {
        const filtered = this.filterData(props);
        return {
            filtered: filtered,
            isHover: true,
            animateClass: '',
            selectedEl: this.getSelectedArticle(filtered, 0),
            lineCount: false
        };
    }

    clearInterval = () => {
        if (this.t) {
            clearTimeout(this.t);
        }
    }

    filterData = (props) => {
        let filteredArticles = [];
        if (props.articles && Array.isArray(props.articles) && props.articles.length) {
            filteredArticles = props.articles.filter(art => art.title && art.img && art);
        }
        return filteredArticles;
    }

    onPrevClick = (ev) => {
        ev.preventDefault();
        if (ev.type === 'touchend') {
            return;
        } else {
            this.setState({isHover: true});
        }
        this.onSwitch(-1);
    }

    onPrevTouch = (ev) => {
        ev.preventDefault();
        if (!this.supportsTouch) {
            this.setState({isHover: false});
            this.supportsTouch = true;
        }
        this.onSwitch(-1);
    }

    onNextClick = (ev) => {
        ev.preventDefault();
        if (ev.type === 'touchend') {
            return;
        } else {
            this.setState({isHover: true});
        }
        this.onSwitch(1);
    }

    onNextTouch = (ev) => {
        ev.preventDefault();
        if (!this.supportsTouch) {
            this.setState({isHover: false});
            this.supportsTouch = true;
        }
        this.onSwitch(1);
    }

    onSwitch = (goTo) => {
        this.setState({
            animateClass: 'switch-start'
        });

        if (!this.t) {
            const selEl = this.getSelectedArticle(this.state.filtered, goTo);

            this.t = setTimeout(() => {
                delete this.t;

                this.setState({
                    animateClass: 'switch-end',
                    selectedEl: selEl
                });
            }, 250);
        }
    }

    getSelectedArticle = (filtered, goTo) => {
        if (!filtered || !Array.isArray(filtered) || !filtered.length) {
            return null;
        } else if (goTo === 1 || goTo === -1) {
            const newSel = this.state.selectedEl + goTo;
            if (newSel === filtered.length) {
                return 0;
            } else if (newSel === -1) {
                return filtered.length - 1;
            } else {
                return newSel;
            }
        } else {
            return 0;
        }
    }

    render() {
        const { containerWidth } = this.props;
        const { filtered, selectedEl, isHover, animateClass, lineCount } = this.state;
        const { img, category, source, published, title, description, url } = filtered[selectedEl];

        let resp = responsive(containerWidth); //move that somewhere else

        return (
            <If condition={filtered.length}>
                <div className={resp}>
                    <div className={cx('wrapper')}>
                        <div className={cx('wrapper', animateClass)}>
                                <div className={cx('img-holder')}>
                                    <a href={url} target="_blank">
                                        <div className={cx('img-wrap')} style={{ backgroundImage: `url(${img})` }} />
                                    </a>
                                </div>
                            <div className={cx('holder')}>
                                <div className={cx('wrap')}>
                                    <SourceList category={category} source={source} published={published} center={resp === 'r-small'} />
                                    <div className={cx('title', ['title', 'title-coloured'])}>
                                        <a className={url && 'nsmod-clickable'} href={url} target="_blank">
                                            <ResponsiveEllipsis
                                                text={title}
                                                maxLine={5}
                                                ellipsis={'...'}
                                                trimRight
                                                basedOn={'letters'}
                                            />
                                        </a>
                                    </div>
                                    <div ref={this.setRef} className={cx('content', 'text')}>
                                        <div className={cx('text-wrap')}>
                                            {lineCount &&
                                                <ResponsiveEllipsis
                                                    text={description}
                                                    maxLine={lineCount}
                                                    ellipsis={'...'}
                                                    trimRight
                                                    basedOn={'letters'}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {(filtered.length > 1) && isHover && [
                            <Arrow key={0} side={'left'} self={this} />,
                            <Arrow key={1} side={'right'} self={this} />
                        ]}
                    </div>
                </div>
            </If>
        );
    }
}

const { array, number } = PropTypes;
ArticleSwitcher.propTypes = {
    articles: array.isRequired,
    containerWidth: number
};
