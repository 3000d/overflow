export const displayDateTimeSchedule = (startDate, endDate, schedule) => {
  return `░
    ${startDate.toLocaleDateString('fr-BE')}
    ${endDate ? `→ ${endDate.toLocaleDateString('fr-BE')}` : ''} 
    ${schedule ? ` ░ ${schedule}` : ''} ░
    `;
};
