/**
 * 判断是否为空
 */
export function validatenull(val: any) {
  if (typeof val == 'boolean') {
    return false
  }
  if (typeof val == 'number') {
    return false
  }
  if (Array.isArray(val)) {
    if (val.length === 0)
      return true
  }
  else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}')
      return true
  }
  else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '')
      return true
    return false
  }
  return false
}

/**
 * 判断身份证号码
 */
export function cardid(code: any) {
  const list = []
  let result = true
  let msg = ''
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 ',
  }
  if (!validatenull(code)) {
    if (code.length === 18) {
      // eslint-disable-next-line regexp/no-unused-capturing-group
      if (!code || !/(^\d{18}$)|(^\d{17}([\dX])$)/i.test(code)) {
        msg = '证件号码格式错误'
      }
      else if (!city[code.substring(0, 2) as keyof typeof city]) {
        msg = '地址编码错误'
      }
      else {
        // 18位身份证需要验证最后一位校验位
        code = code.split('')
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        // 校验位
        const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
        let sum = 0
        let ai = 0
        let wi = 0
        for (let i = 0; i < 17; i++) {
          ai = Number.parseInt(code[i])
          wi = factor[i]
          sum += ai * wi
        }

        // 修复校验位比较逻辑，统一转为字符串比较并忽略大小写
        const calculatedParity = parity[sum % 11].toString()
        const actualParity = code[17].toString().toUpperCase()

        if (calculatedParity !== actualParity) {
          msg = '证件号码校验位错误'
        }
        else {
          result = false
        }
      }
    }
    else {
      msg = '证件号码长度不为18位'
    }
  }
  else {
    msg = '请输入身份证号码'
  }
  list.push(result)
  list.push(msg)
  return list
}

/**
 * 判断手机号码是否正确
 */
export function isvalidatemobile(phone: any) {
  const list = []
  let result = true
  let msg = ''
  const isPhone = /^0\d{2,3}-?\d{7,8}$/
  // 增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  if (!validatenull(phone)) {
    if (phone.length === 11) {
      if (isPhone.test(phone)) {
        msg = '手机号码格式不正确'
      }
      else {
        result = false
      }
    }
    else {
      msg = '手机号码长度不为11位'
    }
  }
  else {
    msg = '手机号码不能为空'
  }
  list.push(result)
  list.push(msg)
  return list
}
/**
 * 判断姓名是否正确
 */
export function validatename(name: string) {
  const regName = /^[\u4E00-\u9FA5]{1,20}$/
  if (!regName.test(name))
    return false
  return true
}

export function maskPhoneNumber(phoneNumber: string): string {
  const cleanedNumber = phoneNumber.replace(/\D/g, '')

  if (cleanedNumber.length !== 11) {
    // 如果不是11位，返回原值或者根据业务需求返回其他提示，这里返回原值
    console.warn(`电话号码长度不正确: ${phoneNumber}`)
    return phoneNumber
  }

  return cleanedNumber.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
}

/**
 * 姓名脱敏：姓改为 * 展示
 * 示例：张三 -> *三，李四五 -> *四五，Alice -> *lice
 */
export function maskSurname(name: string) {
  if (!name)
    return ''
  const s = String(name).trim()
  if (s.length <= 1)
    return '*'
  return `*${s.slice(1)}`
}
