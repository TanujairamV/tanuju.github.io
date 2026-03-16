import { Handler } from '@netlify/functions';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const getAccessToken = async () => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token || '',
    }),
  });

  return response.json();
};

export const handler: Handler = async () => {
  if (!refresh_token || !client_id || !client_secret) {
    return {
      statusCode: 200,
      body: JSON.stringify({ isPlaying: false, message: "Missing environment variables" }),
    };
  }

  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      return {
        statusCode: 200,
        body: JSON.stringify({ isPlaying: false }),
      };
    }

    const song = await response.json();

    if (song.item === null) {
      return {
        statusCode: 200,
        body: JSON.stringify({ isPlaying: false }),
      };
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isPlaying,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
      }),
    };
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return {
      statusCode: 200,
      body: JSON.stringify({ isPlaying: false, error: 'Failed to fetch data' }),
    };
  }
};
