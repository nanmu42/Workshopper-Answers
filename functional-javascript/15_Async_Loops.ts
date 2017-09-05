/**
 * 2017-9-5 15:03:36
 *
 * Fix this code! The callback should be called with all the users loaded.
 * The order of the users should match the order of supplied user ids.
 * Because this function is asynchronous, we do not care about its return value.
 * */

function loadUsers(userIds: number[], load: (id: number, cb: (user: any) => void) => void, done: Function) {
  let users: any[] = [];
  let len = userIds.length;
  let index: number = 0;

  if (!len) {
    done({});
    return;
  }

  load(userIds[ index ], fetch);

  function fetch(user: any) {
    if (index > len - 1) {
      // 已经加载全部
      done(users);
    } else {
      users.push(user);
      load(userIds[ ++index ], fetch);
    }
  }
}

module.exports = loadUsers;
