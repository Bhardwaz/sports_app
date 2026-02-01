import express from 'express';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) =>
{  res.status(200).send('Welcome to the server!') });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

