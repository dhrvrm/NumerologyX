// Store catalogue. Previously fetched from Appwrite; now edited here directly.
// TODO: Prices, stock and descriptions below are placeholders — update them
// with the real values before deploying.

const placeholder = (product) => ({
	rating: 5,
	featured: false,
	quantity_available: 10,
	specifications: [],
	benefits: [],
	features: [],
	care_instructions: [],
	contents: [],
	legal_info: '',
	...product,
});

export const products = [
	placeholder({
		$id: 'pyrite-raw-stone',
		slug: 'pyrite-raw-stone',
		title: 'Pyrite Raw Stone',
		description:
			'Natural raw pyrite, traditionally associated with wealth, abundance and protection.',
		images: ['/images/products/pyrite.webp'],
		categories: ['Raw Stone'],
		current_price: 999,
		actual_price: 1499,
		featured: true,
	}),
	placeholder({
		$id: 'crystal-quartz-raw-stone',
		slug: 'crystal-quartz-raw-stone',
		title: 'Crystal Quartz Raw Stone',
		description:
			'Natural clear quartz, known as the master healer, for clarity and energy amplification.',
		images: ['/images/products/crystal.webp'],
		categories: ['Raw Stone'],
		current_price: 799,
		actual_price: 1199,
	}),
	placeholder({
		$id: 'rose-quartz-raw-stone',
		slug: 'rose-quartz-raw-stone',
		title: 'Rose Quartz Raw Stone',
		description:
			'Natural rose quartz, the stone of love, for harmony in relationships.',
		images: ['/images/products/rose-quarts.webp'],
		categories: ['Raw Stone'],
		current_price: 799,
		actual_price: 1199,
		featured: true,
	}),
	placeholder({
		$id: 'pyrite-pendant',
		slug: 'pyrite-pendant',
		title: 'Pyrite Pendant',
		description: 'Energised pyrite pendant for prosperity and confidence.',
		images: ['/images/products/pyrite.webp'],
		categories: ['Pendant'],
		current_price: 699,
		actual_price: 999,
	}),
	placeholder({
		$id: '5-mukhi-rudraksha-mala',
		slug: '5-mukhi-rudraksha-mala',
		title: '5 Mukhi Rudraksha Mala',
		description: 'Authentic 5 Mukhi Rudraksha mala for meditation and peace.',
		images: ['/images/products/rudraksha.webp'],
		categories: ['Rudraksha', 'Mala'],
		current_price: 1499,
		actual_price: 2199,
		featured: true,
	}),
	placeholder({
		$id: '5-mukhi-rudraksha-pendant',
		slug: '5-mukhi-rudraksha-pendant',
		title: '5 Mukhi Rudraksha Pendant',
		description: 'Authentic 5 Mukhi Rudraksha pendant for calm and focus.',
		images: ['/images/products/rudraksha.webp'],
		categories: ['Rudraksha', 'Pendant'],
		current_price: 699,
		actual_price: 999,
	}),
	placeholder({
		$id: 'rose-quartz-mandarin-duck-pair',
		slug: 'rose-quartz-mandarin-duck-pair',
		title: 'Rose Quartz Mandarin Duck Pair',
		description:
			'Rose quartz mandarin duck pair, a classic symbol of love and togetherness.',
		images: ['/images/products/rose-quarts.webp'],
		categories: ['Decor'],
		current_price: 1299,
		actual_price: 1899,
	}),
	placeholder({
		$id: 'rose-quartz-8mm-round-bead-bracelet',
		slug: 'rose-quartz-8mm-round-bead-bracelet',
		title: 'Rose Quartz 8mm Round Bead Bracelet',
		description: 'Rose quartz 8mm bead bracelet for love and emotional balance.',
		images: ['/images/products/rose-quarts.webp'],
		categories: ['Bracelet'],
		current_price: 599,
		actual_price: 899,
	}),
	placeholder({
		$id: 'natural-crystal-tree-amethyst',
		slug: 'natural-crystal-tree-amethyst',
		title: 'Natural Crystal Tree - Amethyst',
		description: 'Amethyst crystal tree for calm, intuition and positive energy.',
		images: ['/images/products/crystal.webp'],
		categories: ['Tree', 'Decor'],
		current_price: 1199,
		actual_price: 1699,
	}),
	placeholder({
		$id: 'natural-crystal-tree-rose-quartz',
		slug: 'natural-crystal-tree-rose-quartz',
		title: 'Natural Crystal Tree - Rose Quartz',
		description: 'Rose quartz crystal tree for love and harmony at home.',
		images: ['/images/products/rose-quarts.webp'],
		categories: ['Tree', 'Decor'],
		current_price: 1199,
		actual_price: 1699,
	}),
	placeholder({
		$id: 'natural-crystal-tree-green-aventurine',
		slug: 'natural-crystal-tree-green-aventurine',
		title: 'Natural Crystal Tree - Green Aventurine',
		description: 'Green aventurine crystal tree for luck and prosperity.',
		images: ['/images/products/crystal.webp'],
		categories: ['Tree', 'Decor'],
		current_price: 1199,
		actual_price: 1699,
	}),
];

export const getAllProducts = () => products;

export const getFeaturedProducts = () => products.filter((p) => p.featured);

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);
