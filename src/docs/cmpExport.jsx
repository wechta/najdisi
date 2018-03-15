import Article from '../components/article';
import ArticleSwitcher from '../components/articleSwitcher';
import ReactDOM from 'react-dom';
import React from 'react';

const showNormalArticle = (title, description, img, url, category, source, published, element) => {
    ReactDOM.render(<Article
        title={title}
        description={description}
        img={img}
        url={url}
        category={category}
        source={source}
        published={published}
    />, element);
};

const showArticleSwitcher = (articles, element) => {
    ReactDOM.render(<ArticleSwitcher articles={articles} />, element);
};

module.exports = {
    showNormalArticle: showNormalArticle,
    showArticleSwitcher: showArticleSwitcher
};
