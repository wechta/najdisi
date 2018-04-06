import StandaloneArticle from '../components/standaloneArticle';
import ArticleSwitcher from '../components/articleSwitcher';
import ArticleWithSubarticles from '../components/articleWithSubarticles';
import BoxArticle from '../components/boxArticle';

import ReactDOM from 'react-dom';
import React from 'react';

const showNormalArticle = (apiUrl, element) => {
    ReactDOM.render(<StandaloneArticle />, element);
};

const showArticleSwitcher = (apiUrl, element) => {
    ReactDOM.render(<ArticleSwitcher />, element);
};

const showArticleWithSub = (apiUrl, element) => {
    ReactDOM.render(<ArticleWithSubarticles />, element);
};

const showBoxArticles = (apiUrl, element) => {
    ReactDOM.render(<BoxArticle />, element);
};

module.exports = {
    showNormalArticle: showNormalArticle,
    showArticleSwitcher: showArticleSwitcher,
    showArticleWithSub: showArticleWithSub,
    showBoxArticles: showBoxArticles
};
