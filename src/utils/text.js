export const capitalizeText = (str) => {
    str = str.split('-').join(' ')
    return str[0].toUpperCase() + str.slice(1);
}