import { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Select } from "antd";
import { GetUrl } from "../wailsjs/go/main/App.js";
import InstanceView from "./InstanceView.jsx";
import { GetAllAccounts } from "../wailsjs/go/services/AccountService.js";

function InstanceViewer() {
  const [authDomain, setAuthDomain] = useState("ZenApiKey");
  const [result, setResult] = useState({});
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    GetAllAccounts().then((accs) => {
      setAccounts(accs);
    });
  }, []);

 

  const onFinish = async (values) => {
    try {
      const a = accounts.find((a) => a.id == values.account.value);

      const url = `${a.url}/rest/bpm/wle/v1/process/${values.instanceid}`;
      const res = await GetUrl(
        url,
        a.username,
        authDomain === "Basic" ? a.password : a.zenApiKey,
        authDomain
      );

      setResult(JSON.parse(res));
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "10px", width: "100%" }}>
      <Form
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        variant="filled"
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="horizontal"
      >
        <Form.Item name="account" label="Account">
          <Select
            placeholder="Select an account"
            options={accounts.map((acc) => ({
              label: acc.title,
              value: acc.id,
            }))}
            showSearch
            optionFilterProp="label"
            labelInValue // ← important to get object instead of just value
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Instance ID"
          name="instanceid"
          rules={[{ required: true, message: "Instance ID" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Execute Service
          </Button>
        </Form.Item>
      </Form>

      <br />
      <InstanceView data={result} />
    </div>
  );
}

export default InstanceViewer;
