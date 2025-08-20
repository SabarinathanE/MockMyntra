export const  PreLoadWishList = () => {
    import("./Pages/WishList/WishList")
}

export const PreLoadCart = () => {
    import("./Pages/Cart/Cart")
}

export const navVariables = ["MEN", "WOMEN", "KIDS", "HOME", "BEAUTY", "GENZ", "STUDIO"]

// For Product Page
export const selectVisibleProducts = (state) => {

  let products = state.Products.allproduct;
  let searchTerm = state.Products.searchedProduct;
  let sortedPrice = state.Products.SelectedPrice;
  let SelectedCategory = state.Products.SelectedCategory;
 
  // if(SelectedCategory.length === 0) {
  //   products;
  // } else if(SelectedCategory === 'Men') {
  //   products = 
  // }
  
  if(searchTerm.trim()) {
    products = products.filter((item) =>
    item.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  }
  
  if(sortedPrice === 'lowtohigh') {
    products = [...products].sort((a,b) => a.price - b.price)
  } else if(sortedPrice === 'hightolow') {
    products = [...products].sort((a,b) => b.price - a.price)
  }
  
  return products;
} 

// For Login Page
export const handleChange = (e, dispatcher, storeLoginDetails) => {
  let {name, value} = e.target;
  dispatcher(storeLoginDetails({name, value}))
}


