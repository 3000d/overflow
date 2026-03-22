import { toZonedTime } from 'date-fns-tz';

export const displayDate = (date, locale = undefined) => {
  const dateLocal = toZonedTime(date, 'Europe/Brussels');
  return dateLocal.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
  });
};

export const displayDateTimeSchedule = (
  startDate,
  endDate,
  schedule = undefined,
  locale = undefined,
) => {
  const startDateLocal = toZonedTime(startDate, 'Europe/Brussels');
  const endDateLocal = toZonedTime(endDate, 'Europe/Brussels');
  const isMultiDays = endDateLocal.getUTCDate() !== startDateLocal.getUTCDate();

  if (!schedule) {
    schedule = startDateLocal.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
    });

    if (endDateLocal) {
      schedule +=
        ' — ' +
        endDateLocal.toLocaleTimeString(locale, {
          hour: 'numeric',
          minute: 'numeric',
        });
    }
  }

  return `░
    ${
      endDateLocal
        ? startDateLocal.toLocaleDateString(locale, {
            month: 'numeric',
            day: 'numeric',
          })
        : startDateLocal.toLocaleDateString(locale)
    }
    ${isMultiDays ? `→ ${endDateLocal.toLocaleDateString(locale)}` : ''} 
    ${schedule ? ` ░ ${schedule}` : ''} ░
    `;
};
