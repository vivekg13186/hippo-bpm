import { useState } from "react";
import { Button, Form, Input, Radio ,Collapse} from "antd";
import { GetUrl } from "../wailsjs/go/main/App.js";
import InstanceView from "./InstanceView.jsx";


function InstanceViewer() {
  const [authDomain, setAuthDomain] = useState("ZenApiKey");
  const [result, setResult] = useState({});
  const onDomainChange = (e) => {
    setAuthDomain(e.target.value);
  };
  const onFinishFailed = (errorInfo) => {
    //console.log("Failed:", errorInfo);
  };
  const onFinish = async (values) => {
    try {
      const url = values.url + `/rest/bpm/wle/v1/process/${values.instanceid}`;
      //console.log("Request URL:", url);
      const res = await GetUrl(
        url,
        values.username,
        authDomain === "Basic" ? values.password : values.zenapiKey,
        authDomain
      );
      //console.log("Success:", res);
      setResult(JSON.parse(res));
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
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
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
                  {
                    required: authDomain === "ZenApiKey",
                    message: "Zen API key",
                  },
                ]}
              >
                <Input.Password disabled={authDomain === "Basic"} />
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
        
      <br/>
      <InstanceView data={result} />
    </div>
  );
}

export default InstanceViewer;
