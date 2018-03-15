export function responsive(width) {
    if ((width <= 1280) && (width > 1024)) {
        return 'r-xlarge';
    } else if ((width <= 1024) && (width > 768)) {
        return 'r-large';
    } else if ((width <= 600) && (width > 450)) {
        return 'r-medium';
    } else if (width <= 450) {
        return 'r-small';
    } else return null;
}
