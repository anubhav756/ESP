import { Mongo } from 'meteor/mongo';
import Images from '/imports/api/images/images';

const Rooms = new Mongo.Collection('rooms');
export const MAX_ROOM_PLAYERS = 2;

Rooms.schema = new SimpleSchema({
  _id: { type: SimpleSchema.RegEx.Id },
  players: { type: [SimpleSchema.RegEx.Id], max: MAX_ROOM_PLAYERS, min: 1 },
  primary: { type: Images.schema, optional: true },
  secondary: { type: [Images.schema], optional: true },
  answers: { type: Object, blackbox: true, optional: true },
});

Rooms.attachSchema(Rooms.schema);

export default Rooms;
