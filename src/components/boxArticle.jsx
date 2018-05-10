'use strict';
require('./boxArticle.scss');

import React from 'react';
import PropTypes from 'prop-types';
import classPrefixer from '../helpers/classPrefixer';
import sizeMe from 'react-sizeme';
import Article from './article';
import { cmpApiHoc } from '../helpers/cmpApiHoc';

const cx = classPrefixer('box-article');

export function responsive(width) { //fix that later
    if (width > 800) {
        return 'r-ba-large';
    } else if ((width <= 800) && (width > 600)) {
        return 'r-ba-medium';
    } else if ((width <= 600) && (width > 400)) {
        return 'r-ba-small';
    } else if (width <= 400) {
        return 'r-ba-xsmall';
    } else return null;
}

const getArticles = (articles, resp, lineCount) => { //make it better
    let limit = 4;
    let min = false;
    if (resp === 'r-ba-large') {
        limit = 5;
        min = 4;
    } else if (resp === 'r-ba-medium') {
        min = 3;
    }

    let content = [];

    let grid = resp === 'r-ba-small';

    for (let i = 0; i < articles.length; i++) {
        let style = {};

        if (i >= limit) {
            style = { display: 'none' };
        }
        content.push(
            <div key={i} className={cx('single', grid && 'hide')} style={style}>
                <Article data={articles[i]} inBox />
            </div>
        );
    }
    if (min && ((articles.length) < min)) {
        for (let j = articles.length; j < min; j++) {
            content.push(
                <div key={j} className={cx('single', grid && 'hide')} />
            );
        }
    }

    if (articles.length >= 2) {
        content.push(
            <DualArticle key={'d' + 1} articles={articles} grid={grid} num={[0, 1]} firstDual />
        );
        if (articles.length === 3) {
            content.push(
                <DualArticle key={'d' + 2} articles={articles} grid={grid} num={[2, null]} />
            );
        } if (articles.length >= 4) {
            content.push(
                <DualArticle key={'d' + 2} articles={articles} grid={grid} num={[2, 3]} />
            );
        }
    } else {
        content.push(
            <DualArticle key={11} articles={articles} grid={grid} num={[0, null]} />
        );
    }


    return content;
};

const DualArticle = ({ articles, num, grid, firstDual }) => {
    let content = [];

    num.map((n, i) => {
        if (n || n === 0) {
            content.push(
                <div key={i} className={cx('single')}>
                    <Article data={articles[n]} inBox />
                </div>
            );
        } else {
            content.push(<div key={i} className={cx('single')} />);
        }
    });

    return (
        <div className={cx('dual', [!grid && 'hide', firstDual && 'is-first'])}>{content}</div>
    );
};

@cmpApiHoc({ articles: 6, mock: false })
@sizeMe()
export default class BoxArticle extends React.PureComponent {
    render() {
        const { data, size } = this.props;
        let resp = responsive(size.width);

        return (
            <If condition={data}>
                <div className={resp}>
                    <div className={cx('wrapper')}>
                        {getArticles(data, resp)}
                    </div>
                </div>
            </If>
        );
    }
}

const { object, number, array, bool } = PropTypes;
BoxArticle.propTypes = {
    data: array,
    containerWidth: number,
    size: object
};
DualArticle.propTypes = {
    articles: array,
    grid: bool,
    num: array,
    firstDual: bool
};
