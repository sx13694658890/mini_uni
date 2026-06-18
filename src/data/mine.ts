export type TOrderTab = 'all' | 'pending_pay' | 'pending_receive' | 'completed'
export type TOrderStatus = 'pending_receive' | 'completed' | 'pending_pay'

export interface IOrderItem {
  id: string
  tab: TOrderTab[]
  date: string
  status: TOrderStatus
  statusText: string
  statusColor: string
  name: string
  spec: string
  quantity: number
  price: number
  image: string
  actions: string[]
  multiImages?: string[]
  multiCount?: number
  totalItems?: number
  totalPrice?: number
}

export interface IAddressItem {
  id: string
  name: string
  phone: string
  address: string
  isDefault?: boolean
}

export interface IPendingReview {
  id: string
  name: string
  date: string
  image: string
  hint: string
}

export interface IReviewItem {
  id: string
  avatar: string
  avatarBg: string
  name: string
  date: string
  rating: number
  content: string
  images: string[]
  extraCount?: number
  likes: number
  comments: number
  featured?: boolean
}

export interface IFaqItem {
  id: string
  icon: string
  title: string
  content: string
}

export interface ISecurityItem {
  id: string
  icon: string
  title: string
  desc: string
  trailing: string
  trailingHighlight?: boolean
  toggle?: boolean
}

export interface IDeviceItem {
  id: string
  icon: string
  name: string
  meta: string
  current?: boolean
}

export const orderTabs = [
  { key: 'all' as TOrderTab, label: '全部' },
  { key: 'pending_pay' as TOrderTab, label: '待付款' },
  { key: 'pending_receive' as TOrderTab, label: '待收货' },
  { key: 'completed' as TOrderTab, label: '已完成' },
]

export const orders: IOrderItem[] = [
  {
    id: '1',
    tab: ['all', 'pending_receive'],
    date: '2023-11-24 14:20',
    status: 'pending_receive',
    statusText: '待收货',
    statusColor: '#a43c12',
    name: '大西洋波士顿龙虾',
    spec: '产地: 加拿大 · 500-600g/只',
    quantity: 2,
    price: 398,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYJcwosPrhfrFkNMsnxQ3tWP_5swtR35dXP4LbzXqNeZiq8c1zQ1DDYMpJQgbre2HULfUyFgdKc7Sr7I_v8dcVUZZDlyCzIBLk9bl6iVjRKaAXA5WhRODMH8iOt2VFR_AYa5Kh7cb7yL52vJ896_piLz06zvxsqLDUfel3RX44ALc8sRkNJ_Lz1AwKXb6fhr0JRMjEANP6rLAFD-QJEhOsDU5UsTvM7iTmQkMy8ItAUtBVWf1Km49FIKdmsuk1CGHcxMAuOYvF7x7A',
    actions: ['查看物流', '确认收货'],
  },
  {
    id: '2',
    tab: ['all', 'completed'],
    date: '2023-11-20 18:05',
    status: 'completed',
    statusText: '已完成',
    statusColor: '#737780',
    name: '阿拉斯加帝王蟹脚',
    spec: '产地: 美国 · 极速冷冻',
    quantity: 1,
    price: 888,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo_aaQt2adZ4grDUzX4jQ16ubJLgLf9YabByW3vVU_kep1giaWEcNVbmzVlv5TrLQsnoY-4ULnnrD2qcRNklDFmB8V4Xkx6yyQ3aLB_lddd7egErl_jG-kCfamhaoO7qyqfdcgsPoDXMdYY0Ad6-HzmC5wq4nZpDpegWdNURERbpApQgcPPmQVSAl-cc61wg1_lzhl0qMHSxcBQQBK1eO68-fOOHzzteXb97MJ86n9T8IaFGQU3LiAo_Bu4U04yl8yI_W4ijMkCsAv',
    actions: ['评价有礼', '再次购买'],
  },
  {
    id: '3',
    tab: ['all', 'completed'],
    date: '2023-11-15 09:12',
    status: 'completed',
    statusText: '已完成',
    statusColor: '#737780',
    name: '挪威三文鱼切片等',
    spec: '共 5 件商品',
    quantity: 5,
    price: 1256,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9tClZB4tN-Ixudwg1YJejjf9Hz7xFnKyGC6BIRt8XHq-JyuinXbxBqfjV4Tox11PtDkBSNyEd5pTGwtsBOWNy-EvPwWcgnF2PHOWZS_lhABzliTvIo7_WEFYaHzGKkmQKvXswKu8dSXNoqOuaiDXQc94E2pHojSR0Urj_RpqkjtXeQuyarizewK8n9Nq86Q25tVaGsng-jdSfVDhTHnbjhAv3IzU8df7mgZjrxGiwVpktvPNs0-R69xJG_lnnYMwJRnreLAGz8cPM',
    multiImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9tClZB4tN-Ixudwg1YJejjf9Hz7xFnKyGC6BIRt8XHq-JyuinXbxBqfjV4Tox11PtDkBSNyEd5pTGwtsBOWNy-EvPwWcgnF2PHOWZS_lhABzliTvIo7_WEFYaHzGKkmQKvXswKu8dSXNoqOuaiDXQc94E2pHojSR0Urj_RpqkjtXeQuyarizewK8n9Nq86Q25tVaGsng-jdSfVDhTHnbjhAv3IzU8df7mgZjrxGiwVpktvPNs0-R69xJG_lnnYMwJRnreLAGz8cPM',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUn6zKrLmO_qii7jRlpXR_2V0sKO77hQIvviyPQSbZUoz5Vpt99MSpLE1zV1cdoFXWjsAJrDzYCrEDTBPfDpnA9g3g48bE-_AB7tFS5q7V2m0Mgt5XN-qSrl_MmyLPEkx8XH5eMtjvYNFYGkOW9VeoonvWzYnt6s5L8LmccL1xwi6m03F0LCpJFuy7RyXX8XYTut2rUieULQmdiV9-nyYxRC40QmBC2DCS--tbY3oS1NvOlkESQMkPEn0GFXpEmwN3FbYuPweoXdtK',
    ],
    multiCount: 3,
    totalItems: 5,
    totalPrice: 1256,
    actions: ['再次购买'],
  },
]

