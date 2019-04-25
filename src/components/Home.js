import React from 'react';
import ReactDOM from 'react-dom';

export default class Home extends React.Component {
      render(){
        var content="";
        if(true){
          content = <p>hi how r you</p>;
        }

        return(
            <div>
                <p>New component</p>
                {content}
            </div>
        );
      }
}
