/**
 * 定义了部分tar-stream包的内容
 * */

declare module 'tar-stream' {
  import * as stream from 'stream';

  export interface Headers {
    name: string;
    size: number;      // entry size. defaults to 0
    mode: '0755' | '0644';      // entry mode. defaults to to 0755 for dirs and 0644 otherwise
    mtime: Date;        // last modified date for entry. defaults to now.
    type: 'file' | 'link' | 'symlink' | 'directory' | 'block-device' | 'character-device' | 'fifo' | 'contiguous-file';
    linkname: string;  // linked file name
    uid: number;            // uid of entry owner. defaults to 0
    gid: number;            // gid of entry owner. defaults to 0
    uname: string | null;     // uname of entry owner. defaults to null
    gname: string | null;     // gname of entry owner. defaults to null
    devmajor: number;       // device major version. defaults to 0
    devminor: number;       // device minor version. defaults to 0
  }

  // creating Tarball
  export class WritingEntry extends stream.Writable {
    constructor();

  }

  export class Pack extends stream.Readable {
    constructor();

    // add a file called my-test.txt with the content
    entry(header: Headers, content: string): void;
    // add a file called my-stream-test.txt from a stream
    entry(header: Headers, callback?: (err: Error) => void): WritingEntry;

    // the stream was added, no more entries
    finalize(): void;
  }

  // Extracting Tarball
  export class Extract extends stream.Writable{
    constructor();

    on(event: string, listener: (...args: any[]) => void): this;
    on(event: 'entry', listener: (header: Headers, stream: stream.Readable, next: ()=>void) => void): this;
    on(event: "close", listener: () => void): this;
    on(event: "drain", listener: () => void): this;
    on(event: "error", listener: (err: Error) => void): this;
    on(event: "finish", listener: () => void): this;
    on(event: "pipe", listener: (src: stream.Readable) => void): this;
    on(event: "unpipe", listener: (src: stream.Readable) => void): this;

  }

  export function pack(): Pack;

  export function extract(): Extract;

}
