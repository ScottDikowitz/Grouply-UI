export function addMessage(message) {
  return {
    type: 'ADD_MESSAGE',
    message: message
    };
}

export function addMessages(messages) {
  return {
    type: 'ADD_MESSAGES',
    messages: messages
    };
}

export function resetMessages() {
  return {
    type: 'RESET_MESSAGES'
    };
}
