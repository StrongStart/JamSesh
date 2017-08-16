// /* eslint no-param-reassign: "off" */
// require('dotenv').config({ silent: true });
// const path = require('path');
// const webpack = require('webpack');
// const express = require('express');
// const config = require('./webpack.config');
// const app = express();
// const compiler = webpack(config);

// app.use(require('webpack-dev-middleware')(compiler, {
//   publicPath: config.output.publicPath,
// }));

// app.use(require('webpack-hot-middleware')(compiler));

// app.use('/dist', express.static(path.join(__dirname, 'dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.listen(4200, (err) => {
//   if (err) {
//     console.error(err);
//   }
//   console.warn('Listening at 4200');
// });
