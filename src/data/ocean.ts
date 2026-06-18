export interface IBanner {
  id: string
  image: string
  tag: string
  tagBg: string
  title: string
  subtitle: string
}

export interface ICategoryIcon {
  id: string
  name: string
  icon: string
}

export interface ICategoryNav {
  id: string
  name: string
}

export interface IProduct {
  id: string
  name: string
  origin: string
  spec: string
  price: number
  originalPrice?: number
  image: string
  tag?: string
  tagStyle?: 'default' | 'signature' | 'fresh'
  description?: string
  unit?: string
  categoryId?: string
}

export const banners: IBanner[] = [
  {
    id: '1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr4MLb-B8l7ZxrCAC4ww8MOLvDH6DdzQbEgjKxeK79nZdGmCIpCm1nNJ57nBP7UjHPKOgqO6HvifzDA478C64iE4W5RHlev3jzQNwruNu65U-5uIVywQh4hS8XzWkWWsOHvyxvVuYLuzW9dMvuGy02cLsj6I6uzv5oFRa0ybSKGBx3dghqWCT9poa5EpzAHrKcoIVdHWCaf1QgRCZJmxuyJJNTjPLtM3FXajW2_sLE8njZ5sugjz0oWajiQxuc9WtXaxmb8SwCYQKE',
    tag: '限定活动',
    tagBg: '#a43c12',
    title: '帝王蟹盛宴 · 产地直达',
    subtitle: '来自白令海峡的极致鲜美',
  },
  {
    id: '2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADEbHyB-yVbkg4Di1qnPtgtlChCSbG4Oqc9cLg2kXH3p_QCBSE422b8IaigGOLZpEOyd2xZpeRl67X4ajuqvHzTVZhuwVR6Svn4Yr-8gskX-B4AJ9IdMSyHbxtpMGqwiuJwmOUYGrXvSc97W6YCsKnt2Rjk7_8mbbdFNCMOAbGkGEpUZCUjoLXvWMmFbDAlvTQZJHdPScy-Rx2p_DgmxrXYix6UaLCHWQYt6prk3QHf4b30JnoCwgdzXCI5ODYrtlKVnP5H5jFimk9',
    tag: '今日捕捞',
    tagBg: '#003366',
    title: '蓝鳍金枪鱼 · 旬之味',
    subtitle: '脂肪丰盈 鲜甜回甘',
  },
]

export const homeCategories: ICategoryIcon[] = [
  { id: 'fish', name: '活鲜鱼类', icon: 'grid' },
  { id: 'shrimp', name: '精品虾类', icon: 'star' },
  { id: 'crab', name: '螃蟹贝类', icon: 'bag' },
  { id: 'semi', name: '半成品', icon: 'home' },
]

export const categoryNav: ICategoryNav[] = [
  { id: 'all', name: '全部' },
  { id: 'signature', name: '招牌必点' },
  { id: 'live', name: '环球活鲜' },
  { id: 'cold', name: '凉爽冷拼' },
  { id: 'soup', name: '滋补汤品' },
  { id: 'staple', name: '主食' },
]

export const hotProducts: IProduct[] = [
  {
    id: 'p1',
    name: '黑虎虾 (大号)',
    origin: '东南亚',
    spec: '约500g',
    price: 89,
    originalPrice: 108,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwMLnfJkMCnpzGPcjhlyQPwin-QzB47weyVzXfTke7RaiWSo-AS8rxdgqnMGcOjeCsn2-tVwZB4eUFijbp7NcExUFkxm0j9mBfw0ltbZjELL78QqjN1BgIYUmxHayM9c5Lz-J4oZ7j9Ss04PUwRMQWI0PdCyvxUdPP-Qlj8tPkroDnSb-p1ckIEqka2_w_FPiGrVheq_RH6LFCNxruammxyYdR9Rgl_WCxklLcSS_YPjwPFTfQCi2WtfoY0bWsCE-6qUJH0DzT4AjZ',
    tag: '活鲜',
    categoryId: 'shrimp',
  },
  {
    id: 'p2',
    name: '北海道帆立贝',
    origin: '日本',
    spec: '6-8只',
    price: 158,
    originalPrice: 198,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoKftTtG2gdJoD4UzJX16ttdDG97EH-guvgz3vafGtPc-vS9aYmIaMevLI4HEZc7sUmmIsGJ2amiMr-icQfFebvVejtoW-_ov76oYb_v1HtF2lJz-O21eBM5GrMFANVFbUFo8OOmgme3qXPJR9oellCXXStkAObHVZ0m8PqofsI-9raEub4DSU5sxSexiHs0-olxlXLMzKlPwgjNLTOxFobLnvw9Rqpp2lPEgXFL8a4PBPUAiibUJXbgSrxZMhiYeh62Rba2pDmFZS',
    tag: '进口',
    categoryId: 'crab',
  },
  {
    id: 'p3',
    name: '大西洋三文鱼中段',
    origin: '挪威',
    spec: '300g',
    price: 128,
    originalPrice: 145,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3WRub62pTEkWDB7cW5kkbmL205Rgq81YNViaOi5EmeGnR2K4nRo-AXqKc4l5BEHhnwH16gC943SSpKgyqu4OHTp33x61y00XK92hzumzs_7nhQE4ifM1p1XM4sbs6Bp8Argm4XS6YstdRHNQBR8qDd9FDk2YL8yutVFUhFh3rxpMNM_oGFbwdJT_cUGPQVPiGnpAn9S0-o-AymhIEPKoz9Ou81SDth5mnNldUJ8kKLc5-TvPYRWsJxQ_3s-riH9DM3j-SZOB_CNbV',
    tag: '刺身级',
    categoryId: 'fish',
  },
]

