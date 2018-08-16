# Najdi.si news componets DEV environment

## How it is structured

- News Components are in src/components folder
- SCSS variables def is in /src/styles/defaults.scss
- Responcive config is in /src/styles/mediaqueries.scss

### DEV environment and export

1. Run `npm install` (installs neccesary packages in node_modules)
2. Run `npm start` (runs dev environment)
3. Run `npm run bundle-dev` (builds dev package in /build folder - uncompressed)
4. Run `npm run bundle-prod` (builds dev package in /build folder - compressed)

### USAGE

1. Copy content of build folder
2. Include `styles/style.css` 
3. Include `nsComponents.js`
4. Include components:
    - `najdisiComponents.showArticleSwitcher('API URL', document.getElementById("main"));`
    - `najdisiComponents.showNormalArticle('API URL', document.getElementById("article"));`
    - `najdisiComponents.showArticleWithSub('API URL', document.getElementById("sub"));`
    - `najdisiComponents.showArticleClusterSub('API URL', document.getElementById("subCluster"));`
    - `najdisiComponents.showBoxArticles('API URL', document.getElementById("box"));`
    - `najdisiComponents.showNormalArticleByData('JSON DATA', document.getElementById("data_article"));`
    - `najdisiComponents.showMenu([], document.getElementById("menu"));`
    - `najdisiComponents.showRecent('API URL', document.getElementById("recent"));`
    - `najdisiComponents.showTopArticles('API URL', document.getElementById("top"));`

### Menu data structure

```json
[
    {
        title: 'N',
        link: 'http://novice.najdi.si'
    },
    {
        title: 'Vroče zgodbe',
        link: '/kategorija/vroce-zgodbe'
    },
    {
        title: 'Slovenija',
        link: '/kategorija/slovenija'
    }
]
```