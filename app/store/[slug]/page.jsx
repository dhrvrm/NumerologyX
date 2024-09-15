'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { fetchProductBySlug } from '../../../lib/appwrite/database'
import StarRating from '../../../components/store/StarRating.component'
import { ProductDescriptionAccordion } from '../../../components/ui/CollapsingAccordion'
import { Minus, Plus } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Skeleton } from '../../../components/ui/skeleton'
import StickyCart from '../_components/StickyCart'
import { useCartStore } from '../../../lib/zustand/cartStore'
import ProductImagesSlider from '../_components/ProductImagesSlider'

const ProductPage = ({ params }) => {
  const { addToCart } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedProduct = sessionStorage.getItem(`product_${params.slug}`)
        if (cachedProduct) {
          setProduct(JSON.parse(cachedProduct))
          setLoading(false)
        } else {
          const productData = await fetchProductBySlug(params.slug)
          setProduct(productData)
          sessionStorage.setItem(`product_${params.slug}`, JSON.stringify(productData))
          setLoading(false)
        }
      } catch (error) {
        console.error('Failed to fetch product:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [params.slug])

  const incrementQuantity = () =>
    setQuantity((prev) =>
      product && prev < product.quantity_available ? prev + 1 : prev
    )

  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleQuantityChange = (e) => setQuantity(Number(e.target.value))

  const handleAddToCart = () => {
    if (product && quantity <= product.quantity_available) {
      addToCart(product, quantity)
      console.log(product, quantity)
    } else {
      alert('Insufficient stock')
    }
  }

  if (loading) {
    return (
      <section className='py-8 antialiased bg-white md:py-16 dark:bg-gray-900'>
        <div className='max-w-screen-xl px-4 mx-auto 2xl:px-0'>
          <div className='lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16'>
            <div className='max-w-md mx-auto shrink-0 lg:max-w-lg'>
              <Skeleton className="aspect-square w-full" />
            </div>
            <div className='mt-6 sm:mt-8 lg:mt-0'>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-40 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!product) return <div>Product not found</div>

  return (
    <section className='py-8 antialiased bg-white md:py-16 dark:bg-gray-900'>
      <div className='max-w-screen-xl px-4 mx-auto 2xl:px-0'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16'>
          <div className='max-w-md mx-auto shrink-0 lg:max-w-lg'>
            <ProductImagesSlider images={product?.images} />
          </div>
          <div className='mt-6 sm:mt-8 lg:mt-0'>
            <h1 className='text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white'>
              {product.title}
            </h1>
            <div className='flex items-center gap-2 mt-2'>
              <StarRating rating={product?.rating} />
            </div>
            <div className='mt-4 sm:items-center sm:gap-4 sm:flex'>
              <div className='flex flex-col items-start gap-4'>
                <div className='px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground'>
                  {`${(
                    ((product.actual_price - product.current_price) /
                      product.actual_price) *
                    100
                  ).toFixed(0)}% OFF`}
                </div>
                <div className='grid gap-1'>
                  <div className='flex items-center gap-2'>
                    <span className='line-through text-muted-foreground'>
                      ₹{product.actual_price.toFixed(2)}
                    </span>
                    <span className='text-2xl font-bold'>
                      ₹{product.current_price.toFixed(2)}
                    </span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    Save ₹
                    {(product.actual_price - product.current_price).toFixed(2)}{' '}
                    on this product
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8'>
              <div className='flex items-center space-x-2'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={decrementQuantity}
                  aria-label='Decrease quantity'
                >
                  <Minus className='w-4 h-4' />
                </Button>
                <Input
                  type='number'
                  min='1'
                  max={product.quantity_available}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className='w-16 text-center'
                  aria-label='Quantity'
                />
                <Button
                  variant='outline'
                  size='icon'
                  onClick={incrementQuantity}
                  aria-label='Increase quantity'
                >
                  <Plus className='w-4 h-4' />
                </Button>
              </div>

              <Button
                className='mt-4 sm:mt-0 bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center px-5 py-2.5 rounded-lg'
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
            <hr className='my-6 border-gray-200 md:my-8 dark:border-gray-800' />
            <p className='mb-6 text-gray-500 dark:text-gray-400'>
              {product.description}
            </p>
            <ProductDescriptionAccordion
              benefits={product?.benefits}
              features={product?.features}
              careInstructions={product?.care_instructions}
            />
          </div>
        </div>
      </div>
      <StickyCart />
    </section>
  )
}

export default ProductPage