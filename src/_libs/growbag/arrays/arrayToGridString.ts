/* eslint-disable @typescript-eslint/no-explicit-any */
export function arrayToGridString(arr: any[], width: number): string {
  const len = `${arr[arr.length - 1]}`.length
  const lines: string[] = []

  let line: string[] = []
  for (let i = 1; i <= arr.length; i += 1) {
    line.push(`${arr[i - 1]}`.padStart(len, '0'))
    if (i > 0 && i % width === 0) {
      lines.push(line.join(', '))
      line = []
    }
  }

  return lines.join('\n')
}
