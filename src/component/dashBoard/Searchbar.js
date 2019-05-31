import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';



function Searchbar() {
   
    return (
      <Paper className="paper-class">
        <IconButton className="Icon-class" aria-label="Search">
          <SearchIcon />
        </IconButton>
        <InputBase className="input-class" fullWidth placeholder="Search with name or mobile number"/>
      </Paper>
    );
  }
  
  export default Searchbar;