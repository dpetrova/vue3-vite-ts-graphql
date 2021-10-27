import Amplify from 'aws-amplify';
import AwsExports from '../aws-exports'; //file that the AWS Amplify CLI created in the configuration process

Amplify.configure(AwsExports);

//in order for the Quasar boot file to work, we need to export a default empty function
export default () => {};
