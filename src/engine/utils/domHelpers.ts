export type CanvasConfig = {
  id?: string
  styles?: { [key: string]: string }
}

const defaultStyles = `
  body {
    background: #1f1f1f;
  }
  canvas {
    background: transparent;
    display: block;
    left: 50%;
    margin: auto;
    position: absolute;
    transform: translateX(-50%);
  }
  div#gameWrapper {
    margin: auto;
    margin-top: 56px;
  }
`

const setDefaultStyles = () => {
  let styleEl = document.head.querySelector('style')
  if (styleEl) return

  styleEl = document.head.appendChild(document.createElement('style'))
  styleEl.appendChild(document.createTextNode(defaultStyles))
}

export const initGameWrapper = () => {
  setDefaultStyles()
  const gameWrapper = document.createElement('div')
  gameWrapper.id = 'gameWrapper'
  document.body.appendChild(gameWrapper)
  return gameWrapper
}

let ctxId = 0
export const getNewCanvasContext = (
  parent: HTMLElement,
  width: number,
  height: number,
  config?: CanvasConfig,
): CanvasRenderingContext2D => {
  const { id = ctxId, styles = {} } = config || {}
  ctxId += 1

  const canvas = document.createElement('canvas')
  canvas.id = `canvas__${id || ctxId}`
  canvas.height = height
  canvas.width = width

  // apply all valid override styles
  Object.entries(styles).forEach(([key, value]) => {
    if (key in canvas.style) {
      canvas.style[key] = value
    }
  })

  parent.appendChild(canvas)
  return canvas.getContext('2d')! // eslint-disable-line
}
