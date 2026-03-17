import { Handler } from '@netlify/functions';

// Using a simple in-memory counter for this session
// For production, consider using a database or Netlify KV store
let visitorCount = 0;

// Create a persistent file-based counter (if Deno is available)
const COUNTER_FILE = '/tmp/visitor-count.json';

const readCounter = async (): Promise<number> => {
  try {
    // Try to read from environment variable (persists across deployments if set)
    const envCount = process.env.VISITOR_COUNT;
    return envCount ? parseInt(envCount, 10) : 0; // Default starting count
  } catch {
    return 0;
  }
};

const incrementCounter = async (): Promise<number> => {
  visitorCount = await readCounter();
  visitorCount += 1;
  // In production, you'd want to persist this to a database
  return visitorCount;
};

export const handler: Handler = async (event) => {
  try {
    // Allow CORS for your domain
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true }),
      };
    }

    const action = event.queryStringParameters?.action || 'get';

    if (action === 'increment') {
      const newCount = await incrementCounter();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ count: newCount, success: true }),
      };
    } else {
      // Just get the current count
      const count = await readCounter();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ count, success: true }),
      };
    }
  } catch (error) {
    console.error('Visitor count error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to process visitor count', success: false }),
    };
  }
};
