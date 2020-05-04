import React from 'react';
import clsx from 'clsx';
import { withStyles, Divider, Drawer, ListItem, List, Hidden, ListItemIcon } from '@material-ui/core';
import { NavLink as Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip, Avatar } from 'antd';

const drawerWidth = 73;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex:0,
    whiteSpace: 'nowrap'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 9px',
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  hide: {
    display: 'none'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    background: 'linear-gradient(0deg, rgba(19,137,134,1) 1%, rgba(23,115,132,1) 40%, rgb(31, 67, 128) 78%)'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  }
});

export interface IDrawerProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
  classes: any;
  theme: any;
}

export interface IDrawerState {
  menuOpen: boolean;
  open: boolean;
  anchorEl: any;
  mobileMoreAnchorEl: any;
  mobileOpen: any;
}

class SideDrawer extends React.Component<IDrawerProps, IDrawerState> {
  state: IDrawerState = {
    menuOpen: false,
    open: false,
    anchorEl: null,
    mobileMoreAnchorEl: null,
    mobileOpen: false
  };
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div className="buttons">
        <div className={classes.toolbar} />
        <List>
          <ListItem button key={'home'} component={Link} to="/">
            <ListItemIcon>
              <div style={{ width: 20, height: 20, color: 'white', marginLeft: 8 }}>
                <Tooltip placement="right" title="Dashboard">
                  <FontAwesomeIcon icon="home" fixedWidth />
                </Tooltip>
              </div>
            </ListItemIcon>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={'admin'} component={Link} to="/admindashboard">
            <ListItemIcon>
              <div style={{ width: 20, height: 20, color: 'white', marginLeft: 8 }}>
                <Tooltip placement="right" title="Admin Dashboard">
                  <FontAwesomeIcon icon="user-cog" fixedWidth />
                </Tooltip>
              </div>
            </ListItemIcon>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={'Blood Group'} component={Link} to="/logout">
            <ListItemIcon>
              <div style={{ width: 20, height: 20, color: 'white', marginLeft: 8 }}>
                <Tooltip placement="right" title="Logout">
                  <FontAwesomeIcon icon="power-off" fixedWidth />
                </Tooltip>
              </div>
            </ListItemIcon>
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        {/* <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerToggle} className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar> */}
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              variant="permanent"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open
                })
              }}
              variant="permanent"
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

export default withStyles(styles as any, { withTheme: true })(SideDrawer);
