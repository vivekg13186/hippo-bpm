import { Button } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

function ThemeButton({ darkMode, setDarkMode }) {
  return (
    <Button
      icon={darkMode ? <SunOutlined /> : <MoonOutlined />}
      onClick={() => setDarkMode(!darkMode)}
    />
  );
}

export default ThemeButton;
