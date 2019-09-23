// index.ejs上资源路径
var $path = document.querySelector('meta[name="AppPublic"]');

// eslint-disable-next-line
__webpack_public_path__ = $path ? $path.getAttribute('content') : './';