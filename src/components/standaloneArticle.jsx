'use strict';

import React from 'react';
import Article from './article';
import { cmpApiHoc } from '../helpers/cmpApiHoc';

@cmpApiHoc({ articles: 1, noArray: true, mock: false })
export default class StandAloneArticle extends React.PureComponent {
    render() {
        return (
            <Article {...this.props} />
        );
    }
}
