export function addMessage(message) {
  return {
    type: 'ADD_MESSAGE',
    message: message
    };
}

export function resetMessages() {
  return {
    type: 'RESET_MESSAGES'
    };
}
