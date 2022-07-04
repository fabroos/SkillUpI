const dateFormater = new Intl.DateTimeFormat('es-AR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

export const formatDate = (date = '') => {
  const dateObject = new Date(date)
  return dateFormater.format(dateObject) || '-'
}
