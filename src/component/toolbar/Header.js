import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import firebase from '../dataBase/Firebase';
import '../../App.css';


class Header extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('customer');
    this.state = {
      auth: true,
      anchorEl: null,
      top: false,
      left: false,
      bottom: false,
      right: false,
      openDialog : false,
      name:'',
      number:'',
      amount:'',
      interest:'',
      duration:'',
      time:''

    };


  }
   
  handleSave = (e) => {
        e.preventDefault();
    
        const { name, number, amount, interest, duration, time } = this.state;
    
        this.ref.add({
          name, 
          number, 
          amount, 
          interest, 
          duration, 
          time,
        }).then((docRef) => {
          this.setState({
            name:'',
            number:'',
            amount:'',
            interest:'',
            duration:'',
            time:'',
            openDialog:false
          });
          this.props.history.push("/")
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }
      handleChange = event => {
        this.setState({ auth: event.target.checked });
      };
    
      handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
      changeValue = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      }
      handleClose = () => {
        this.setState({ 
          anchorEl: null,
        openDialog:false
       });
      };
      
      toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };
      
    
     
    render() {
        const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const sideList = (
      <div className="list-class">
       <div className = "toggle-back">     
             <IconButton className="icon-class" color="inherit" onClick={this.toggleDrawer('left', true)} aria-label="Menu">
              <MenuIcon />
              <Typography variant="h6" color="inherit" className="header-class">
              My Manager
            </Typography>
            </IconButton>
           
       </div>
       <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
      return (
        <div className="header-main-class">
          <AppBar position="relative">
          <Toolbar>
            <IconButton className="icon-class" color="inherit" onClick={this.toggleDrawer('left', true)} aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className="header-class">
              My Manager
            </Typography>
            {auth && (
              <div className="user-icon-class">
                  <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
            </Toolbar>
            </AppBar>
            <div className = "add-class">
              <Link to ="/create">
            <Fab className= 'add-button'color='secondary' >
                <AddIcon />
             </Fab>
             </Link>
             </div>
             <div className="sidemenu-class">
      <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div tabIndex={0} role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
      <Dialog  open={this.state.openDialog} onClose={this.handleClose} >
          <DialogTitle id="max-width-dialog-title">Add New Record</DialogTitle>
          <DialogContent>
            <DialogContentText>
           
            </DialogContentText>
            <TextField  required  id="name" label="Full Name"  className = "name"   margin="normal" variant="outlined" onChange={this.changeValue('name')} />
            <TextField  required  id="number" label="Mobile Number"  className = "number"   margin="normal" variant="outlined"  type="number" onChange={this.changeValue('number')} />
            <TextField  required  id="amount" label="amount"  className = "amount"   margin="normal" variant="outlined" onChange={this.changeValue('amount')} />
            <TextField  required  id="interest" label="Rate of interest"  className = "interest"   margin="normal" variant="outlined" onChange={this.changeValue('interest')} />
            <TextField  required  id="duration" label="Duration"  className = "time"   margin="normal" variant="outlined" onChange={this.changeValue('time')} />
            </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSave} color="primary"> OK </Button>
            <Button onClick={this.handleClose} > Close </Button>
          </DialogActions>
        </Dialog>
        </div>
      );
    }
  }

export default Header;