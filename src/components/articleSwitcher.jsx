'use strict';
require('./articleSwitcher.scss');

import React from 'react';
import PropTypes from 'prop-types';
import classPrefixer from '../helpers/classPrefixer';
import { cmpApiHoc } from '../helpers/cmpApiHoc';
import Arrow from '../common/arrow';
import SourceList from '../common/sourceList';
import sizeMe from 'react-sizeme';
import { responsive } from './sizeConf';
import NanoClamp from 'nanoclamp';

const cx = classPrefixer('articles-switcher');

const TEXT_LINE_H = 14;

@cmpApiHoc({ articles: 5, mock: false })
@sizeMe({ refreshRate: 16 })
export default class ArticleSwitcher extends React.PureComponent {
    constructor(props) {
        super(props);

        this.supportsTouch = false;
        this.state = this.getIniState(props);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateHeight);
        this.getTxtElHeight(this.containerRef.offsetHeight);
    }

    componentWillReceiveProps(np, ns) {
        const p = this.props;

        // Reseting component if we get another set of data from REST API
        if (Array.isArray(p.data) && Array.isArray(np.data) &&
            !(p.data.length === np.data.length && p.data.every((v, i) => v === np.data[i]))) {
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
                lines = i - 1;
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
        if (props.data && Array.isArray(props.data) && props.data.length) {
            filteredArticles = props.data.filter(art => art.title && art.image && art);
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
            }, 100);
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
        const { size } = this.props;
        const { filtered, selectedEl, isHover, animateClass, lineCount } = this.state;
        const { image, category, channel, published, title, description, linkSeo, pubDateDiff } = filtered[selectedEl];

        let resp = responsive(size.width); //move that somewhere else

        const descElement = filtered.length && lineCount && description.length ?
            <NanoClamp
                key={selectedEl}
                accessibility={false}
                debounce={100}
                is="div"
                lines={lineCount}
                text={description}
            /> : null;

        return (
            <If condition={filtered.length}>
                <div className={resp}>
                    <div className={cx('wrapper')}>
                        <div className={cx('wrapper', animateClass)}>
                            <div className={cx('img-holder', animateClass)}>
                                <a href={linkSeo} target="_blank">
                                    <div className={cx('img-wrap')} style={{ backgroundImage: `url(${image})` }} />
                                </a>
                            </div>
                            <div className={cx('holder', animateClass)}>
                                <div className={cx('wrap')}>
                                    <SourceList category={category} source={channel} published={published} pubDateDiff={pubDateDiff} center={resp === 'r-small'} />
                                    <div className={cx('title', ['title', 'title-coloured'])}>
                                        <a className={linkSeo && 'nsmod-clickable'} href={linkSeo} target="_blank">{title}</a>
                                    </div>
                                    <div ref={this.setRef} className={cx('content', 'text')}>
                                        <div className={cx('text-wrap')}>{descElement}</div>
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

const { array, number, object } = PropTypes;
ArticleSwitcher.propTypes = {
    size: object,
    data: array,
    containerWidth: number
};
