// 设置 __webpack_public_path__
const js = document.scripts;
const url = js[js.length - 1].src.split('?')[0];
const urlSplit = url.split('/');
urlSplit.pop();
urlSplit.pop();
__webpack_public_path__ = urlSplit.join('/') + '/'; // eslint-disable-line

console.log('webpack...', __webpack_public_path__);
// global values
window.g_MODAL_WIDTH = 800;
