/*TODO:
    - text trunctate
*/

'use strict';
require('./article.scss');

import React from 'react';
import PropTypes from 'prop-types';

import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

import classPrefixer from '../helpers/classPrefixer';

import Dimensions from 'react-dimensions';
import { responsive } from './sizeConf';

import SourceList from '../common/sourceList';

const cx = classPrefixer('article');
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const TEXT_LINE_H = 14;
@Dimensions()
export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasData: this.checkdata(props),
            lineCount: false
        };
    }

    componentWillMount() {
        this.updateHeight();
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateHeight);
        this.getTxtElHeight(this.containerRef.offsetHeight);
    }

    componentWillReceiveProps(np, ns) {
        const hasData = this.checkdata(np);
        if (hasData !== ns.hasData) {
            this.setState({ hasData: hasData });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateHeight);
        this.containerRef = null;
    }

    updateHeight = () => {
        const height = this.containerRef && this.containerRef.offsetHeight;
        this.getTxtElHeight(height);
    }

    getTxtElHeight = (textElH) => {
        let lines = false;
        for (let i = 1; i <= 20; i ++) {
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

    checkdata(props) {
        if (props.title && props.img) {
            return true;
        }
        return false;
    }

    render() {
        const { title, description, img, url, category, source, published, containerWidth } = this.props;
        const { hasData, lineCount } = this.state;
        let resp = responsive(containerWidth); //move that somewhere else

        return (
            <If condition={hasData}>
                <div className={resp}>
                    <div className={cx('wrapper')}>
                        <div className={cx('img-holder')}>
                            <a href={url} target="_blank">
                                <div className={cx('img-wrap')} style={{backgroundImage: `url(${img})`}} />
                            </a>
                        </div>
                        <div className={cx('holder')}>
                            <div className={cx('wrap')}>
                                <SourceList category={category} source={source} published={published} />
                                <div className={cx('title', 'title')}>
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
                </div>
            </If>
        );
    }
}

const { string, bool, number } = PropTypes;
Article.propTypes = {
    title: string.isRequired,
    description: string,
    img: string.isRequired,
    url: string,
    category: string,
    source: string,
    published: string,
    inSlider: bool,
    animate: string,
    containerWidth: number,
    containerHeight: number
};
