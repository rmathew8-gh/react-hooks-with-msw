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
            profilePicture: 'https://via.placeholder.com/50',
          },
          channelName: 'General',
        },
        {
          recipient: {
            id: 2,
            full_name: 'Jane Smith',
            profilePicture: 'https://via.placeholder.com/50',
          },
          channelName: 'Random',
        },
      ],
      { status: 200 }
    );
  }),
];
