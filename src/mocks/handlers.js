import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.example.com/channels', () => {
    console.log('MSW intercepted the request');
    return HttpResponse.json(
      [
        {
          recipient: {
            id: 1,
            full_name: 'John Doe',
            profilePicture: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
          },
          channelName: 'General',
        },
        {
          recipient: {
            id: 2,
            full_name: 'Jane Smith',
            profilePicture: 'https://www.gravatar.com/avatar/',
          },
          channelName: 'Random',
        },
      ],
      { status: 200 }
    );
  }),
];
