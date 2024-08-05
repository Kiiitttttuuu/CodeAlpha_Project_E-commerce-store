document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>${product.price}</p>
                    <button onclick="addToCart('${product._id}')">Add to Cart</button>
                `;
                productList.appendChild(productDiv);
            });
        });
});

function addToCart(productId) {
    fetch(`/api/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId })
    })
    .then(response => response.json())
    .then(data => alert('Product added to cart!'));
}
