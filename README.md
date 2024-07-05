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
