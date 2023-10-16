const express = require('express');
const app = express();
const port = 3000;

let characters = [
  {
    id: 1,
    name: 'Reiner Braun',
    affiliation: 'Marley Army',
    titan: 'Armored Titan',
    img: 'https://i.pinimg.com/1200x/65/49/b7/6549b7c3d6217ebb539e734895d79d80.jpg',
    gif: 'https://media.tenor.com/GM_R4k3K5awAAAAd/reiner-braun-aot-season4.gif',
  },
  {
    id: 2,
    name: 'Levi Ackerman',
    affiliation: 'Scout Regiment',
    titan: 'Human',
    img: 'https://i.pinimg.com/564x/66/96/dc/6696dc04a235984e905a88c2607c7ffe.jpg',
    gif: 'https://media.tenor.com/AXTSXVbBdOIAAAAC/leviackerman-attackontitan.gif',
  },
  {
    id: 3,
    name: 'Zeke Yeager',
    affiliation: 'Marley Army',
    titan: 'Beast Titan',
    img: 'https://i.pinimg.com/564x/c7/68/bd/c768bd05929422beb5a722fd663f216a.jpg',
    gif: 'https://media.tenor.com/hjt2eG16LRAAAAAC/zeke-yeager.gif',
  },
  {
    id: 4,
    name: 'Mikasa Ackerman',
    affiliation: 'Scout Regiment',
    titan: 'Human',
    img: 'https://i.pinimg.com/564x/5e/0a/c3/5e0ac3d93fc5ff5abd4154ab02105140.jpg',
    gif: 'https://media.tenor.com/JugUDMHA6c0AAAAd/attack-on-titan-mikasa.gif',
  },
  {
    id: 5,
    name: 'Armin Arlert',
    affiliation: 'Scout Regiment',
    titan: 'Human',
    img: 'https://i.pinimg.com/564x/b2/9e/c1/b29ec1c6e6bc8598b64a57d3f37ab172.jpg',
    gif: 'https://media.tenor.com/yFO3gOcG_VYAAAAC/armin-aot-trailer.gif',
  },
  {
    id: 6,
    name: 'Erwin Smith',
    affiliation: 'Scout Regiment',
    titan: 'Human',
    img: 'https://i.pinimg.com/564x/00/10/80/00108082b07bfc618c82fc47ccea5fee.jpg',
    gif: 'https://media.tenor.com/fLXoJ8pJZkoAAAAd/erwin-smith-charge.gif',
  },
  {
    id: 7,
    name: 'Eren Yeager',
    affiliation: 'Scout Regiment',
    titan: 'Attack Titan',
    img: 'https://i.pinimg.com/564x/b3/c2/dc/b3c2dc5ae099680b71d0cc994896d3c3.jpg',
    gif: 'https://media.tenor.com/AmUr10RlAOYAAAAC/aot-attack-on-titan.gif',
  },
];

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/characters', (req, res) => {
  res.json(characters);
});

app.get('/api/characters/:id', (req, res) => {
  const id = Number(req.params.id);
  const character = characters.find((c) => c.id === id);

  if (!character) {
    res.status(404).json({ error: 'Character not found' });
  } else {
    res.json(character);
  }
});

app.delete('/api/characters/:id', (req, res) => {
  const id = Number(req.params.id);
  characters = characters.filter((c) => c.id !== id);

  res.status(204);
});

app.post('/api/characters', (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({ error: 'Missing name' });
  } else if (!body.affiliation) {
    return res.status(400).json({ error: 'Missing affiliation' });
  } else if (!body.img) {
    return res.status(400).json({ error: 'Missing img' });
  } else if (!body.gif) {
    return res.status(400).json({ error: 'Missing gif' });
  }

  const character = {
    id: characters.length + 1,
    name: body.name,
    affiliation: body.affiliation,
    titan: body.titan || null,
    img: body.img,
    gif: body.gif,
  };

  characters.push(character);

  res.json(character);
});

app.put('/api/characters/:id', (req, res) => {
  const id = Number(req.params.id);
  const character = characters.find((c) => c.id === id);

  if (!character) {
    return res.status(404).json({ error: 'Character not found' });
  }

  const body = req.body;

  character.name = body.name || character.name;
  character.affiliation = body.affiliation || character.affiliation;
  character.titan = body.titan || character.titan;
  character.img = body.img || character.img;
  character.gif = body.gif || character.gif;

  res.json(character);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
