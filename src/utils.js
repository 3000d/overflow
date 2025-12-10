export const displayDateTimeSchedule = (
  startDate,
  endDate,
  schedule,
  locale = undefined,
) => {
  return `░
    ${
      endDate
        ? startDate.toLocaleDateString(locale, {
            month: 'numeric',
            day: 'numeric',
          })
        : startDate.toLocaleDateString(locale)
    }
    ${endDate ? `→ ${endDate.toLocaleDateString(locale)}` : ''} 
    ${schedule ? ` ░ ${schedule}` : ''} ░
    `;
};
