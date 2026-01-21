import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import {
  ReadableStream,
  TransformStream,
  WritableStream,
} from 'node:stream/web';
import { fetch, Headers, Request, Response } from 'undici';
import { cleanup } from '@testing-library/react';
import nock from 'nock';

import axios from 'axios';
axios.defaults.adapter = 'http';

Object.assign(global, {
  fetch,
  Headers,
  Request,
  Response,
  TextEncoder,
  TextDecoder,
  ReadableStream,
  TransformStream,
  WritableStream,
});

// @ts-ignore
delete global.MessageChannel;
// @ts-ignore
delete global.MessagePort;

afterEach(() => {
  cleanup();
});