import {$} from '@core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    this.component = this.components.map(Component => {
      // const $el = document.createElement('div')
      // $el.classList.add(Component.className)
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.html(component.toHTML())
      // $root.insertAdjacentHTML('beforeend', component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }

  render() {
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>TEST</h1>`)
    this.$el.append(this.getRoot())
    this.component.forEach(component => component.init())
  }
}