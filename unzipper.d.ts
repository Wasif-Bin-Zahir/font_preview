declare module 'unzipper' {
    import { Stream } from "stream";
  
    export function Extract(opts: { path: string }): Stream;
  
    export namespace Open {
      export function file(filename: string): Promise<{ files: Array<{ path: string, stream: () => Stream }> }>;
    }
  }
  