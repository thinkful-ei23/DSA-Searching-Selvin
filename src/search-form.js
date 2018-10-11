import React from 'react';
export default class SearchForm extends React.Component {

  indexOf(array, value) {
    for (let i=0; i<array.length; i++) {
      if (array[i] === value) {
          return i;       
      }
    }
    return -1;
  };

  binarySearch(array, value, start, end, binCount) {
    console.log('binarySearch is running! binCount: ', binCount);
    start  = undefined ? 0 : start;
    binCount++;
    console.log('*** binCount: ',  binCount);     
    if (start > end) {
      return [-1, binCount];
    }

    const index = Math.floor((start + end) / 2);

    const item = array[index];

    if (item === value){
      console.log('Found it! index, binCount: ', index, binCount); 
      let response=[index, binCount];      
      return (response);
    }
    else if (item < value) {
      return this.binarySearch(array, value, index + 1, end, binCount);
    }
    else if (item > value) {
      return this.binarySearch(array, value, start, index -1, binCount);
    }
  };

  searchLinear()  {
    let searchTerm=document.getElementById('searchTerm').value; 
    console.log('searchLinear: ', searchTerm);
    if(!searchTerm) {
      console.log('no search term');
    } else {
      //console.log('this: ', this, ' \nsearch term: ', linSearch);  
      let result = this.indexOf(this.props.searchList, searchTerm);
      if (result === -1) {
        this.props.setResponseMsg('Search came up empty-handed!')
        this.props.setResponseCount(this.props.searchList.length-1);
        this.props.setResponseIndex(null);
        return console.log((result));
      } else {
        this.props.setResponseMsg('The search was a success!');
        this.props.setResponseCount(result);
        this.props.setResponseIndex(result);
        return console.log((result));      }
    }
  }
  searchBinary()  {
    let searchTerm=document.getElementById('searchTerm').value;  
    console.log('searchBinary', searchTerm);
    if(!searchTerm) {
      console.log('no search term');
    } else {
      console.log('search term: ', searchTerm);
      let binArr = JSON.parse(JSON.stringify(this.props.searchList));
      let result = this.binarySearch(binArr.sort(), searchTerm,0,binArr.sort().length-1, 0);
      if (result[0] === -1) {
        this.props.setResponseMsg('Search came up empty-handed!')
        this.props.setResponseCount(result[1]);
        return (result);
      } else {
        console.log('result is ', result[0], result[1]);

        this.props.setResponseMsg('The search was a success!');
        this.props.setResponseIndex(result[0]);
        this.props.setResponseCount(result[1]);
        this.props.setResponseMsg('The search was a success!');
        return  console.log((result[1]));
      }     
    }
  }
  render() {
    let responseText;
    if (this.props.responseMsg !== '') {
      responseText = (
        
        <div><h1>ReactJS Sort Component</h1><input className="searchTerm" id="searchTerm" placeholder="Pick a number netween 1 and 100.." />
          <button className="linearSearch" id="linear" name="linear" onClick={() =>  this.searchLinear()}>linear</button>
          <button className="binarySearch" id="binary" name="binary"  onClick={() => this.searchBinary()}>binary</button> 
          <p className="responseMessage">{this.props.responseMsg}</p>
          <p className="responseCount">Number of search operations: {this.props.responseCount+1} searches</p>
          <p className="responseIndex">Index # {this.props.responseIndex === null ? 'Searched all items' : this.props.responseIndex}</p>
        </div>
      );
    } else {
      responseText = (
        <div><h1>ReactJS Search Thingy</h1>
          <input className="searchTerm" id="searchTerm" placeholder="Pick a number from 1 to 100" />
          <button className="linearSearch" id="linear" name="linear" onClick={() =>  this.searchLinear()}>linear</button>
          <button className="binarySearch" id="binary" name="binary"  onClick={() => this.searchBinary()}>binary</button> 
        </div>
      );
    };
   return (
      <div>
        {responseText}
      </div>     
    )
  }
}
