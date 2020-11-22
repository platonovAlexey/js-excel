import {capitalize} from '@core/utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodNmae(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implementen in 
            ${this.name || ''} Component`
        )
      }
      // addEventListener to dom.js method
      this.[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }
  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodNmae(listener)
      this.$root.off(listener, this[method])
    })
  }
}

// input => onInput
function getMethodNmae(eventName) {
  return 'on' + capitalize(eventName)
}
