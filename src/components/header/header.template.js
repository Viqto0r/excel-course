export const createHeader = ({ title }) => {
  return `
			<input type="text" class="input" value="${title}" />
			<div>
				<div class="button" data-type="btn" data-btn-type="delete">
					<i class="material-icons" >delete</i>
				</div>
				<div class="button" data-type="btn" data-btn-type="exit">
					<i class="material-icons">exit_to_app</i>
				</div>
			</div>
		`
}
