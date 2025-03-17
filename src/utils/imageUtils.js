export const imageUrlGenerator = (imageRef) => {
    return 'https://cdn.sanity.io/images/nteaegk8/production/' + imageRef.slice(6,-4)+'.jpg'
}