
export function onRequest ({ locals, request }, next) {
  // intercept data from a request
  // optionally, modify the properties in `locals`
  locals.title = "New title";

  console.log('onRequest', locals, request)
  // return a Response or the result of calling `next()`
  return next();
};
