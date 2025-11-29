import { useState } from "react";
import { Button, Tree, Form, Input, Radio, Table, Space } from "antd";
import { GetUrl } from "../wailsjs/go/main/App";
function AppExplorer() {
  const [snapshots, setSnaphots] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const onFinish = async (values) => {
   try {
      const password = values.domain === "Basic" ? values.password : values.zenapiKey;
       const result = await GetUrl(values.url+"/rest/bpm/wle/v1/processApps", values.username, password, values.domain);
      var json = JSON.parse(result);
      setTreeData(json.data.processAppsList);
    } catch (error) {
      //console.error("Error fetching URL:", error);
    }
  };
  const [search, setSearch] = useState("");
  const filteredData = treeData.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.shortName.toLowerCase().includes(search.toLowerCase())
    );
  });

  const [authDomain, setAuthDomain] = useState("ZenApiKey");
  const onDomainChange = e => {
    setAuthDomain(e.target.value);
  };
  const onFinishFailed = (errorInfo) => {
    //console.log("Failed:", errorInfo);
  };
  const onSelect = (selectedKeys, info) => {
    //console.log("selected", selectedKeys, info);
  };
  const setRecord = (record) => () => {
    //console.log("record", record);
    setSnaphots(record.installedSnapshots || []);
  };

  const sortBySnapshotCount = (a, b) => {
    const aCount = a.installedSnapshots ? a.installedSnapshots.length : 0;
    const bCount = b.installedSnapshots ? b.installedSnapshots.length : 0;
    return bCount - aCount;
  };
  const columns = [
    {
      title: "Name",
      key: "name",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <Button type="link" onClick={setRecord(record)}>
          {record.name}({record.shortName}){" "}
        </Button>
      ),
    },

    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },

    {
      title: "Snapshot Count",
      key: "installedSnapshots",
      sorter: sortBySnapshotCount,
      render: (_, record) => (
        <Space>
          {record.installedSnapshots ? record.installedSnapshots.length : 0}
        </Space>
      ),
    },
    {
      title: "Branch",
      key: "branchName",
      render: (_, record) => <span>{record.branchName || "main"}</span>,
    },
  ];
  const snapshotTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
    },
    {
      title: "Branch",
      dataIndex: "branchName",
      key: "branchName",
    },
  ];

  return (
    <div style={{ padding: "10px", width: "100%" }}>
      <Form
      labelAlign="left"
      labelCol={{ span: 4 }}
    wrapperCol={{ span: 16 }}
        variant="filled"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="horizontal"
      >
        <div style={{ width: "90%" }}>
          <Form.Item
            label="Url"
            name="url"
            type="url"
            rules={[{ required: true, message: "BPM url" }]}
          >
            <Input   />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input  />
          </Form.Item>
          <Form.Item
            label="Auth Domain"
            name="domain"
            rules={[{ required: true, message: "Select a option" }]}
          >
            <Radio.Group value={authDomain} onChange={onDomainChange}>
              <Radio value="Basic">Basis Auth</Radio>
              <Radio value="ZenApiKey">Zen api key</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: (authDomain === "Basic"), message: "Please input your password!" }]}
          >
            <Input.Password disabled={authDomain === "ZenApiKey"} />
          </Form.Item>
          <Form.Item
            label="ZenApi Key"
            name="zenapiKey"
            rules={[{ required: (authDomain === "ZenApiKey"), message: "Zen API key" }]}
          >
            <Input.Password
              disabled={authDomain === "Basic"} 
            />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Get Apps
            </Button>
          </Form.Item>
          <h3>Applications</h3>
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 200, marginBottom: 16 }}
          />
          <Table dataSource={filteredData} columns={columns} />
          <h3>Snapshots</h3>
          <Table dataSource={snapshots} columns={snapshotTableColumns} />
        </div>
      </Form>
    </div>
  );
}
export default AppExplorer;