export const categoryProducts: IProduct[] = [
  {
    id: 'c1',
    name: '蒜蓉粉丝蒸生蚝',
    origin: '',
    spec: '',
    price: 88,
    unit: '/ 6只',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnLPCntwZIlhXU-qZbFi8wBqCCtjoy1plzK8EZly59qdilyzgEkq4RIVt4fwAycclzkEpvihhkX9GNB5i5MNlv2jqYpHaaatXkoT_C8VRsgZosxRt4HXPIp38CtWYoUrLE7SZPbb3xJ30bMXCurgY3dDxVBQrK74ZfyY7PNxkj1ZPwcni8p2Btp2zW637FOOdHNkrmGcT3STfUc3wjalGp9S0aK9NTevt0d_nBGX7qlTQyoBY1OIyTtW_3_8DPLMUKMPfyMBlynI_N',
    tag: '今日捕捞',
    tagStyle: 'fresh',
    description: '深海生蚝配合手工细粉丝，金蒜淋油，锁住原始鲜甜，每一口都是大海的味道。',
    categoryId: 'signature',
  },
  {
    id: 'c2',
    name: '清蒸波士顿龙虾',
    origin: '',
    spec: '',
    price: 298,
    unit: '/ 例',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc9bCODHvldRjKEjK7p1Ns29BNxm1jE_E6qvhkiqboA2v23iFOhf4npNBk8nmcI9CC92rVFvWWSyv3wDba8MshhUctV3FIiWjLqLihkj5hmM_Me7KZwRP8CBAgCOWT8j4nvFFAmKi57pQIxKGETdgn4-xWg22tsKc4nCywWh8LoRNGW8kv9ZwwZtl2Ov4WDdQF6Xh245DpQkHWoZ_IhozxilMQDdjc_tM07VtJ0GVvHh95m66876GbJjnsO138mVibqbP4dcQfn63K',
    tag: '招牌',
    tagStyle: 'signature',
    description: '精选约600g活波龙，原汁原味清蒸，肉质Q弹紧实，尽享极度奢华鲜感。',
    categoryId: 'signature',
  },
  {
    id: 'c3',
    name: '香辣炒花蟹',
    origin: '',
    spec: '',
    price: 128,
    unit: '/ 份',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6T3Y6aLV56CstKpR7l_-sfV9hlk7BQtBIFd-QozCGoGrW1zEI5GOrK4ef3fw5w0My15FayX_pstNnSOctq_bGTGdT_YaCEmN8ffM6uui9SY9aOS1TZ0eaCWOCWbmQ0WVejX5pJGe4ItCYwLEi9Jokv5RYbBUVVmsUZ7BISMNb4k-OhEQFx34_2RRDJ8mMWhh_JQ131VpfjPto0bv5vjm_AG95DlKT3NvcMh_gBRNgemPGz7m53p5MUnKJF_ojsebQtEZn4Veyl1Jr',
    description: '秘制香辣酱爆炒，蟹肉鲜甜与辣意交织，开胃十足，下酒良伴。',
    categoryId: 'live',
  },
  {
    id: 'c4',
    name: '极鲜刺身五拼',
    origin: '',
    spec: '',
    price: 188,
    unit: '/ 例',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuF2j7wG98XbRa6ojfhxQCaftopqd0FjwO3QqpM0AGBmckUN8zEk3Ibp8nglScEw9zsfQLpbgE4TBMO9GC-QO3JbY34sXKQrU8Y0FZAKTMyzsUr68uSzG_Yv12b3ESK9l_UFhaRMYHFcCGjNsh_vvRPr-ozPeY326tXAtb2-ltNHGcFeXKDKc4UV24SrXhlmiQVO2OZwuzkXJzX9K9QLdWXixnZtaDyMhFI0PZma_PYXDfuwUWm8LwQ4xsG3bL7E9T7yBnkwE_p75z',
    tag: '空运',
    tagStyle: 'fresh',
    description: '三文鱼、北极贝、甜虾、金枪鱼、鲷鱼，每日空运直送，冰爽即化。',
    categoryId: 'cold',
  },
  {
    id: 'c5',
    name: '潮汕砂锅海鲜粥',
    origin: '',
    spec: '',
    price: 68,
    unit: '/ 锅',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN8pdDRyBqjR5k-prVMeH4Ek--U_VYpFvRDG44alZMX3TtV9b5A-3ZgWL-GtgR0_fR_FI1kn6BSzeAzMXHMeQBzizAPKLg8hVMPCy2HeO_9MtWj93oSimiu5kD3E36tSOygHEDzTaax-76u8l3WIeMDlNJfEqHyWzRiSLZxU1fnjBgsfoKzaUIG5L8oWqHCS_jKX2ba1YErMdrmeEf12OsDO28f_PxPmSZT5-nY_43zMRR-9C_tOSN4PgiynRUwoX-B04QNDUa-W0Q',
    description: '基围虾与干贝文火慢熬，米香肉滑，鲜美养胃。每一勺都是精华。',
    categoryId: 'soup',
  },
]

