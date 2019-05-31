import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import firebase from './../dataBase/Firebase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Visibility from '@material-ui/icons/Visibility';
import Grid from '@material-ui/core/Grid'


 class CardGrid extends Component {
  
  constructor(props){
    super(props);
    this.cardRef = firebase.firestore().collection('customer');
    this.unsubscribe = null;
    this.state = {
      anchorEl: null,
      cardData: []
    };
    
  }

  onCardUpdate = (querySnapshot) => {
    const cardData = [];
    querySnapshot.forEach((doc) => {
      const { name, number, amount, interest, duration, time } =  doc.data();
      cardData.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        number,
        amount,
        interest,
        duration,
        time,
      });
    });
    this.setState({
      cardData
   });
  }
  componentDidMount() {
    this.unsubscribe = this.cardRef.onSnapshot(this.onCardUpdate);
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };


  render() {
    return (
      <div className = "card-grid-class">
         <Grid container spacing={24} style={{padding: 23}}>
           {this.state.cardData.map(data =>
           <Grid item xs={12} sm={3} lg={4} xl={6}>
                   <Card className="card">
                   <CardHeader
                     avatar={ <Avatar aria-label="Recipe" className="name-class"> N </Avatar> }
                     action={ <IconButton> <MoreVertIcon  onClick={this.handleMenu}/> </IconButton>}
                     title={data.name}  subheader={data.number} />
                   <CardContent>
                     <Typography component="p">
                       This impressive paella is a perfect party dish and a fun meal to cook together with your
                       guests. Add 1 cup of frozen peas along with the mussels, if you like.
                     </Typography>
                   </CardContent>
                   <CardActions className="card-action-class" disableActionSpacing>
                     <IconButton aria-label="Add to favorites"> <FavoriteIcon /> </IconButton>
                     <IconButton aria-label="Share"> <ShareIcon /> </IconButton>
                   </CardActions>
                   <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={this.state.anchorEl}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}><IconButton aria-label="edit"> <Edit /> </IconButton>Edit</MenuItem>
                  <MenuItem onClick={this.handleClose}> <IconButton aria-label="view"><Visibility /> </IconButton>View</MenuItem>
                  <MenuItem onClick={this.itemSelect}> <IconButton aria-label="delete"> <Delete /> </IconButton>Delete</MenuItem>
                </Menu>
                 </Card>
                 </Grid>
                )}
                  </Grid>
      </div>
    )
  }
}

export default CardGrid;
