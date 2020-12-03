import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {
  shouldResize,
  isCell,
  matrix,
  nextSelector
} from '@/components/table/table.function'
import {TableSelection} from '@/components/table/TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options
    })
  }
  toHTML() {
    return createTable(20)
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)

    this.emitter.subscribe('it is working', text => {
      this.selection.current.text(text)
      console.log('table', text)
    })
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
        console.log('e', this.selection, $cells, matrix)
      } else {
        this.selection.select($target)
      }
    }
  }
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]
    const {key} = event

    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selection.select($next)
    }
  }
}