export const cartProducts: IProduct[] = [
  {
    id: 'cart1',
    name: '蓝鳍金枪鱼大腹',
    origin: '日本长崎',
    spec: '',
    price: 598,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3Mvd5TGXACife2K-JbkZkefpUUqT8tPguabIaHX59MAk-UmLlFOwZkHnaAjTq5I2SDWBiI-hLADWAKgGCLciTjQXwqAxcVMlNLvqNnKJvFko_I0aACdGHb-Kg3kbjco8ECVWtR1F9r6r6hIrihQHD_EPQ7dn-D8kPV6p17ZrqYb0ZDIq6-UhJoGR5o3WS7kxCIwUbAydiLD7ukCIHqUB9jxRbawMi5bSAjqWPQ5NVbTuxUTy9QCYFVB3DVtgHS-TR3NDT1nWNIHvA',
  },
  {
    id: 'cart2',
    name: '波士顿龙虾 (特大)',
    origin: '加拿大',
    spec: '',
    price: 329,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVf9_a3e-akGwZUKG7Mig6ED0zgUnJjHxPj9P6YyEcxEK7oQ00vjlGloRQseNUc_WWIHYXowFTUQtMX4G4hYnyc8p2NfH5AGuSBS8sESp4a3LWxZcbS2lqx2zk0_V1voUfuCsg2HG-wuRatQ_aVlO5xNwpHl7wACfvz-DXxEXkEHo66cme9NCnLKk5VBWTC3tEmjh0mLplx0rJdkNafxzWcmGJACXrYjY_CZ76mnl5mICRRVoHmh-ovQLgfF7i8KWsr9pabptxb5DO',
  },
  {
    id: 'cart3',
    name: '吉拉多生蚝 N2',
    origin: '法国',
    spec: '',
    price: 258,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZt_ocIFwEjYW6UgpatMNyUaIr6rjXQ-EUykVDJfVAWf7aTxPMdKdW4Pnzym7vdGimHSw8NemAdC7s4Qx3Geq_U3i5l4BDdHnZg6G5P95pi7yEwzo1vIe-dcb1yq7UM2xWSTmnxcW7ju5R9JbySky2GIyesD_CeCe46OE00xpRrgCRat9CEJ1_MGjDpLjDbhYwctDQnoePu3zJkKC15seApi2QaG2se7LNEwu0_BWgmEHDyh7Uy71We6u-uyvXa2AhIFabK7w8u_Am',
  },
]

export const detailProduct = {
  id: 'detail1',
  name: '香辣炒花甲',
  nameEn: 'Spicy Stir-fried Clams (Premium Selection)',
  price: 68,
  originalPrice: 89,
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC92XKpN2mnJwwF9k-foQhBiMQBeZ5mzhDWYQ2U4mF5q60WmeRXizMkFPCeNullmna_djx-5uK4_WzHQ7h1l9wVt5-NWvokJCqLNTpa73N8i__2nSCRBpDddKJ5C5Bj06bM0qFjI5tTyLjooPVzZCedbpr8c6RpqyfsUuCtQKaBiSzz33-aTX-4UnocNh47PT0cdK1Gqlc9Na9UmIDY2WjkDaBeGu-2_ghKQ48H5sPJlYWqRMwcmNXBpxjwY8XJO8-SxLX1brOsgy0c',
  rating: 4.8,
  reviews: '2.4k+',
  description: '选用当日捕捞的高品质花甲，壳薄肉厚，鲜甜无沙。采用地道川式香辣工艺，猛火爆炒。秘制红油与新鲜青红椒的碰撞，锁住贝肉本身的鲜美，口感香辣爽脆。',
}
