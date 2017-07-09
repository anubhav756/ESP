import { Mongo } from 'meteor/mongo';

export const MAX_ROOM_PLAYERS = 2;
export default new Mongo.Collection('rooms');
