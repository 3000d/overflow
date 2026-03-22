import { type CollectionEntry, getCollection } from 'astro:content';
import {
  getLocaleCollectionUrl,
  getLocalizedStaticPaths,
} from '@i18n/utils.ts';
import { ICalCalendar, type ICalEventData } from 'ical-generator';
import { getVtimezoneComponent } from '@touch4it/ical-timezones';
import { toZonedTime } from 'date-fns-tz';
import { start } from 'node:repl';

export async function getStaticPaths() {
  return getLocalizedStaticPaths();
}

const getEvents = async (locale: string) => {
  return await getCollection('events', ({ id }) => {
    return id.startsWith(locale + '/');
  });
  // return events.sort((a, b) => {
  //   return a.data.startDate - b.data.startDate;
  // });
};

export async function GET({ params }) {
  const events = await getEvents(params.locale);

  const cal = new ICalCalendar({
    name: 'Overflow',
    timezone: {
      name: 'Europe/Brussels',
      generator: getVtimezoneComponent,
    },
  });

  events.forEach((event) => {
    const startDateLocal = toZonedTime(event.data.startDate, 'Europe/Brussels');
    const endDateLocal = toZonedTime(event.data.endDate, 'Europe/Brussels');

    const url = `https://overflow.gallery${getLocaleCollectionUrl(params.locale, 'events', event.id)}`;

    let icalData: ICalEventData = {
      summary: event.data.title,
      start: startDateLocal,
      end: endDateLocal,
      location: {
        title: 'Overflow',
        address: 'Rue Hongrée 6B, 4000 Liège',
        geo: { lat: 50.646786148958675, lon: 5.581917104144663 },
      },
      url,
      organizer: { name: 'Overflow', email: 'drop@overflow.gallery' },
      timezone: 'Europe/Brussels',
    };

    // Recurring
    if (event.data.recurring) {
      icalData = {
        ...icalData,
        repeating: event.data.recurring,
      };
    }

    cal.createEvent(icalData);
  });

  return new Response(cal.toString());
}
