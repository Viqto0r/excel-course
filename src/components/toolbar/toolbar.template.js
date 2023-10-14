const toButton = ({ icon, active, value }) => {
  const json = JSON.stringify(value)
  const meta = `data-type="button" data-value=${json}`
  return `
			<div class="button 
			${active ? 'active' : ''}" 
			${meta}>
				<i class="material-icons">${icon}</i>
			</div>
			`
}

export const createToolbar = ({
  textAlign,
  fontWeight,
  fontStyle,
  textDecoration,
}) => {
  const buttons = [
    {
      icon: 'format_align_left',
      active: textAlign === 'left',
      value: { textAlign: 'left' },
    },
    {
      icon: 'format_align_center',
      active: textAlign === 'center',
      value: { textAlign: 'center' },
    },
    {
      icon: 'format_align_right',
      active: textAlign === 'right',
      value: { textAlign: 'right' },
    },
    {
      icon: 'format_bold',
      active: fontWeight === 'bold',
      value: { fontWeight: fontWeight === 'bold' ? 'normal' : 'bold' },
    },
    {
      icon: 'format_italic',
      active: fontStyle === 'italic',
      value: { fontStyle: fontStyle === 'italic' ? 'normal' : 'italic' },
    },
    {
      icon: 'format_underline',
      active: textDecoration === 'underline',
      value: {
        textDecoration: textDecoration === 'underline' ? 'none' : 'underline',
      },
    },
  ]
  return buttons.map(toButton).join('')
}
