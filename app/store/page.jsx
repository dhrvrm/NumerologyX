'use client';

import { useState, useEffect } from 'react';
import { fetchAllProducts, searchProducts } from '../../lib/appwrite/database';
import ProductCard from '../../components/store/ProductCard.component';

const StorePage = () => {
	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);

	useEffect(() => {
		fetchAllProducts().then(setProducts);
	}, []);

	const handleSearch = async () => {
		const results = await searchProducts(searchTerm);
		setProducts(results);
	};

	const filteredProducts = products.filter(
		(product) =>
			(!selectedCategory || product.categories.includes(selectedCategory)) &&
			(selectedTags.length === 0 ||
				selectedTags.every((tag) => product.tags.includes(tag)))
	);

	return (
		<div>
			<input
				type='text'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder='Search products'
			/>
			<button onClick={handleSearch}>Search</button>

			{/* Add category and tag filters here */}

			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{filteredProducts.map((product) => (
					<ProductCard key={product.$id} product={product} />
				))}
			</div>
		</div>
	);
};

export default StorePage;
