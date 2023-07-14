
export default class WorkerClass {
  constructor(work) {
    const code = work.toString()
    const blob = new Blob(['(' + code + ')()'])

    return new Worker(URL.createObjectURL(blob))
  }
}

