import axios from 'axios';

import { HttpClient } from '@libs/types/http';

export const clientFetcher: HttpClient = axios.create({
  baseURL: '/api/external'
});
