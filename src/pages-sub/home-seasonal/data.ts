import type { IProduct } from '~/data/ocean'

export interface ISeasonalFilter {
  id: string
  label: string
}

export interface ISeasonalProduct extends IProduct {
  seasonalCategory: 'fish' | 'shell' | 'shrimp-crab' | 'bundle'
  featured?: boolean
  secondaryTag?: string
  sales: number
  quote?: string
  badge?: string
}

export const seasonalFilters: ISeasonalFilter[] = [
  { id: 'all', label: '全部' },
  { id: 'fish', label: '时令鲜鱼' },
  { id: 'shell', label: '贝类活鲜' },
  { id: 'shrimp-crab', label: '虾蟹礼遇' },
  { id: 'bundle', label: '超值套装' },
]

export const seasonalProducts: ISeasonalProduct[] = [
  {
    id: 'seasonal-1',
    seasonalCategory: 'fish',
    name: '大西洋冰鲜三文鱼',
    origin: '挪威峡湾',
    spec: '',
    price: 128,
    unit: '/kg',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLmTBsIUNdX_hD1nQYDLgKsoD4-JqXz7NrUGHpeNe7A1w3bHNZP24ZLwrlMFZkQOVGLFzXLqfNGyClSLXUaj9CFwrL2MaOwz4M8mkgr1mSzj95tcm3Esa9V9jOiwvTYqyyD563UxP_3r-bvJQ6qYLPyEZPIS3l7KpFRUPpVIsNHxjTjuAHtS9p7S31oi_1D1_ue7Qif41hbKl-vmWmB2huB-pUMwLZbXcvtNypuu4oqHqJl9ZUZWbomXvQSGkxWU2q04JQFwmw0XtX',
    tag: '限时抢购',
    tagStyle: 'fresh',
    secondaryTag: '今日抵港',
    sales: 1280,
  },
  {
    id: 'seasonal-2',
    seasonalCategory: 'shrimp-crab',
    name: '深海大明虾 (L级)',
    origin: '阿根廷深海',
    spec: '',
    price: 89,
    unit: '/盒',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpoaWmNNHpSbqYnGiQfmgxopV62IhLrRdpj40KYkXhcqq6k33un4YcpCOtdGXWgPr0L0xIhv3RluqtXHCrQycy7FsXZgci3jpokzKmN7sucTL6G1xMPRh8qNO_yVYIKup2aTedtxRsedQsTbvh51wg31JO3T4bWflkNYWBNzPZ8kh3uTxWpYrDksLfGN7fj5AleQJ_LCPn0JZAOrBWjfSA5OEZRqGHfBalaItfCzneS6XNMNddin2VWOKFSlGElXcSV1qbYsG44_C2',
    tag: '时令必点',
    tagStyle: 'signature',
    sales: 960,
  },
  {
    id: 'seasonal-3',
    seasonalCategory: 'shell',
    name: '北海道扇贝王',
    origin: '日本北海道',
    spec: '',
    price: 156,
    unit: '/6只',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXUL6IFJ832YZtUsUFd7pr_Zn3n7kdawxpJOwvJJIGa5Y5dqU1sRLKiphte-9eefWuiL653OKP1yw7c6ebCIrmI08ZRlxYdbY0aPRQ8nSg-RpAm2YckByb-kXt7_lhh5v6Hzcf0z55-G0e5CSbFO1QhUDj4e3o_aOyXtAb8efqlkBpV26p65GuD4N33rYDamgkfZEoCFgtD5SySqp8CkgeglfOvpmf6WVINuzq1bEKtOx-O680yyCRN7HfW4a1qop17Qw35mH5cLaI',
    tag: '极速达',
    tagStyle: 'default',
    sales: 720,
  },
  {
    id: 'seasonal-4',
    seasonalCategory: 'fish',
    name: '鲜活多宝鱼',
    origin: '胶东半岛',
    spec: '',
    price: 65,
    unit: '/条',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnZbsBPH_Tlx3ftA0hJRFlmPzgwgPfiKFJx-Qh2peA73ZeY-_W8sUEMlFVpU_1MiuzArIxPzJpwoWMHwaNCyedj7T2zxsPqAQRKpaC3jVPxsm6Cz537cJahg6-CbkelhpLLYS1TNBJxjV5YU0h95rBmzB_VkkDfP2LPh8PS_tYOexvD2L2bxgcrUi6bjR5oxgM8EBq7I0DDIIDtMDk-VrjK4PAj_xYArk6jr4GEdaWvQUSdZ8Nj8G-3txxlCTi6eakvhuzU95oNhrz',
    tag: '主厨推荐',
    tagStyle: 'signature',
    sales: 540,
  },
  {
    id: 'seasonal-5',
    seasonalCategory: 'bundle',
    featured: true,
    name: '时令滋补海鲜礼盒',
    origin: '',
    spec: '',
    price: 888,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1fvoCkeNsA0Xt0RnqoeYv1ndhxUKhejjsF6uC_7im_IHEATtrAvA1rR6fMNa6ZRJgt5oGtIlefhvTVd89l3Bx0IvY4RaUUkFLlw-ZsPkFvX4YniYiOTDIkcueQrVX-yIGx1YWJ6lSSXhNOpIJSqqwvUAsCk9WZ2_svZOc2sXMLg7EEK64B2qwZc1XTEB9dSqcX2FQy-WCJwv16LGHH_KK8jwqUN2KbwW-WjBY-cy4uPlmquTcl0jZZqZXkh1lKpNHFpRMPQkKsdTN',
    tag: '尊享装',
    tagStyle: 'fresh',
    quote: '“汇聚四海菁华，礼赠臻选之作”',
    badge: '尊享装',
    sales: 320,
  },
]

export type SeasonalSort = 'composite' | 'sales' | 'price-asc' | 'price-desc'

export function getSeasonalProducts(
  categoryId: string,
  sort: SeasonalSort,
): ISeasonalProduct[] {
  let list = seasonalProducts.filter((p) => {
    if (p.featured)
      return false
    if (categoryId === 'all')
      return true
    return p.seasonalCategory === categoryId
  })

  if (sort === 'sales') {
    list = [...list].sort((a, b) => b.sales - a.sales)
  }
  else if (sort === 'price-asc') {
    list = [...list].sort((a, b) => a.price - b.price)
  }
  else if (sort === 'price-desc') {
    list = [...list].sort((a, b) => b.price - a.price)
  }

  return list
}

export function getSeasonalFeatured(
  categoryId: string,
): ISeasonalProduct | undefined {
  if (categoryId !== 'all' && categoryId !== 'bundle')
    return undefined
  return seasonalProducts.find(p => p.featured)
}
