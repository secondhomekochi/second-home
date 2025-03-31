export const imageUrlGenerator = (imageRef) => {
    return 'https://cdn.sanity.io/images/m72dalv4/production/' + imageRef.slice(6,-4)+'.jpg'
}