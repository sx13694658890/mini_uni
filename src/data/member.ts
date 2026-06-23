export interface IMemberLevel {
  id: string
  level: string
  name: string
  locked?: boolean
  annualValue: number
  wealthCurrent: number
  wealthTarget: number
}

export interface IMemberBenefit {
  icon: string
  label: string
}

export interface IMemberFeature {
  icon: string
  title: string
  desc: string
}

export const memberLevels: IMemberLevel[] = [
  {
    id: 'lv2',
    level: 'LV2',
    name: '精英会员',
    annualValue: 8800,
    wealthCurrent: 16400,
    wealthTarget: 50000,
  },
  {
    id: 'lv3',
    level: 'LV3',
    name: '财富会员',
    locked: true,
    annualValue: 19800,
    wealthCurrent: 16400,
    wealthTarget: 100000,
  },
  {
    id: 'lv4',
    level: 'LV4',
    name: '至尊会员',
    locked: true,
    annualValue: 39800,
    wealthCurrent: 16400,
    wealthTarget: 200000,
  },
]

export const memberBenefits: IMemberBenefit[] = [
  { icon: 'coupon', label: '全场 9.5 折' },
  { icon: 'arrow-up-fill', label: '优先配送' },
  { icon: 'server-man', label: '专属客服' },
  { icon: 'gift', label: '生日礼包' },
]

export const memberFeature: IMemberFeature = {
  icon: 'bag-fill',
  title: '冷链免邮',
  desc: '所有温控订单 均享无限次免邮费',
}

export const availableMileage = 2580

export function formatWealth(value: number) {
  if (value >= 10000)
    return `${(value / 10000).toFixed(2).replace(/\.?0+$/, '')}万`
  return `${value}`
}
