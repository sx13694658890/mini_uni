import type { IProduct } from '~/data/ocean'

export interface ICategoryFilter {
  id: string
  label: string
}

export interface ICategoryHero {
  image: string
  title: string
  subtitle: string
}

export interface ICategoryPageConfig {
  id: string
  name: string
  layout: 'list' | 'grid-2' | 'featured-grid'
  hero?: ICategoryHero
  sectionTitle?: string
  sectionSubtitle?: string
  filters: ICategoryFilter[]
  qualityNote?: {
    title: string
    body: string
  }
}

export const categoryPageConfigs: Record<string, ICategoryPageConfig> = {
  fish: {
    id: 'fish',
    name: '活鲜鱼类',
    layout: 'list',
    hero: {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAomvC1l683tmA4KQ_NH0_0zoth__ihmHg8vI5gQzt5esERUuoEeajZ1YYANZTpH8f8YhFOiFmWdXlFI-0viX3KDBUvL9WYEQXE5YInnpXEVwxq3JUZBNV-COkIjj4f6JoPImuXI6tbCxdKXE2JMGTU66eYJTV2Jy4UfnOpIjtForsgnGPG7s31hOuAc15QTnd3OKNYv_UOdbS8cU39gaxeS-dgw0GSynXz1O6TAnE3bV5encGpayHdBi3DQ6crFnYaj8Ag4MYKFpQS',
      title: '深海直达',
      subtitle: '每日凌晨到货 · 活鲜直供',
    },
    filters: [
      { id: 'all', label: '综合' },
      { id: 'sales', label: '销量优先' },
      { id: 'price', label: '价格' },
      { id: 'new', label: '新品' },
    ],
  },
  shrimp: {
    id: 'shrimp',
    name: '精品虾类',
    layout: 'grid-2',
    sectionTitle: '纯净海域，鲜活直达',
    sectionSubtitle: '精选全球优质海域，每一只都经过严格质检',
    filters: [
      { id: 'all', label: '全部' },
      { id: 'tiger', label: '黑虎虾' },
      { id: 'white', label: '厄瓜多尔白虾' },
      { id: 'south', label: '南美对虾' },
      { id: 'boton', label: '牡丹虾' },
    ],
  },
  crab: {
    id: 'crab',
    name: '螃蟹贝类',
    layout: 'featured-grid',
    filters: [
      { id: 'all', label: '全部' },
      { id: 'hairy', label: '大闸蟹' },
      { id: 'deep', label: '深海蟹' },
      { id: 'shell', label: '扇贝/生蚝' },
    ],
  },
  semi: {
    id: 'semi',
    name: '半成品',
    layout: 'list',
    hero: {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-PyxbUDyDanRPo393YyQ1KZNLcaBVFzML4T5e9gTER6slw1ayGwSTuFN50iyxIjxDLWIZ0QldYiFfJNHYflry66G-KK2AX9N1L8oF0Bhd8EoAHV6I8fFsSnqkhq50r1F9BnkE2wJVMYmBo3h2bxU7iE8sa9Iz8gqXu8LQCzcC0Hh7vI77UIjHtpDgOr4livt1qtKUmbWg3dVBrq8FYTsuPa84ZjUCdGekqjaOni-OZ9_ZuCvxxjO8cmDpUqD2AMaK_UR7SBIV48eh',
      title: '5分钟变大厨',
      subtitle: '精选深海活鲜，免洗免切，专业配方调味，宅家尽享餐厅级海味。',
    },
    filters: [
      { id: 'all', label: '推荐' },
      { id: 'hot', label: '人气热销' },
      { id: 'season', label: '当季新品' },
      { id: 'price-asc', label: '价格升序' },
    ],
    qualityNote: {
      title: '极速冷链 · 鲜活到家',
      body: '我们承诺所有半成品食材均由原产地直发，全程-18℃温控运输，保证到手依然处于最佳鲜度。',
    },
  },
}

export interface ICategoryListProduct extends IProduct {
  homeCategoryId: 'fish' | 'shrimp' | 'crab' | 'semi'
  filterId?: string
  featured?: boolean
}

