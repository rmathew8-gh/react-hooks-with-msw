import { graphql, HttpResponse } from 'msw';

export const handlers = [
  graphql.query("GetLaunches", () => {
    return HttpResponse.json({
      data: {
        launchesPast: [
          {
            id: '108',
            mission_name: 'Starlink-15 (v1.0)',
            launch_date_local: '2020-10-24T11:31:00-04:00',
            links: {
              mission_patch_small: 'https://images2.imgbox.com/9a/96/nLppz9HW_o.png',
            },
          },
          {
            id: '107',
            mission_name: 'Starlink-14 (v1.0)',
            launch_date_local: '2020-10-18T08:25:00-04:00',
            links: {
              mission_patch_small: 'https://images2.imgbox.com/9a/96/nLppz9HW_o.png',
            },
          },
          {
            id: '106',
            mission_name: 'Starlink-13 (v1.0)',
            launch_date_local: '2020-10-06T07:29:00-04:00',
            links: {
              mission_patch_small: 'https://images2.imgbox.com/9a/96/nLppz9HW_o.png',
            },
          },
          {
            id: '105',
            mission_name: 'Starlink-12 (v1.0)',
            launch_date_local: '2020-10-06T07:51:00-04:00',
            links: {
              mission_patch_small: 'https://images2.imgbox.com/9a/96/nLppz9HW_o.png',
            },
          },
          {
            id: '104',
            mission_name: 'SAOCOM 1B, GNOMES-1, Tyvak-0172',
            launch_date_local: '2020-08-30T19:18:00-04:00',
            links: {
              mission_patch_small: 'https://images2.imgbox.com/e7/01/lB9VKSwG_o.png',
            },
          },
        ],
      },
    });
  }),
];
