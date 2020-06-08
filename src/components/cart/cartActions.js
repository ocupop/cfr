import { useRecoilState, useRecoilValue } from 'recoil'

export function addVariantToCart(variantId, quantity) {
  if (variantId === '' || !quantity) {
    console.error('Selection and quantity are required.')
    return
  }

}