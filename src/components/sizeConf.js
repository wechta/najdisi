export function responsive(width) {
    if (width > 660) {
        return 'r-xlarge';
    } else if ((width <= 660) && (width > 600)) {
        return 'r-large';
    } else if ((width <= 600) && (width > 450)) {
        return 'r-medium';
    } else if (width <= 450) {
        return 'r-small';
    } else return null;
}
