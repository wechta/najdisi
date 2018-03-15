const getPublishedString = (type, value) => {
    let tString;
    if (value === 0 && type === 'm') {
        return 'Pravkar objavljeno';
    } else if (value === 1) {
        if (type === 'm') tString = 'minuto';
        else if (type === 'h') tString = 'uro';
        else tString = 'dnevom';
        return `Pred 1 ${tString}`;
    } else if (value === 2) {
        if (type === 'm') tString = 'minutama';
        else if (type === 'h') tString = 'urama';
        else tString = 'dnevoma';
        return `Pred 2 ${tString}`;
    } else {
        if (type === 'm') tString = 'minutami';
        else if (type === 'h') tString = 'urami';
        else tString = 'dnevi';
        return `Pred ${value} ${tString}`;
    }
};

export const dateParser = (dateString) => {
    const articleDate = new Date(dateString);
    if (!articleDate) return null;

    let publishedStr;
    const now = Date.now();
    const mDiff = Math.floor((now - articleDate) / 60000);
    const hDiff = Math.floor((now - articleDate) / 3600000);
    const dDiff = Math.floor((now - articleDate) / 86400000);

    if (mDiff < 60) {
        publishedStr = getPublishedString('m', mDiff);
    } else if (hDiff < 24) {
        publishedStr = getPublishedString('h', hDiff);
    } else {
        publishedStr = getPublishedString('d', dDiff);
    }

    return publishedStr;
};
