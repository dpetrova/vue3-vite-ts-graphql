import { graphqlOperation } from 'aws-amplify';
//import { listUsers, getUser } from 'src/graphql/queries';
import { listUsers, getUser } from 'src/graphql/fragments';
import { createUser, updateUser } from 'src/graphql/mutations';
import { AuthAPI } from 'src/driver/appsync';
import {
  signUp,
  validateUser,
  signIn,
  getCurrentAuthUser,
  changePassword,
} from 'src/driver/auth';
import MT from './types';

//this function will get the currently authenticated user, get their data from the GraphQL API, and commit the user data to the Vuex store
async function initialLogin({ commit }) {
  try {
    commit(MT.LOADING);

    //get the currently authenticated user
    const AuthUser = await getCurrentAuthUser();

    //get user data from the GraphQL API
    const { data } = await AuthAPI.graphql(
      graphqlOperation(getUser, {
        id: AuthUser.username,
      })
    );

    //commit the user data to the Vuex store
    commit(MT.SET_USER_DATA, data.getUser);

    return Promise.resolve(AuthUser);
  } catch (err) {
    commit(MT.ERROR, err);
    return Promise.reject(err);
  }
}

//this function will execute the signUp function from the auth.js driver to sign up and create the user in the AWS Cognito user pool, and then commit the user data to the Vuex store
async function signUpNewUser(
  { commit },
  { email = '', name = '', username = '', password = '' }
) {
  try {
    commit(MT.LOADING);

    //execute the signUp function from the auth.js driver and create the user in the AWS Cognito user pool
    const userData = await signUp(email, password);

    //commit the user data to the Vuex store
    commit(MT.CREATE_USER, {
      id: userData.userSub,
      email,
      password,
      name,
      username,
    });

    return Promise.resolve(userData);
  } catch (err) {
    commit(MT.ERROR, err);
    return Promise.reject(err);
  }
}

//this function will fetch the user data from state and execute the validateUser function from the auth.js driver to check if the user is a valid user in the AWS Cognito user pool;
//then will execute the signIn function from auth.js and after that will fetch the authenticated user data and send it to the GraphQL API to create a new user
async function createNewUser({ commit, state }, code) {
  try {
    commit(MT.LOADING);
    //fetch the user data from state
    const { email, name, username, password } = state;
    //execute validateUser function from the auth.js driver to check if the user is a valid user in the AWS Cognito user pool
    const userData = await validateUser(email, code);
    //execute the signIn function from auth.js driver (password needs to be converted into an encrypted base64 string before we send it to the function)
    await signIn(`${email}`, `${window.atob(password)}`);
    //fetch the authenticated user data
    const { id } = await getCurrentAuthUser();
    //send user data to the GraphQL API to create a new user
    await AuthAPI.graphql(
      graphqlOperation(createUser, {
        input: {
          id,
          username,
          email,
          name,
        },
      })
    );

    commit(MT.USER_VALIDATED);

    return Promise.resolve(userData);
  } catch (err) {
    commit(MT.ERROR, err);
    return Promise.reject(err);
  }
}

//this function will execute the signIn function from the auth.js driver, and then dispatch the initialLogin Vuex action
async function signInUser({ commit, dispatch }, { email = '', password = '' }) {
  try {
    commit(MT.LOADING);

    //execute the signIn function from the auth.js driver
    await signIn(`${email}`, `${password}`);
    //dispatch the initialLogin Vuex action
    await dispatch('initialLogin');

    return Promise.resolve(true);
  } catch (err) {
    commit(MT.ERROR);
    return Promise.reject(err);
  }
}

//this function will merge the state values with the new ones that we received, then send them to the GraphQL API to update the user information;
//then will check if we have both the password and newPasssword properties filled in, and if so, will execute the changePassword function from the auth.js driver to change the user's password in the AWS Cognito user pool
async function editUser(
  { commit, state },
  {
    username = '',
    name = '',
    avatar = {
      key: '',
      bucket: '',
      region: '',
    },
    password = '',
    newPassword = '',
  }
) {
  try {
    commit(MT.LOADING);

    //merge the state values with the new ones
    const updateObject = {
      ...{
        name: state.name,
        username: state.username,
        avatar: state.avatar,
      },
      ...{
        name,
        username,
        avatar,
      },
    };

    //send data to the GraphQL API to update the user information
    const { data } = await AuthAPI.graphql(
      graphqlOperation(updateUser, { input: { id: state.id, ...updateObject } })
    );

    //check if we have both the password and newPasssword properties filled in
    if (password && newPassword) {
      //if so execute the changePassword function from the auth.js driver to change the user's password in the AWS Cognito user pool
      await changePassword(password, newPassword);
    }

    commit(MT.SET_USER_DATA, data.updateUser);

    return Promise.resolve(data.updateUser);
  } catch (err) {
    return Promise.reject(err);
  }
}

//this function will fetch all the users on the database and return a list
async function listAllUsers() {
  try {
    const {
      data: {
        listUsers: { items: usersList },
      },
    } = await AuthAPI.graphql(graphqlOperation(listUsers));

    return Promise.resolve(usersList);
  } catch (e) {
    return Promise.reject(e);
  }
}

export default {
  initialLogin,
  signUpNewUser,
  createNewUser,
  signInUser,
  editUser,
  listAllUsers,
};