export const addresses: IAddressItem[] = [
  {
    id: '1',
    name: '陈先生',
    phone: '138 **** 8888',
    address: '上海市浦东新区 陆家嘴环路1000号 恒生银行大厦 25层',
    isDefault: true,
  },
  {
    id: '2',
    name: '李女士',
    phone: '139 **** 1234',
    address: '北京市朝阳区 建国路81号 华贸购物中心 3楼 海味鲜精品店',
  },
  {
    id: '3',
    name: '张大厨',
    phone: '135 **** 0000',
    address: '广东省深圳市南山区 粤海街道 科苑南路 2888号 阿里中心',
  },
]

export const pendingReviews: IPendingReview[] = [
  {
    id: '1',
    name: '阿拉斯加帝王蟹腿',
    date: '2023-11-20',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiMsHCRNBEUlF_cZmTlfettqUmpgfuSSDhU5ZA3jdxD8aS7tWkZHUYDehC-bWdT_9dTjNPDzJmMgYiZ6vfqimy8dGLae1IQIxgdHKW4kDFfvjm-YpgBl4gFaUiPQl0RY5VcW4VWFcdiz7NJnZNSehUUSgvTAww-BxhOPpxNkPRS0e6WSDyZRqv7pc61_TUaRDi__5wUiJaNPvyVqo-tnTY3lUytpk4CjeSNBIIhuieSr82UYLbmo8q401-ExirzH00JzMxTohaXttA',
    hint: '轻点星级打分',
  },
  {
    id: '2',
    name: '挪威三文鱼切片',
    date: '2023-11-18',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeJRIdNfpPAK7UFpQUnasALwnBOKiyVal4Lh1gdrSzdJUPnxka43thLJF9UKMLiwBNm6FhIDY2kR5Z6QI9sk8LvkxgMBt6Isu_eXEL4PQltUCvbBkZhr0RbByIcjWsZxGZsGLVvCxfLRXg3Ry0tMd1qmE3Gz578DmnURGlVGmhBYdBZVCcb1QLOJpPshbnvmz1BYFm6Z60f5SJNkm-3KUvVDIaqrh1Ip2iE4LQ_KCGq56FWVdkdAqW-KGTMjFj3oH4Bro89fCTjBf-',
    hint: '分享您的美味体验',
  },
]

