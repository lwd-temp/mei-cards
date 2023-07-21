const getRecordCard = require('../../lib/hoyo/getRecordCard');
const { createCanvas } = require('@napi-rs/canvas');


export default async function handler(req, res) {
  try {
    // do card
    let { game } = req.query;
    if (!game) {
      return res.status(400).json({ success: false, error: 'Missing game' });
    }
    if (game != 'genshin' && game != 'honkai3rd' && game != 'starrail') {
      return res.status(400).json({ success: false, error: 'Invalid game' });
    }

    let hoyolabRecordCard = await getRecordCard(game);
    if (!hoyolabRecordCard.success) {
      return res.status(400).json({ success: false, error: 'Failed to get data from HoYoLab' });
    }
    console.log(hoyolabRecordCard);

    try {
      // make canvas
      const cardCanvas = createCanvas(1200, 600);
      const cardCTX = cardCanvas.getContext('2d');

      // load background based on game


      // ctx.lineWidth = 10
      // ctx.strokeStyle = '#03a9f4'
      // ctx.fillStyle = '#03a9f4'

      // // Wall
      // ctx.strokeRect(75, 140, 150, 110)

      // // Door
      // ctx.fillRect(130, 190, 40, 60)

      // // Roof
      // ctx.beginPath()
      // ctx.moveTo(50, 140)
      // ctx.lineTo(150, 60)
      // ctx.lineTo(250, 140)
      // ctx.closePath()
      // ctx.stroke()

      // res.setHeader('Cache-Control', 'public, max-age 432000, stale-while-revalidate 86400');
      // res.setHeader('Content-Type', 'image/png');
      // const pngCanvas = await canvas.encode('png');
      // return res.end(pngCanvas);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, error: 'Failed to make card' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}