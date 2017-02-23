const app = require('express')();
const proxy = require('express-http-proxy');
const PORT = process.env.PORT || 5000;

app.use(proxy('https://raw.githubusercontent.com/', {
  forwardPath: req => require('url').parse(req.url).path,
  intercept: (rsp, data, req, res, callback) => {
    res.set('Content-Type', 'application/javascript; charset=utf-8');
    callback(null, data);
  }
}));

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
