import * as dotenv from 'dotenv';
dotenv.config();

import { fetchData, sendEmbeds } from './utilities';
import Game from './Game';
import { GameSchema } from './schemas/gameSchema';
import { StoreSchema } from './schemas/storeSchema';
import Embed from './Embed';

(async () => {
  const url = 'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions';

  const store: StoreSchema = await fetchData(url);
  const gameData = store?.data?.Catalog?.searchStore?.elements;
  if (!gameData) throw new Error('No game data was found!');

  const games = gameData.map( (game: GameSchema) => new Game(game) );

  const timeNow = new Date();
  const onGoingDiscounts = games.filter( (game: Game) => game.getStartDate() < timeNow && game.getEndDate() > timeNow );
  const embeds = onGoingDiscounts.map( (game: Game) => new Embed(game) );
  await sendEmbeds(embeds, 'FREE NOW!', 'Current promos sent successfully!');
})();
