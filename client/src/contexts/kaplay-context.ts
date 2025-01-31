import kaplay from "kaplay";

export const kap = kaplay({
  width: 1280,
  height: 720,
  letterbox: true, // makes responsive across screen sizes
  global: false, // cannot use kap outside file
  debug: true,
});
