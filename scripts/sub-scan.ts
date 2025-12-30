import fs from 'node:fs'
import { join } from 'node:path'

export async function getSubDirs(dirPath: string): Promise<string[]> {
  try {
    const dirChildren = await fs.readdirSync(join(__dirname, '..', dirPath))
    return dirChildren.map(item => join(dirPath, item))
  }
  catch (err) {
    console.error('scan error:', err)
    return []
  }
}
