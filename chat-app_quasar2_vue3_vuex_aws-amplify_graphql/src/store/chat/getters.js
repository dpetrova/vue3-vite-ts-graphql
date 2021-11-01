//_variable (underscore variable) is a technique used in JavaScript to indicate that the function created can have those arguments, but it won't use them for now
//In our case, the Vuex getters API always executes every getter call passing state, getters, rootState, and rootGetters,
//because with the linter rule, we added underscores to the unused arguments
const getConversations = (state, _getters, _rootState, rootGetters) => {
  const { conversations } = state;

  //return a filtered list of the conversations between the user and another user on the application
  return conversations
    .reduce((acc, curr) => {
      const { conversation } = curr;

      const user = rootGetters['user/getUser'].id;

      const users = conversation.associated.items
        .reduce(
          (a, c) => [...a, { ...c.user, conversation: conversation.id }],
          []
        )
        .filter((u) => u.id !== user);

      return [...acc, users];
    }, [])
    .flat(Infinity);
};

const getChatMessages = (state) => (convId) =>
  state.messages.length
    ? state.messages.find((m) => m.id === convId).messages.items
    : [];

const isLoading = (state) => state.loading;

const hasError = (state) => state.error;

export default {
  getConversations,
  getChatMessages,
  isLoading,
  hasError,
};