export const reviews: IReviewItem[] = [
  {
    id: '1',
    avatar: 'JD',
    avatarBg: '#003366',
    name: '蓝鳍金枪鱼中腹',
    date: '2023-10-12',
    rating: 5,
    content: '由于是全程冷链，到货非常新鲜！中腹的油脂分布均匀，入口即化，口感极其细腻。不愧是产地直供，以后海鲜都在这里买了。',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCINtUz1jcbweuacxpSzrDbtsd_S_K5qeBitBem-5qmUmd1vNlOwzAjqz_ylv87ZBF3Cm6S2QjqldXaT6_Jh8uv_62RfZQuJwWCSwYxkm7aoLZReQe1joqGo6FWVOyJ-Ho2AeV8lmQmYrQKU24-2iBAtkDYhqdwozLhSME-PxqEWuCDh0PXQYLJYwiRSNCWXaP9D4LmvcbOyuusECMn_c7EC6rbfOns5gM4UssejANuO4Dc7zWGw1kucKJ_zyd1_ufJ2Sl0rxuZtjQt',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3nXe14TQxOxvRa1OVL0NhRKlk9RlCdCIZSSwggLUNvbr0ckhlUia2s1K5EC3iqQWKumxTWyaXueEcsHcEtCwLnl8KWo7SFunF_1c8kccIuU0Mn7l2o9pDSal29-yB4ehrwreOsc5ZGFLQQzKJXAzguhVLx65ELS_3CLoToO_ffsKZvbTToj2Nxio1CJz7gl0Mhr3ittvGlQ29ChBDrjy2FlrSF5engL2J6_sOERWZWeZ0knih_LPxqpr-xB8fKOsjGJuq9-daObfv',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRe_Tdn2rNs3TmhKD-uYiVhhUDvF7ZTzPxtWJJAXffjl2vKs0670O-P_vpoBLeK1AfLBIwUGOK2WquNCvakc1m1ZLEiV8_Ndhsch8UooI-RbaMwwbmJCcBQlOVnb860PTl0syhKDmGH28wHxZHTZKFfz14BUXYqM6O0p_XPreLawAf4yZ8OslSlZKAC7dj62nga2W3X1ehUnaOIrlR3DGLsUI-umdOrWuPuqATCkgNDt2xA5xp9vZRUzIi6W1QZR6vtXksHonbUeqY',
    ],
    extraCount: 1,
    likes: 24,
    comments: 2,
    featured: true,
  },
  {
    id: '2',
    avatar: 'WL',
    avatarBg: '#fe7e4f',
    name: '澳洲龙虾（活体）',
    date: '2023-09-28',
    rating: 4,
    content: '个头很大，收到的时候还是活蹦乱跳的。做成了蒜蓉粉丝蒸，肉质Q弹紧实。唯一遗憾是物流稍微慢了几个小时，但包装保护得很好。',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCXw5hsdvcGdsdBbSfz7viiG7Hy4cA7OV9_gNDMc6YTJv0G8SvKLoOXhBwP50KGypiz0P-HBOPC7oAagt5ph_JJdsg9ZZ4Kb2ruc_sYdLLI28dDi9RWUSiJuDH3NhDDs8kY65ljj7pHIeuZAbF293IS7PSi4Eq3tun4tVbsaYm4IepvcFRQVgKbhzVkJ6pohewqJoVaunJUmaAyFXf4Uir16-nqOByvLI8u9J6KGCarD1ypwm4dl5LqyKrjwlrtVXoNJdYVVEFv-8vB',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKQPzNVfw-Se1UEpzYrbq6m2mmbBq8O0P6kMh6OM5ZgvzlwaXtRS_d9MkdP9p0hGvCTDN5FMbIvukoNcGZi3hSpfD2AB_AB2DND2gz2ohq_iHnVCKojs69paIsMGETpUz3sthkEfMPABRVkmPmRccULMhbFYeJpPjBkLYAvYon0c_ZUCdpguCLnRLFucHlQF4DFqbmEf8AmOaMhifGWU3R9SIqFRRdrQ6LPf2Q9etwar_j0E26ANMVoENhQRY0m-scRWPVjBCeV5bg',
    ],
    likes: 8,
    comments: 1,
  },
]

export const faqList: IFaqItem[] = [
  {
    id: '1',
    icon: 'car',
    title: '配送时效与冷链保障',
    content: '为了确保产品的新鲜度，海味鲜全程使用专业航空冷链运输。一二线城市承诺下单后24-48小时内送达。每个包裹均配有干冰及温度传感器，实时监控配送环境。',
  },
  {
    id: '2',
    icon: 'rmb-circle',
    title: '退款及售后政策',
    content: '生鲜类产品如因物流延迟导致的质量受损，请在收货后6小时内拍照联系在线客服，我们将核实情况后在1个工作日内原路退款或补发。',
  },
  {
    id: '3',
    icon: 'checkmark-circle',
    title: '食材溯源查询',
    content: '您可以在“我的订单”中点击对应商品，查看“溯源证书”。每一份海产品均拥有唯一的捕捞编码，涵盖捕捞海域、船只信息及进关检验结果。',
  },
]

export const serviceBannerImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyhVcOE3nRD5SknFJVcBmMiVW10GF9-qt6VqGUQeYTCdJcuAlO_SilKyy2PqiFqezuahdFxzHt9AZuOdy1t3MtuBlGy6FrCDzHzSUqEJbCnqQbB2kL6HyKqtCsrKXNSYVvKYZLL9PAdMCk4ikLmbWPYwcItph1jOs0hYXaAKOKO8dn_cB9HhMrLe8g0vJ6Zzi-bQ2YPiguUoA1jb_AGhT3uTU6kgkAeYRob_NkfVbfHqJp3fu7CQA6a-OCIh1eZXuRiVpY109g_Pwf'

export const securityItems: ISecurityItem[] = [
  { id: '1', icon: 'lock', title: '修改密码', desc: '保护您的账号安全', trailing: '定期更新' },
  { id: '2', icon: 'phone', title: '绑定手机', desc: '138 **** 8888', trailing: '已绑定', trailingHighlight: true },
  { id: '3', icon: 'account', title: '实名认证', desc: '享受更完整的海鲜溯源服务', trailing: '未认证' },
  { id: '4', icon: 'fingerprint', title: '生物识别', desc: '指纹/面容快速登录', trailing: '', toggle: true },
]

export const devices: IDeviceItem[] = [
  { id: '1', icon: 'phone', name: 'iPhone 15 Pro (当前)', meta: '北京 · 上次登录 10分钟前', current: true },
  { id: '2', icon: 'grid', name: 'MacBook Pro 14"', meta: '北京 · 上次登录 2天前' },
]
