setInterval(function() {
  postMessage('update!');
}, 10000);

onmessage = function (e) {
  console.log(e.data);
};
