const util = require('util');
const workerThreads = require('worker_threads');
const streamWeb = require('node:stream/web');

global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;
if (typeof MessageChannel === 'undefined') {
  const { MessageChannel, MessagePort } = require('worker_threads');
  global.MessageChannel = MessageChannel;
  global.MessagePort = MessagePort;
}

global.ReadableStream = streamWeb.ReadableStream;
global.TransformStream = streamWeb.TransformStream;
global.WritableStream = streamWeb.WritableStream;

const undici = require('undici');

const webApis = {
  fetch: undici.fetch,
  Headers: undici.Headers,
  Request: undici.Request,
  Response: undici.Response,
  FormData: undici.FormData,
};

Object.keys(webApis).forEach((key) => {
  if (!global[key]) {
    Object.defineProperty(global, key, {
      value: webApis[key],
      writable: true,
      configurable: true,
    });
  }
});
