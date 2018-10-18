import { get } from 'utils/fetch';

export const getProfile = () => get('https://jsonplaceholder.typicode.com/users');
