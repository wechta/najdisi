import StandaloneArticle from '../components/standaloneArticle';
import ArticleSwitcher from '../components/articleSwitcher';
import ArticleWithSubarticles from '../components/articleWithSubarticles';
import BoxArticle from '../components/boxArticle';
import NavBar from '../components/navBar';
import SidebarPosts from '../components/sidebarPosts';

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

const showArticleClusterSub = (apiUrl, element) => {
    ReactDOM.render(<ArticleWithSubarticles apiUrl={apiUrl} subsFromCluster />, element);
};

const showBoxArticles = (apiUrl, element) => {
    ReactDOM.render(<BoxArticle apiUrl={apiUrl} />, element);
};

const showNormalArticleByData = (jsonData, element) => {
    ReactDOM.render(<StandaloneArticle jsonData={jsonData} />, element);
};

const showMenu = (menuData, element) => {
    ReactDOM.render(<NavBar data={menuData} />, element);
};

const showRecent = (apiUrl, element) => {
    ReactDOM.render(<SidebarPosts title={'Pravkar objavljeno'} apiUrl={apiUrl} recentPosts />, element);
};

const showTopArticles = (apiUrl, element) => {
    ReactDOM.render(<SidebarPosts title={'Najbolj brano'} apiUrl={apiUrl} />, element);
};

module.exports = {
    showNormalArticle: showNormalArticle,
    showArticleSwitcher: showArticleSwitcher,
    showArticleWithSub: showArticleWithSub,
    showArticleClusterSub: showArticleClusterSub,
    showBoxArticles: showBoxArticles,
    showNormalArticleByData: showNormalArticleByData,
    showMenu: showMenu,
    showRecent: showRecent,
    showTopArticles: showTopArticles
};
