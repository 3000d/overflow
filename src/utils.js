export const displayDateTimeSchedule = (
  startDate,
  endDate,
  schedule,
  locale = undefined,
) => {
  let isMultiDays = false;
  if (endDate.getUTCDate() !== startDate.getUTCDate()) {
    isMultiDays = true;
  }

  return `░
    ${
      endDate
        ? startDate.toLocaleDateString(locale, {
            month: 'numeric',
            day: 'numeric',
          })
        : startDate.toLocaleDateString(locale)
    }
    ${isMultiDays ? `→ ${endDate.toLocaleDateString(locale)}` : ''} 
    ${schedule ? ` ░ ${schedule}` : ''} ░
    `;
};
