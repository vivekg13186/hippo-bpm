import React, { useState ,useEffect} from "react";
import { Button, ConfigProvider, Flex, Dropdown, Space, Tabs, theme } from "antd";
import "./App.css";
import hippoDarkUrl from "./assets/hippo-dark.png";
import { MenuOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import Welcome from "./Welcome";
import AppExplorer from "./AppExplorer";
import ToolkitExplorer from "./ToolkitExplorer";
import ServiceRunner from "./ServiceRunner";
import ThemeButton from "./ThemeButton";
import InstanceViewer from "./InstanceViewer";
const App = () => {
  const [activeKey, setActiveKey] = useState("Welcome");
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#1e1e1e" : "#ffffff";
    document.body.style.color = darkMode ? "#f0f0f0" : "#000000";
  }, [darkMode]);
  const [items, setItems] = useState([
    {
      key: "Welcome",
      label: `Welcome`,
      children: <Welcome />,
      closable: false,
    },
  ]);
  
  const onEdit = (targetKey, action) => {
    if (action === "add") {

      const newKey = `NewTab${items.length + 1}`;
      const newItem = {
        key: newKey,
        label: `New Tab ${items.length + 1}`,
        children: <div>Content of {newKey}</div>,
      };
      setItems([...items, newItem]);
      setActiveKey(newKey);
    } else if (action === "remove") {
      let newActiveKey = activeKey;
      let lastIndex = -1;
      items.forEach((item, i) => {
        if (item.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const newItems = items.filter((item) => item.key !== targetKey);
      if (newItems.length && newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newItems[lastIndex].key;
        } else {
          newActiveKey = newItems[0].key;
        }
      }
      setItems(newItems);
      setActiveKey(newActiveKey);
    }
  };
  const onMenuClick = (e) => {
    //console.log("click", e);
    const key = e.key;
    switch (key) {
      case "1":
        {
          const newKey = "App Explorer"+Math.floor(Math.random()*1000);
          if (!items.find((item) => item.key === newKey)) {
            const newItem = {
              key: newKey,
              label: "App Explorer",
              children: <AppExplorer />,
            };
            setItems([...items, newItem]);
          }
          setActiveKey(newKey);
        }
        break;
        case "2":   
        {
          const newKey = "Toolkit Explorer"+Math.floor(Math.random()*1000);
          if (!items.find((item) => item.key === newKey)) {
            const newItem = {
              key: newKey,
              label:  "Toolkit Explorer",
              children: <ToolkitExplorer />,
            };
            setItems([...items, newItem]);
          }
          setActiveKey(newKey);
        }
        break;
      case "3":
        {
          const newKey = "Run Service";
          if (!items.find((item) => item.key === newKey)) {
            const newItem = {
              key: newKey,
              label: newKey,
              children: <ServiceRunner />,
            };
            setItems([...items, newItem]);
          }
          setActiveKey(newKey);
        }
        break;
      case "4":
        {
          const newKey = "Instance Viewer"+Math.floor(Math.random()*1000);
          if (!items.find((item) => item.key === newKey)) {
            const newItem = {
              key: newKey,
              label:  "Instance Viewer",
              children: <InstanceViewer/>,
            };
            setItems([...items, newItem]);
          }
          setActiveKey(newKey);
        }
        break;
      default:
        break;
    }
  };
  const mainMenu = [
    {
      key: "1",
      label: "App Explorer",
    },
    {
      key: "2",
      label: "Toolkit Explorer",
    },
    {
      key: "3",
      label: "Run Service",
    }, {
      key: "4",
      label: "Instance Viewer",
    },
  ];
  return (
    <ConfigProvider theme={{
         algorithm: darkMode ? [theme.darkAlgorithm,theme.compactAlgorithm] :[theme.compactAlgorithm]
    }}>
      <div   className={darkMode ? "app dark-mode" : "app light-mode"}>
        <Flex horizontal="true" align="center" gap={10}>
          <div>
            <img src={hippoDarkUrl} width={45} height={45}></img>
          </div>

          <Space.Compact>
            <Dropdown
              menu={{ items: mainMenu, onClick: onMenuClick }}
              placement="bottomRight"
            >
              <Button icon={<MenuOutlined />} />
            </Dropdown>
          </Space.Compact>
          <ThemeButton darkMode={darkMode} setDarkMode={setDarkMode}/>
        </Flex>
        <div style={{padding:"10px"}}>
          <Tabs
            hideAdd
            type="editable-card"
            size="small"
            activeKey={activeKey}
            onChange={setActiveKey}
            onEdit={onEdit}
            items={items}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};
export default App;
