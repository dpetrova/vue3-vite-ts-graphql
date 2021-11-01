import { graphqlOperation } from 'aws-amplify';
import {
  getUserAndConversations,
  createConversation,
  createConversationLink,
  createMessage,
  getConversation,
} from 'src/graphql/fragments';
import { getCurrentAuthUser } from 'src/driver/auth';
import { uid } from 'quasar';
import { AuthAPI } from 'src/driver/appsync';
import MT from './types';

async function newConversation(_vuex, { authorId, otherUserId }) {
  try {
    const members = [authorId, otherUserId];

    const conversationName = members.join(' and ');

    //create a new conversation based on the received payload
    const {
      data: {
        createConversation: { id: conversationLinkConversationId },
      },
    } = await AuthAPI.graphql(
      graphqlOperation(createConversation, {
        name: conversationName,
        members,
      })
    );

    const relation = { conversationLinkConversationId };

    //create the relationship between the conversation and the users in the conversation
    await Promise.all([
      AuthAPI.graphql(
        graphqlOperation(createConversationLink, {
          ...relation,
          conversationLinkUserId: authorId,
        })
      ),
      AuthAPI.graphql(
        graphqlOperation(createConversationLink, {
          ...relation,
          conversationLinkUserId: otherUserId,
        })
      ),
    ]);

    //return the ID and name of the conversation
    return Promise.resolve({
      id: conversationLinkConversationId,
      name: conversationName,
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

//create a new message to sending to the user
//function will receive a deconstructed JS objects as the first ({commit}) and second ({ message, conversationId }) arguments
async function newMessage({ commit }, { message, conversationId }) {
  try {
    commit(MT.LOADING);

    //fetch the user's username
    const { username } = await getCurrentAuthUser();

    //return the GraphQL createMessage mutation
    return AuthAPI.graphql(
      graphqlOperation(createMessage, {
        id: uid(),
        authorId: username,
        content: message,
        messageConversationId: conversationId,
        createdAt: Date.now(),
      })
    );
  } catch (e) {
    return Promise.reject(e);
  } finally {
    commit(MT.LOADING);
  }
}

//get the initial user messages
async function getMessages({ commit }) {
  try {
    commit(MT.LOADING);

    //get the id of the authenticated user
    const { id } = await getCurrentAuthUser();

    //execute the GraphQL getUserAndConversations mutation to fetch all the current user conversations
    const {
      data: {
        getUser: { conversations },
      },
    } = await AuthAPI.graphql(
      graphqlOperation(getUserAndConversations, {
        id,
      })
    );

    commit(MT.SET_CONVERSATIONS, conversations);

    return Promise.resolve(conversations);
  } catch (err) {
    commit(MT.ERROR, err);
    return Promise.reject(err);
  }
}

async function fetchNewMessages({ commit }, { conversationId }) {
  try {
    commit(MT.LOADING);

    //use the GraphQL getConversation query to fetch the messages in the conversation by id
    const { data } = await AuthAPI.graphql(
      graphqlOperation(getConversation, {
        id: conversationId,
      })
    );

    //received array of messages will be added to the state through the Vuex SET_MESSAGES mutation
    commit(MT.SET_MESSAGES, data.getConversation);

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
}

export default {
  newConversation,
  newMessage,
  getMessages,
  fetchNewMessages,
};
