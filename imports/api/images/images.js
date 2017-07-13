import { Mongo } from 'meteor/mongo';

const Images = new Mongo.Collection('images');

Images.schema = new SimpleSchema({
  _id: { type: SimpleSchema.RegEx.Id },
  url: { type: SimpleSchema.RegEx.Url },
  tags: { type: [String] },
});

Images.attachSchema(Images.schema);

export default Images;
