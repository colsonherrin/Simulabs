// The stand-alone page only uses minds that talk over plain HTTPS. Anything asking for a server-style
// WebSocket here is a mind that cannot run in the browser.
export default class WebSocket {
  static OPEN = 1;
  constructor() { throw new Error('this mind needs the backend; it cannot run inside the browser'); }
}
