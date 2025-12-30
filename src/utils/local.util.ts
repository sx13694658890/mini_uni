import type { ILocationParams } from '~/api'

export function getCurrentLocal() {
  return new Promise<ILocationParams>((resolve, reject) => {
    uni.getLocation({
      type: 'wgs84',
      success: (res) => {
        resolve({
          lat: res.latitude.toString(),
          lon: res.longitude.toString(),
        })
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
