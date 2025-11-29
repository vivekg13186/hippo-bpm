import { Descriptions, Empty, Form, Input,Divider, Table, Tree } from "antd";
 

function dataToDescriptionItems(data) {
  const items = [];
  items.push({
    key: "1",
    label: "CreationTime",
    children: data.creationTime,
  });
  items.push({
    key: "2",
    label: "ExecutionState",
    children: data.executionState,
  });
  items.push({
    key: "3",
    label: "State",
    children: data.state,
  });

  items.push({
    key: "4",
    label: "Last Modification Time",
    children: data.lastModificationTime,
  });

  items.push({
    key: "5",
    label: "Name",
    children: data.name,
  });
  items.push({
    key: "6",
    label: "Instance ID",
    children: data.piid,
  });
  items.push({
    key: "6",
    label: "Process AppName",
    children: data.processAppName,
  });
  items.push({
    key: "6",
    label: "Process AppAcronym",
    children: data.processAppAcronym,
  });
  items.push({
    key: "6",
    label: "Process AppID",
    children: data.processAppID,
  });
  items.push({
    key: "6",
    label: "SnapshotID",
    children: data.snapshotID,
  });
  items.push({
    key: "6",
    label: "BranchID",
    children: data.branchID,
  });
  items.push({
    key: "6",
    label: "Branch Name",
    children: data.branchName,
  });

  items.push({
    key: "6",
    label: "Instance Error",
    children: data.instanceError,
  });
  items.push({
    key: "6",
    label: "Predicted DueDate",
    children: data.predictedDueDate,
  });

  return items;
}
function InstanceViewer({ data }) {
  const columns = [
    {
      title: "Task Name",
      dataIndex: "displayName",
      key: "displayName",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Last Modification",
      dataIndex: "lastModificationTime",
      key: "lastModificationTime",
    },
    {
      title: "Completion Time",
      dataIndex: "completionTime",
      key: "completionTime",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedToDisplayName",
      key: "assignedToDisplayName",
    },
    {
      title: "Closed By",
      dataIndex: "closeByUserFullName",
      key: "closeByUserFullName",
    },
  ];
  if (data && data.status === "200") {
    return (
      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Descriptions items={dataToDescriptionItems(data.data)} bordered />
       <Divider titlePlacement="start">Task List</Divider>
        <Table columns={columns} dataSource={data.data.tasks}></Table>
        <Divider titlePlacement="start">Execution Tree</Divider>
         <Tree treeData={[data.data.executionTree.root]}  fieldNames={{"title" : "name" , "key" : "nodeId"}}></Tree>
      
      </div>
    );
  } else {
    return <Empty description="No Instance Data" />;
  }
}

export default InstanceViewer;
