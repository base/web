import { Framework, Region, TrackerType, TrackingCategory } from '@coinbase/cookie-manager';

export const cookieManagerConfig = {
  categories: [
    {
      id: TrackingCategory.NECESSARY,
      expiry: 365,
      required: true,
      trackers: [
        {
          id: 'ip_country',
          type: TrackerType.COOKIE,
          expiry: 10,
        },
        {
          id: 'locale',
          type: TrackerType.COOKIE,
        },
      ],
    },
    {
      id: TrackingCategory.PERFORMANCE,
      expiry: 365,
      trackers: [
        {
          id: "_dd_s",
          type: TrackerType.COOKIE
        },
        {
          id: 'base_device_id',
          type: TrackerType.COOKIE,
        },
      ],
    },
  ],
  geolocationRules: [
    {
      region: Region.DEFAULT,
      framework: Framework.OPT_OUT,
    },
    {
      region: Region.EU,
      framework: Framework.OPT_IN,
    },
  ],
};
