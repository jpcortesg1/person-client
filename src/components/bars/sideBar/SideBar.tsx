import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { AiOutlineRight, AiOutlineClose } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import "./styles.css";
import { useNavigate } from "react-router-dom";

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer() {
  const [state, setState] = useState({
    left: false,
  });

  const navigate = useNavigate();

  const items = [
    {
      text: "All Persons",
      icon: <FiUsers />,
      link: "/",
    },
    {
      text: "Create Person",
      icon: <IoIosAdd />,
      link: "/create-person",
    },
    {
      text: "Sign Off",
      icon: <BiLogOut />,
      link: "/logOut",
    },
  ];

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const navigation = (link: string) => {
    navigate(link);
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="person__containerIconClose">
        <AiOutlineClose
          className="person__iconClose"
          onClick={toggleDrawer("left", false)}
        />
      </div>
      <h1 className="person__title">Persons</h1>
      <List className="person__list">
        {items.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => navigation(item.link)}
          >
            <ListItemButton>
              <ListItemIcon className="person__iconItem">
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("left", true)}>
        <span className="person__icon">
          <AiOutlineRight />
        </span>
      </Button>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
