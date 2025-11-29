import { Flex ,Alert, Tag} from "antd";
import hippoDarkUrl from "./assets/hippo-dark.png";
function Welcome() {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap={20}
      style={{ padding: 20 }}
    >
      <div>
        <img src={hippoDarkUrl} width={100} height={100} />

        
        <h1>Welcome to Hippo BPM DevTools! </h1>
        <Tag color={"blue"}>Version 0.1</Tag>
        <p>
          Hippo DevTools is your all-in-one solution for developing, testing,
          and managing IBM BAW applications with ease.
        </p>
        <ul>
          <li> Supports both IBM BAW traditional and Cloud Pak versions</li>
          <li> View all your snapshots and toolkit dependencies</li>
          <li> Explore toolkits, snapshots, and their dependency chains</li>
          <li> Execute test services effortlessly</li>
          <li> View instance details in a clean, readable format</li>
          <li>
            Manage and monitor multiple environments within a single app—no need
            to log in to multiple portals
          </li>
          <li> Compare results across environments directly within the app</li>
        </ul>
        <p>Get started by selecting an option from the main menu!</p>
        <Alert title="If the REST API URL for your Cloud Pak environment ends with /bas, ensure this suffix is included in the URL field" type="warning" />
      </div>
       
    </Flex>
  );
}
export default Welcome;
