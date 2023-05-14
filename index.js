const express = require('express');
const { Client } = require('@elastic/elasticsearch');

const app = express();

const client = new Client({
  cloud: { id: '26b39e313dfe4325978c2d4faf151b5f:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQyNGMxM2I4YzBjNDI0YTBlOTllY2I5NGRkZjYyZWVhNiQzNWU4MDkyNDI5MTk0NWYzODE2ZTdjMzRkYjg0NjJkOA==' },
  auth: { apiKey: 'TXR1YUc0Z0JiMkJQTDRrV1hhUVY6TXl4cU1YdGlRVnlYZll0UVdiZWpNUQ==' }
})


app.get('/', (req, res) => {
  res.status(200).send("base test route")
});

app.get('/getindex/*', async (req, res) => {

  const getindex = req.path.split('/')[2];

  client.search({
    index: 'search-poc',
    query: {
      match: { route: getindex }
    }
  }).then(resp => {
    res.status(200).json({ response: resp.hits.hits })
  }).catch(e => {
    throw (e)
  })

});

app.post('/createindex/*', async (req, res) => {

  const newRoute = req.path.split('/')[2];

  await client.index({
    index: 'search-poc',
    document: req.body
  });

  await client.indices.refresh({ index: 'search-poc' });

  res.status(200).send(`Create ${newRoute} document successfully`);
});

app.listen('4000', () => {
  console.log("Server is listening to port 4000");
});