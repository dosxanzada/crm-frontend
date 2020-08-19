let path = window.location.pathname
path = path.substring(0, path.lastIndexOf('/') + 1)
path += (process.env.NODE_ENV === 'development') ? 'app/assets/copy/api/' : 'assets/api/'

export default {
  // apiUrl: 'http://34.217.100.201:3000/api/',
  // soketUrl: 'http://34.217.100.201:3000/',
  // fileUrl: 'http://34.217.100.201:3000/',
  apiUrl: 'http://localhost:3000/api/',
  soketUrl: 'http://localhost:3000/',
  fileUrl: 'http://localhost:3000/',
  mockApiUrl:  path,
}
