/**
 * 2017-9-4 18:36:55
 *
 * Use Array#filter to write a function called getShortMessages.
 * getShortMessages takes an array of objects with '.message' properties and returns an array of messages that are less than < 50 characters long.
 * The function should return an array containing the messages themselves, without their containing object.
 * */

interface Message {
  message: string,
}

function getShortMessages(messages: Message[]) {
  return messages
    .filter(value => value.message.length < 50)
    .map(value => value.message);
}

module.exports = getShortMessages;
