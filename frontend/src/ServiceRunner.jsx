import { useState,useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { PostWithQuery } from "../wailsjs/go/main/App.js";
import { GetAllAccounts } from "../wailsjs/go/services/AccountService.js";


const { TextArea } = Input;
function buildUrl(baseUrl, path, params = {}) {
  const url = new URL(baseUrl);
  url.pathname = url.pathname+path;

  Object.keys(params).forEach((key) => {
    url.searchParams.set(key, params[key]);
  });

  return url.toString();
}

function formatJsonString(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    return JSON.stringify(jsonObj, null, 2);
  } catch (e) {
    return jsonString;
  }
}
function ServiceRunner() {
  const [authDomain, setAuthDomain] = useState("ZenApiKey");
  const [result, setResult] = useState("");
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    GetAllAccounts().then((accs) => {
      setAccounts(accs);
    });
  }, []);


  const onDomainChange = (e) => {
    setAuthDomain(e.target.value);
  };
  const onFinishFailed = (errorInfo) => {
    //console.log("Failed:", errorInfo);
  };
  const onFinish = async (values) => {
    try {
         const a = accounts.find((a) => a.id == values.account.value);

      const url = buildUrl(a.url, `/rest/bpm/wle/v1/service/${values.appname}@${values.servicename}`, {
          action: "start",
          params: values.inputdata,
          createTask: "false",
          parts: "all",
        });
      //console.log("Request URL:", url);
      const res = await PostWithQuery( url,
        a.username,
         authDomain === "Basic" ? a.password : a.zenApiKey,
        authDomain
      );
      //console.log("Success:", res);
      setResult(formatJsonString(res));
    } catch (err) {
      //console.log("Error:", err);
      setResult("Error: " + err.message);
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
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="horizontal"
      >
        <div style={{ width: "90%" }}>
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
            label="App Name"
            name="appname"
            rules={[{ required: true, message: "App short name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Service Name"
            name="servicename"
            rules={[{ required: true, message: "Name of service" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Input Data (JSON)"
            name="inputdata"
            rules={[{ required: true, message: "Input JSON" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Output Data (JSON)">
            <TextArea rows={4} value={result} />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Execute Service
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default ServiceRunner;
