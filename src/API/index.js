export const getOrder = () =>{
    return (
    fetch('//dummyjson.com/carts/1')
    .then(res => res.json())
)
}

export const getRevenues = () =>{
    return (
        fetch('//dummyjson.com/products')
        .then(res => res.json())
    )
}
export const getBooks = () => {
    return (
        fetch('//dummyjson.com/products')
        .then(res => res.json())
    )
}

export const getMessages = () => {
    return (
        fetch('//dummyjson.com/products')
        .then(res => res.json())
    )
}