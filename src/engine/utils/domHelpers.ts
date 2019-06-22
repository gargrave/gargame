export type CanvasConfig = {
  height: number
  styles?: { [key: string]: string }
  width: number
}

let ctxId = 0
export const getNewCanvasContext = (
  parent: HTMLElement,
  config: CanvasConfig,
  id?: string,
): CanvasRenderingContext2D => {
  const { height, styles = {}, width } = config
  ctxId += 1

  const canvas = document.createElement('canvas')
  canvas.id = `canvas__${id || ctxId}`
  canvas.height = height
  canvas.width = width
  // TODO: put these in a style block instead of applying them inline
  // document.head.appendChild(document.createElement('style'))
  canvas.style.display = 'block'
  canvas.style.margin = 'auto'
  canvas.style.position = 'absolute'
  canvas.style.left = '50%'
  canvas.style.transform = 'translateX(-50%)'

  // apply all supplied valid styles
  Object.entries(styles).forEach(([key, value]) => {
    if (key in canvas.style) {
      canvas.style[key] = value
    }
  })

  parent.appendChild(canvas)
  return canvas.getContext('2d')! // eslint-disable-line
}
