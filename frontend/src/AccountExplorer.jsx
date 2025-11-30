import { Button, Flex, Table, Form, Input, Radio } from "antd";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import {
  CreateAccount,
  DeleteAccount,
  GetAllAccounts
} from "../wailsjs/go/services/AccountService";
function AccountExplorer() {
  const [accounts, setAccounts] = useState([]);
  const [authDomain, setAuthDomain] = useState("ZenApiKey");
  const onDomainChange = (e) => {
    setAuthDomain(e.target.value);
  };
  useEffect(() => {
    GetAllAccounts().then((acc) => {
      setAccounts(acc || []);
    });
  }, []);

  const deleteAccount = async (record) => {
    await DeleteAccount(record.id);
    await syncAccounts();
  };

  const syncAccounts = async ()=>{
     await GetAllAccounts().then((acc) => {
      setAccounts(acc || []);
    });
  }

  const columns = [
    { title: "Title", dataIndex: "title", key: "id" },
    { title: "URL", dataIndex: "url", key: "url" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Password", dataIndex: "password", key: "password" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => deleteAccount(record)}>
          Delete
        </Button>
      ),
    },
  ];
  const onFinish =async (value) => {
    await CreateAccount(value);
    await syncAccounts();
  };
  const onFinishFailed = () => {};
  return (
    <Flex style={{ padding: "20px" }} gap={10} vertical>
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
        <Form.Item
          label="Title"
          name="title"
          type="title"
          rules={[{ required: true, message: "Title" }]}
        >
          <Input />
        </Form.Item>
         <Form.Item
          label="Url"
          name="url"
          type="url"
          rules={[{ required: true, message: "BPM url" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
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
          rules={[
            {
              required: authDomain === "Basic",
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password disabled={authDomain === "ZenApiKey"} />
        </Form.Item>
        <Form.Item
          label="ZenApi Key"
          name="zenapiKey"
          rules={[
            { required: authDomain === "ZenApiKey", message: "Zen API key" },
          ]}
        >
          <Input.Password disabled={authDomain === "Basic"} />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" icon={<UserOutlined/>}>
            Save Account
          </Button>
        </Form.Item>
        <Table columns={columns} dataSource={accounts} rowKey="id"></Table>
      </Form>
    </Flex>
  );
}

export default AccountExplorer;
