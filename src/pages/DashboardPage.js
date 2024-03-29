import { $ } from '../core/dom'
import { Page } from '../core/page/Page'
import { createRecordsTable } from '../shared/dashboard.functions'

export class DashboardPage extends Page {
  async getRoot() {
    // Генерируем Id
    const id = Date.now()
    return $.create('div', 'db').html(`
        <div class="db__header">
          <h1>Excel Dashboard</h1>
        </div>
        <div class="db__new">
          <div class="db__view">
            <a href="#excel/${id}" class="db__create">Новая<br />Таблица</a>
          </div>
        </div>
        <div class="db__table db__view">
          ${createRecordsTable()}
        </div>
				`)
  }
}
