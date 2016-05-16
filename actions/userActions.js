export function addUser(user) {
  return {
    type: 'FOUND_USER',
    user: user
    };
}

export function receiveUsers(users) {
  return {
    type: 'USERS_FOUND',
    users: users
    };
}
