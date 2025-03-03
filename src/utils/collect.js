// @ts-check
/*
* @param {AsyncIterable<Uint8Array>} iterable
* @returns {ReadableStream}
*/
export function collect(iterable) {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(iterable)
      controller.close()
    }
  })
}
