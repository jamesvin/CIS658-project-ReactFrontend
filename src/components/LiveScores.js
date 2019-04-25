import React from 'react';
// import './index.css';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import axios from 'axios';
// import SinglePost from './article'
import { ListGroup, ListGroupItem, Media } from 'reactstrap';
import "video-react/dist/video-react.css";



export default class Livescores extends React.Component {
  	constructor() {
  		super();
  		this.state = {
  			data: [],
  			livescoreData: []
  		}
  		this.loadTeams = this.loadTeamsMethod.bind(this);
  		this.timer = setTimeout(() => this.loadTeams(), 6000);
  	};
  	componentDidMount() {
  		console.log('Component DID MOUNT!');
  		this.loadTeams();
  	}

  	loadTeamsMethod() {
  		axios
  			.get(`https://livescore-api.com/api-client/scores/live.json?key=rdmkXcBLeptogxPR&secret=3q4uyZibHg8OCTH473p5f0QuqkSGRIyV`,{headers: {'Access-Control-Allow-Origin': '*'}})
  			.then(res => {
  					this.setState({ livescoreData: res.data.data.match });
  				})
  			.catch(err => console.log(err));
  	}
  	render() {
  		return (
  			<div className="livescoreDiv">
				<h4 className="livescoreDivHeading"> <u> Key Games </u> </h4>
				<div className="scroll">
					<ListGroup>
						<ListGroupItem>
							{this.state.livescoreData.map((dynamicComponent, i) => <Content
							key = {i} componentData = {dynamicComponent}/>)}
						</ListGroupItem>
					</ListGroup>
				</div>
  			</div>
  		);
  	}
  }
  class Content extends React.Component {
     render() {
  	  const gamestatus = this.props.componentData.status;
        return (
			<div >
				<div className="livescoreLeagueInfo">
					<u>League: {this.props.componentData.league_name} </u> <span className="livescoreStatus" > {this.props.componentData.status} </span>
				</div>
				<div className="livescoreTeamInfo">
					{this.props.componentData.home_name} &nbsp; &nbsp; &nbsp; <span className="livescoreScoreInfo"> {this.props.componentData.score} </span>
					&nbsp; &nbsp; &nbsp; {this.props.componentData.away_name}
				</div>
			</div>
        );
     }
  }
