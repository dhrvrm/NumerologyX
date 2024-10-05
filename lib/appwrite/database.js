import { databases } from '.';
import { getDatabaseID, getProductsCollectionID } from '../constants';
import { Query } from 'appwrite';

export async function fetchAllProducts() {
	try {
		const response = await databases.listDocuments(
			getDatabaseID(),
			getProductsCollectionID()
		);
		return response.documents;
	} catch (error) {
		console.error('Error listing documents:', error);
		throw error;
	}
}

export async function fetchFeaturedProducts() {
	try {
		const response = await databases.listDocuments(
			getDatabaseID(),
			getProductsCollectionID(),
			[Query.equal('featured', true)]
		);
		return response.documents;
	} catch (error) {
		console.error('Error fetching featured products:', error);
		throw error;
	}
}

export async function searchProducts(searchTerm) {
	try {
		const response = await databases.listDocuments(
			getDatabaseID(),
			getProductsCollectionID(),
			[
				Query.search('title', searchTerm),
				Query.search('description', searchTerm),
			]
		);
		return response.documents;
	} catch (error) {
		console.error('Error searching products:', error);
		throw error;
	}
}

export async function fetchProductBySlug(slug) {
	try {
		const response = await databases.listDocuments(
			getDatabaseID(),
			getProductsCollectionID(),
			[Query.equal('slug', slug), Query.limit(1)]
		);
		console.log('\n Slug Fetched:\n', response.documents[0]);

		return response.documents[0];
	} catch (error) {
		console.error('Error fetching product by slug:', error);
		throw error;
	}
}
