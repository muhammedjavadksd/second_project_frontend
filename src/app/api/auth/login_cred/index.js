// src/app/api/hello/route.js

export async function POST(request) {
  
  return new Response(JSON.stringify({ message: "Hello, world!" }));
}
 