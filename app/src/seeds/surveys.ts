import { ObjectID } from "mongodb";

export default (userMap: any) : Array<any> => {

  return [
    {
      "_id": new ObjectID(),
      "name": "Questionário Share",
      "description": "Questionário pesquisa de share",
      "expiration": new Date("1994-11-05T13:15:30.000Z"),
      "owner": userMap,
      "asks": [
        {
          "_id": new ObjectID(),
          "title": "Share Marca Y",
          "type": "Text",
          "order": 1,
          "required": true
        },
        {
          "_id": new ObjectID(),
          "title": "Share Marca Y",
          "type": "Text",
          "order": 1,
          "required": false
        },
        {
          "_id": new ObjectID(),
          "title": "Share Marca Z",
          "multipleSelect": false,
          "options": [
            "MARCA Z1"
          ],
          "type": "Select",
          "order": 2,
          "required": false
        }
      ]
    }
  ];
};