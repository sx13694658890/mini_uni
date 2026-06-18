import fs from 'node:fs'
import { join } from 'node:path'

export async function getSubDirs(dirPath: string): Promise<string[]> {
  const fullPath = join(__dirname, '..', dirPath)
  if (!fs.existsSync(fullPath)) {
    return []
  }

  const dirChildren = fs.readdirSync(fullPath)
  return dirChildren
    .filter(item => fs.statSync(join(fullPath, item)).isDirectory())
    .map(item => join(dirPath, item))
}
