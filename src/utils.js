export const displayDateTimeSchedule = (
  startDate,
  endDate,
  schedule = undefined,
  locale = undefined,
) => {
  let isMultiDays = false;
  if (endDate.getUTCDate() !== startDate.getUTCDate()) {
    isMultiDays = true;
  }

  if (!schedule) {
    schedule = startDate.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
    });

    if (endDate) {
      schedule +=
        ' — ' +
        endDate.toLocaleTimeString(locale, {
          hour: 'numeric',
          minute: 'numeric',
        });
    }
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
