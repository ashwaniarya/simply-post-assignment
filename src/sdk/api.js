const BASE_URLS = {
  production: '',
  development: 'http://localhost:5000'
}

const BASE_URL = process.env.NODE_ENV === 'development'? BASE_URLS.development : BASE_URLS.production;

const PATH = {
    getPublicPost: '/v1/posts?page={{page}}&limit={{limit}}',
}

export {
  BASE_URL,
  PATH
}