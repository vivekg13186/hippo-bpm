import { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import { PostWithQuery } from "../wailsjs/go/main/App.js";
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
  const onDomainChange = (e) => {
    setAuthDomain(e.target.value);
  };
  const onFinishFailed = (errorInfo) => {
    //console.log("Failed:", errorInfo);
  };
  const onFinish = async (values) => {
    try {
      const url = buildUrl(values.url, `/rest/bpm/wle/v1/service/${values.appname}@${values.servicename}`, {
          action: "start",
          params: values.inputdata,
          createTask: "false",
          parts: "all",
        });
      //console.log("Request URL:", url);
      const res = await PostWithQuery( url,
        values.username,
         authDomain === "Basic" ? values.password : values.zenapiKey,
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
