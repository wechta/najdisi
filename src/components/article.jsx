/*TODO:
    - text trunctate
*/

'use strict';
require('./article.scss');

import React from 'react';
import PropTypes from 'prop-types';
import classPrefixer from '../helpers/classPrefixer';
import { responsive } from './sizeConf';
import SourceList from '../common/sourceList';
import ImageVideo from '../common/imgVideo';
import sizeMe from 'react-sizeme';
import NanoClamp from 'nanoclamp';

const cx = classPrefixer('article');

const TEXT_LINE_H = 14;

@sizeMe()
export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasData: this.checkdata(props),
            lineCount: false
        };
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
        if ((props.title && props.image) || (props.data && props.data.title && props.data.image)) {
            return true;
        }
        return false;
    }

    render() {
        const { subCmp, data, inBox, size, showVideo } = this.props;
        const { hasData, lineCount } = this.state;
        let resp = responsive(size.width); //move that somewhere else

        return (
            <If condition={hasData}>
                <div className={resp}>
                    <div className={cx('wrapper', inBox && 'inbox')}>
                        <div className={cx('img-holder', inBox && 'inbox')}>
                            <ImageVideo image={data.image} video={data.video} imgLink={data.linkSeo} showVideo={showVideo} />
                        </div>
                        <div className={cx('holder', [subCmp && 'has-item', inBox && 'inbox'])}>
                            <div className={cx('wrap', subCmp && 'has-item')}>
                                <SourceList category={data.category} source={data.channel} published={data.published} pubDateDiff={data.pubDateDiff} />
                                <div className={cx('title', ['title', inBox && 'inbox'])}>
                                    <a className={data.linkSeo && 'nsmod-clickable'} href={data.linkSeo} target="_blank">{data.title}</a>
                                </div>
                                <div ref={this.setRef} className={cx('content', 'text')}>
                                    <div className={cx('text-wrap')}>
                                        {(lineCount && data.description.length) &&
                                            <NanoClamp
                                                accessibility={false}
                                                debounce={100}
                                                is="div"
                                                lines={lineCount}
                                                text={data.description}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                            {subCmp &&
                                [
                                    <div key={0} className={cx('item--border')} />,
                                    <div key={1} className={cx('item--wrapper')}>
                                        <div className={cx('item--holder')}>
                                            {subCmp}
                                        </div>
                                    </div>
                                ]
                            }
                        </div>
                    </div>
                </div>
            </If>
        );
    }
}

const { bool, object, element } = PropTypes;
Article.propTypes = {
    size: object,
    data: object,
    subCmp: element,
    inBox: bool,
    showVideo: bool
};
