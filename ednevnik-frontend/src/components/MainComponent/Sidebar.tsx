import {
  CalendarTodayTwoTone,
  FolderCopyTwoTone,
  MessageTwoTone,
  PeopleAltOutlined,
  PeopleAltTwoTone,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthenticationContext";
import { Link } from "react-router-dom";
import ISidebarAction from "../../models/ISidebarAction";
import { RoleEnum } from "../../enums/RoleEnum";
import { useProfessorContext } from "../../contexts/ProfessorContext";

const adminActions: ISidebarAction[] = [
  { title: "Korisnici", icon: <PeopleAltTwoTone />, path: "/showAllUsers" },
  { title: "Odjeljenja", icon: <FolderCopyTwoTone />, path: "/classes" },
];

const professorActions: ISidebarAction[] = [
  {
    title: "Odjeljenja",
    icon: <FolderCopyTwoTone />,
    path: "/showProfessorsClasses",
  },
  { title: "Moje odjeljenje", icon: <PeopleAltOutlined />, path: "/myClass" },
  {
    title: "Školski kalendar",
    icon: <CalendarTodayTwoTone />,
    path: "/calendar",
  },
  { title: "Inbox", icon: <MessageTwoTone />, path: "" },
];
const parentActions: ISidebarAction[] = [
  { title: "Učenici", icon: <PeopleAltOutlined />, path: "" },
  { title: "Inbox", icon: <MessageTwoTone />, path: "" },
];
const staffActions: ISidebarAction[] = [
  { title: "Odjeljenja", icon: <FolderCopyTwoTone />, path: "/classes" },
];

const Sidebar = () => {
  const [sidebarActions, setSidebarActions] = useState(staffActions);
  const context = useAuth();
  const professorContext = useProfessorContext();
  React.useEffect(() => {
    if (context?.getRole() === RoleEnum.ADMIN.toString()) {
      setSidebarActions(adminActions);
    } else if (context?.getRole() === RoleEnum.PROFESSOR.toString()) {
      professorContext?.setProfId(context?.getUserId());
      setSidebarActions(professorActions);
    } else if (context?.getRole() === RoleEnum.PARENT.toString()) {
      setSidebarActions(parentActions);
    } else if (context?.getRole() === RoleEnum.STAFF.toString()) {
      setSidebarActions(staffActions);
    } else setSidebarActions([]);
  }, []);
  return (
    <div>
      <Drawer
        variant="permanent"
        sx={{
          width: 170,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 170,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {sidebarActions.map((action: any) => (
              <ListItem key={action.title} disablePadding>
                <ListItemButton component={Link} to={action.path}>
                  <ListItemIcon>{action.icon}</ListItemIcon>
                  <ListItemText primary={action.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Sidebar;
