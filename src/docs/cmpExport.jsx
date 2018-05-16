import StandaloneArticle from '../components/standaloneArticle';
import ArticleSwitcher from '../components/articleSwitcher';
import ArticleWithSubarticles from '../components/articleWithSubarticles';
import BoxArticle from '../components/boxArticle';

import ReactDOM from 'react-dom';
import React from 'react';

const showNormalArticle = (apiUrl, element) => {
    ReactDOM.render(<StandaloneArticle apiUrl={apiUrl} />, element);
};

const showArticleSwitcher = (apiUrl, element) => {
    ReactDOM.render(<ArticleSwitcher apiUrl={apiUrl} />, element);
};

const showArticleWithSub = (apiUrl, element) => {
    ReactDOM.render(<ArticleWithSubarticles apiUrl={apiUrl} />, element);
};

const showBoxArticles = (apiUrl, element) => {
    ReactDOM.render(<BoxArticle apiUrl={apiUrl} />, element);
};

const showNormalArticleByData = (jsonData, element) => {
    ReactDOM.render(<StandaloneArticle jsonData={jsonData} />, element);
};

module.exports = {
    showNormalArticle: showNormalArticle,
    showArticleSwitcher: showArticleSwitcher,
    showArticleWithSub: showArticleWithSub,
    showBoxArticles: showBoxArticles,
    showNormalArticleByData: showNormalArticleByData
};
