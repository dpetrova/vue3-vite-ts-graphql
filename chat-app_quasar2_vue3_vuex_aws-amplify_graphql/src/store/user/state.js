export function createState() {
  return {
    id: '',
    username: '',
    email: '',
    name: '',
    avatar: {
      key: '',
      bucket: '',
      region: '',
    },
    password: '',
    loading: false,
    validated: false,
    error: undefined,
  };
}

//in order to export the state as a singleton and make it available as a JavaScript object, we need to export default the execution of the createState function
export default createState();
