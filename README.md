# Example app for testing the usage of [`ltijs`](https://www.npmjs.com/package/ltijs) in Next.JS

In this repo I want to answer the question: How can I use `ltijs` in a Next.JS
app?

## Solution 1: Usage of Next.JS middleware

The first solution is to utilize the
[Next.JS middleware](https://nextjs.org/docs/pages/building-your-application/routing/middleware)
to handle the LTI requests. While this is the most straightforward approach, it
does not work due to the following circumstances:

1. The middleware uses the
   [Edge Runtime](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes)
   which does not support Node.js modules. However `ltijs` uses thoese modules.
   When you run `yarn dev` with
   [`middleware.ts`](https://github.com/kulla/2024-07-05-using-lti-in-nextjs/blob/41e29f2501a546a02dcc0483b74b8cde7f6e5a33/src/middleware.ts)
   one gets the error
   `Error: The edge runtime does not support Node.js 'http' module.`
2. The Next.JS middleware uses a API based on
   [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
   However `ltijs` uses the [Express.js](https://expressjs.com/) API which is
   based on the request and response implementations of Node.JS.

## Solution 2: Usage of route handler

Instead of a middleware, we can use a
[route handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
to handle the LTI requests. Those also work in a Node.JS runtime so that `ltijs`
can be loaded. However the new route handler use still the fetch API which is
not compatible with the Express.js API of `ltijs`.
[`lti/[endpoint]/route.ts`](https://github.com/kulla/2024-07-05-using-lti-in-nextjs/blob/main/src/app/lti/%5Bendpoint%5D/route.ts)
show a short attempt to mock the express request and response objects. However
this seems to be a lot of work (since the inner model of express request /
response is quite different from the fetch API). It might be easier to implement
LTI from scratch in this case.

## Solution 3: Usage of NextAuth.JS

I only started testing the usage of [NextAuth.JS](https://next-auth.js.org/) for
LTI. Since LTI directely extends OAuth this might be a good solution. The file
[`[...nextauth].ts`](https://github.com/kulla/2024-07-05-using-lti-in-nextjs/blob/main/src/pages/api/auth/%5B...nextauth%5D.ts)
contains my current work in progress. This seems to be possible but I have the
feeling it takes 3-4 days to make it actually working.
