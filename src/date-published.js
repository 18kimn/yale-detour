// used with vite-plugin-compile-time to insert date published
// when built
export default () => {
  return {
    data: {date: new Date()},
  }
}
