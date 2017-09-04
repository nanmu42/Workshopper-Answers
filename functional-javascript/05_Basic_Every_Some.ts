/**
 * 2017-9-4 18:50:12
 *
 * Return a function that takes a list of valid users, and returns a function that returns true if all of the supplied users exist in the original list of users.
 * You only need to check that the ids match.
 * */

interface User {
  id: number,
}

function checkUsersValid(goodUsers: User[]) {
  return function allUsersValid(submittedUsers: User[]) {
    return submittedUsers
      .every(submitted =>
        goodUsers.some(good =>
          good.id === submitted.id));
  };
}

module.exports = checkUsersValid