export const categoryListProducts: ICategoryListProduct[] = [
  {
    id: 'fish-1',
    homeCategoryId: 'fish',
    filterId: 'sales',
    name: '挪威三文鱼 (中段)',
    origin: '挪威',
    spec: '约300g/份',
    price: 89.9,
    originalPrice: 108,
    categoryId: 'fish',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf18uQSF1unLINO3i1XNFWxsViyRYeOULHrM0dUPSo4aba8-KRJudrKk2LAbqruCx4Xi-aQT0YPGCQEd7jiI0oDDc-c05iPtqnDNNBGvRjbzmTv1xyLqVjAYyOpGV4VF17RpwaJelUZpYMpbf59nFAPj_CD-7-UE4YXDfTisolQtunCJO1IxEO4z0lQ7o84M2SuIyVYXkTZSSehOe9XD0lfnh689Wdw1rgAB0OjWmTOIHrfIT-nPMLwio5Uev5YbPtgJeqHAIGE4jc',
    tag: '限时抢购',
    tagStyle: 'fresh',
  },
  {
    id: 'fish-2',
    homeCategoryId: 'fish',
    filterId: 'new',
    name: '东海大黄鱼 (活鲜)',
    origin: '舟山',
    spec: '约500g/条',
    price: 128,
    originalPrice: 158,
    categoryId: 'fish',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3WRub62pTEkWDB7cW5kkbmL205Rgq81YNViaOi5EmeGnR2K4nRo-AXqKc4l5BEHhnwH16gC943SSpKgyqu4OHTp33x61y00XK92hzumzs_7nhQE4ifM1p1XM4sbs6Bp8Argm4XS6YstdRHNQBR8qDd9FDk2YL8yutVFUhFh3rxpMNM_oGFbwdJT_cUGPQVPiGnpAn9S0-o-AymhIEPKoz9Ou81SDth5mnNldUJ8kKLc5-TvPYRWsJxQ_3s-riH9DM3j-SZOB_CNbV',
    tag: '活鲜',
    tagStyle: 'fresh',
  },
  {
    id: 'fish-3',
    homeCategoryId: 'fish',
    name: '清蒸多宝鱼 (活鲜)',
    origin: '渤海',
    spec: '约600g/条',
    price: 98,
    categoryId: 'fish',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoKftTtG2gdJoD4UzJX16ttdDG97EH-guvgz3vafGtPc-vS9aYmIaMevLI4HEZc7sUmmIsGJ2amiMr-icQfFebvVejtoW-_ov76oYb_v1HtF2lJz-O21eBM5GrMFANVFbUFo8OOmgme3qXPJR9oellCXXStkAObHVZ0m8PqofsI-9raEub4DSU5sxSexiHs0-olxlXLMzKlPwgjNLTOxFobLnvw9Rqpp2lPEgXFL8a4PBPUAiibUJXbgSrxZMhiYeh62Rba2pDmFZS',
    tag: '今日捕捞',
    tagStyle: 'fresh',
  },
  {
    id: 'shrimp-1',
    homeCategoryId: 'shrimp',
    filterId: 'tiger',
    name: '黑虎虾 (大号)',
    origin: '东南亚',
    spec: '约500g',
    price: 89,
    originalPrice: 108,
    categoryId: 'shrimp',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwMLnfJkMCnpzGPcjhlyQPwin-QzB47weyVzXfTke7RaiWSo-AS8rxdgqnMGcOjeCsn2-tVwZB4eUFijbp7NcExUFkxm0j9mBfw0ltbZjELL78QqjN1BgIYUmxHayM9c5Lz-J4oZ7j9Ss04PUwRMQWI0PdCyvxUdPP-Qlj8tPkroDnSb-p1ckIEqka2_w_FPiGrVheq_RH6LFCNxruammxyYdR9Rgl_WCxklLcSS_YPjwPFTfQCi2WtfoY0bWsCE-6qUJH0DzT4AjZ',
    tag: '活鲜',
  },
  {
    id: 'shrimp-2',
    homeCategoryId: 'shrimp',
    filterId: 'white',
    name: '厄瓜多尔白虾',
    origin: '厄瓜多尔',
    spec: '30-40头/斤',
    price: 68,
    originalPrice: 88,
    categoryId: 'shrimp',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwMLnfJkMCnpzGPcjhlyQPwin-QzB47weyVzXfTke7RaiWSo-AS8rxdgqnMGcOjeCsn2-tVwZB4eUFijbp7NcExUFkxm0j9mBfw0ltbZjELL78QqjN1BgIYUmxHayM9c5Lz-J4oZ7j9Ss04PUwRMQWI0PdCyvxUdPP-Qlj8tPkroDnSb-p1ckIEqka2_w_FPiGrVheq_RH6LFCNxruammxyYdR9Rgl_WCxklLcSS_YPjwPFTfQCi2WtfoY0bWsCE-6qUJH0DzT4AjZ',
    tag: '进口',
  },
  {
    id: 'shrimp-3',
    homeCategoryId: 'shrimp',
    filterId: 'boton',
    name: '牡丹虾',
    origin: '日本',
    spec: '约200g',
    price: 198,
    categoryId: 'shrimp',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3Mvd5TGXACife2K-JbkZkefpUUqT8tPguabIaHX59MAk-UmLlFOwZkHnaAjTq5I2SDWBiI-hLADWAKgGCLciTjQXwqAxcVMlNLvqNnKJvFko_I0aACdGHb-Kg3kbjco8ECVWtR1F9r6r6hIrihQHD_EPQ7dn-D8kPV6p17ZrqYb0ZDIq6-UhJoGR5o3WS7kxCIwUbAydiLD7ukCIHqUB9jxRbawMi5bSAjqWPQ5NVbTuxUTy9QCYFVB3DVtgHS-TR3NDT1nWNIHvA',
    tag: '刺身级',
  },
  {
    id: 'crab-1',
    homeCategoryId: 'crab',
    filterId: 'hairy',
    featured: true,
    name: '阳澄湖大闸蟹',
    origin: '江苏',
    spec: '特等雄蟹 4.5两/只',
    price: 128,
    originalPrice: 158,
    unit: '/ 只',
    categoryId: 'crab',
    description: '肉质鲜美，膏脂丰满',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgm3htVShDSiYC85p_7bJl7huqx-rlKa7zgkaePKBMXhXdhMJjfDPIqbr9mihQXJJPJEuiEVs7b3EV5Udyrvyiy1JT3Bh4PB86eTtiWUND-JqC4OW0-GWSGBQVCtPmyrUlgOCSWHXw0eFGC57jTFNbpLkkQYTMnKACQHOR3hpdqc9UHP0ly-cyuM9G2zvAvQ6M3G4QaLfBO5B1NSGKlmHd5kZDrtDFwt_T-FR-R6efyJC_ao7kg8KXcHy9pbNbOIRpjglVxehzlO68',
    tag: '捕捞季推荐',
    tagStyle: 'signature',
  },
  {
    id: 'crab-2',
    homeCategoryId: 'crab',
    filterId: 'shell',
    name: '北海道大帆立贝',
    origin: '日本',
    spec: '冷链直达',
    price: 89,
    categoryId: 'crab',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp5S3aC4w8w-61e_X3Vlafd8PDIv8z6IesbmWujR-VkzV6doMp7TyVcJgjidmBuX9T6i_5RXXDNzUoxg3VBhGMCtfCawPzrfvqN-JYtMfAF4Ytab-PcDoV7wiGEghDCA4l3e1G0GppTjcdpi6ZLyTQ8VMTUr4BOhTJrF1qGbNlZcHPKKAi39HFuslvsbf-KLrWYb2PlvaJEBZzcamoQZdn-DdMsA6BZ11Wr9ooK8VnwUW5Zo4iwoxF7m7GRRIfFKnWB6KO8f0_sN2n',
  },
  {
    id: 'crab-3',
    homeCategoryId: 'crab',
    filterId: 'shell',
    name: '吉拉多生蚝 N2',
    origin: '法国',
    spec: '6只装',
    price: 258,
    categoryId: 'crab',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZt_ocIFwEjYW6UgpatMNyUaIr6rjXQ-EUykVDJfVAWf7aTxPMdKdW4Pnzym7vdGimHSw8NemAdC7s4Qx3Geq_U3i5l4BDdHnZg6G5P95pi7yEwzo1vIe-dcb1yq7UM2xWSTmnxcW7ju5R9JbySky2GIyesD_CeCe46OE00xpRrgCRat9CEJ1_MGjDpLjDbhYwctDQnoePu3zJkKC15seApi2QaG2se7LNEwu0_BWgmEHDyh7Uy71We6u-uyvXa2AhIFabK7w8u_Am',
    tag: '进口',
    tagStyle: 'fresh',
  },
  {
    id: 'semi-1',
    homeCategoryId: 'semi',
    filterId: 'hot',
    name: '蒜蓉粉丝蒸扇贝(半成品)',
    origin: '威海海域',
    spec: '6只装',
    price: 49.9,
    originalPrice: 68,
    categoryId: 'semi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxR9bpPfecHyAr7ihj08J4GanRWsdGfFNdba0GHyKvBd8stIYJQvLaZuiCzwtEzx04pW9xo_usLJLFp1fbLUg0Q83B4--b_XAvoByry3e4RHQn-Q01ur4sTmVCZJuY7EITydp4-UjDwytn_wL0XMUsbCzTP2KEV8Q6D59GEGvTyXYQ5-yQ3WouDVFAh92asbhK2le486lYBIBff7LpZZsssDzgFREvQ2ifVhUYWIsWmLUwjA2KzoITJzZSeD2OJ2f_9bAJXnK4DTVg',
    tag: '爆款',
    tagStyle: 'signature',
  },
  {
    id: 'semi-2',
    homeCategoryId: 'semi',
    filterId: 'season',
    name: '金汤酸菜鱼片',
    origin: '活鱼现片',
    spec: '450g',
    price: 35.8,
    originalPrice: 45,
    categoryId: 'semi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbwpWNzOzKB6ctzcRM9rFEZ8L3shTtWB4ufc91gVyuRd5BhSsKilYWFvAlsY5lcRftIKVWjGuXZjud7W_PEQlFvwoeNPNbDu_YmjgbVOnP-8J_ShhHGQUCx8Mqt6t9nmaDWcQe6egX1wZDwkxhECBGXtZMh1hQF8BWyfNAfYXJIdgAyz-oUW67OMhX8PmpikJi7kfFsFFHjBzakQGElOmQ8jhU9ogIXhZSznHh9bXWCHvDQfXuazS2c4VzqPaju3P00zMPdtaRCu8O',
    tag: '秘制金汤',
    tagStyle: 'fresh',
  },
  {
    id: 'semi-3',
    homeCategoryId: 'semi',
    filterId: 'hot',
    name: '虾仁水饺',
    origin: '手工包制',
    spec: '500g',
    price: 58,
    originalPrice: 72,
    categoryId: 'semi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVr5BeVS4IyuUownOWgTsBPXTninh9rn_tysQxB1pFwUkPMTZtpiZdRz-6g7hAoWG4U68Sab46bS7_5-UGVTPAgdwewXxTNE-C4179Hi7IFgwWVcLjN3iQw1Vslw-hJnaJSHwvEEJEOGPiO7A9bh0IGtrzkMjvVTUxH9vfoQmSGY052Zgc00nw1DvxalEJaHLd_fuPto97N_ASqP6e-g1Jfxd7BRpkgp_-787mh9TsSBIpQUnUlVw9IXK-EgcJhaOl8q6vm34vY-AX',
    tag: '整颗大虾仁',
  },
]

export function getCategoryPageConfig(id: string): ICategoryPageConfig | undefined {
  return categoryPageConfigs[id]
}

export function getCategoryListProducts(
  categoryId: string,
  filterId = 'all',
): ICategoryListProduct[] {
  return categoryListProducts.filter((p) => {
    if (p.homeCategoryId !== categoryId)
      return false
    if (filterId === 'all')
      return true
    return p.filterId === filterId
  })
}
