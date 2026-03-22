import { type CollectionEntry, getCollection } from 'astro:content';
import {
  getLocaleCollectionUrl,
  getLocalizedStaticPaths,
} from '@i18n/utils.ts';
import * as ics from 'ics';

export async function getStaticPaths() {
  return getLocalizedStaticPaths();
}

const getEvents = async (locale: string) => {
  const events: CollectionEntry<'events'>[] = await getCollection(
    'events',
    ({ id }) => {
      return id.startsWith(locale + '/');
    },
  );

  return events.sort((a, b) => {
    return a.data.startDate - b.data.startDate;
  });
};

export async function GET({ params }) {
  const events = await getEvents(params.locale);

  const eventsFormatted = events.map((event) => {
    // check if event spans on more than one day
    const isMultipleDays =
      event.data.startDate.getDate() !== event.data.endDate.getDate();

    const url = `https://overflow.gallery${getLocaleCollectionUrl(params.locale, 'events', event.id)}`;

    let icsData = {
      title: event.data.title,
      location: 'Overflow — Rue Hongrée 6B, 4000 Liège',
      url,
      geo: { lat: 50.646786148958675, lon: 5.581917104144663 },
      categories: event.data.type ? [event.data.type] : undefined,
      status: 'CONFIRMED',
      organizer: { name: 'Overflow', email: 'drop@overflow.gallery' },
      calName: 'Overflow',
    };

    if (isMultipleDays) {
      icsData = {
        ...icsData,
        description: event.data.schedule,
        start: [
          event.data.startDate.getFullYear(),
          event.data.startDate.getMonth() + 1,
          event.data.startDate.getDate(),
          // event.data.startDate.getHours(),
          // event.data.startDate.getMinutes(),
        ],
        end: [
          event.data.endDate.getFullYear(),
          event.data.endDate.getMonth() + 1,
          event.data.endDate.getDate(),
          // event.data.endDate.getHours(),
          // event.data.endDate.getMinutes(),
        ],
      };
    } else {
      const diff =
        Math.abs(event.data.endDate - event.data.startDate) / 1000 / 60; // diff in ms then get minutes
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;

      icsData = {
        ...icsData,
        start: [
          event.data.startDate.getFullYear(),
          event.data.startDate.getMonth() + 1,
          event.data.startDate.getDate(),
          event.data.startDate.getHours(),
          event.data.startDate.getMinutes(),
        ],
        duration: { hours, minutes },
      };
    }

    // Recurring
    if (event.data.recurring) {
      icsData = {
        ...icsData,
        recurrenceRule: event.data.recurring,
      };
    }

    return icsData;
  });

  const icsEvents = ics.createEvents(eventsFormatted);
  //
  // if (!icsEvents.error) {
  //   return icsEvents.value;
  // } else {
  //   return icsEvents.error.message;
  // }

  return new Response(icsEvents.value);
}
