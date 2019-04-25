import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Header from './components/Header';
import MyCarousel from './components/MyCarousel';
//import SideBar from './components/SideBar'
import Home from './components/Home';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Posts from './components/posts';
import LiveScores from './components/LiveScores';
//import aboutme from './aboutme';
import PostForm from './components/posts';
import { Container, Row, Col } from "reactstrap";
import { Player } from 'video-react';

ReactDOM.render(<div>
					<header className="header">
						<Header/>
					</header>
					<main>
						<Container>
							<Row>
								<Col xs="12" sm="12" md="12" lg="12">
									<MyCarousel/>
								</Col>
							</Row>
							<Row>
								<Col xs="12" sm="12" md="6" lg="6">
									<LiveScores />
								</Col>
								<Col xs="12" sm="12" md="6" lg="6">
									<div className="livescoreDiv">
										<h4 className="livescoreDivHeading"> <u> Highlights of the week </u> </h4>
										<br/>
										<Player>
											<source src="videoplayback.mp4" />
										</Player>
									</div>
								</Col>
							</Row>
							<Row>
								<Col xs="12" sm="12" md="12" lg="12">
									<Posts />
								</Col>
							</Row>
						</Container>
					</main>
					<footer className="container-fluid text-center" >
						<p> Soccer Mania website by Vineet James. Please check more info about me and developer page
							<a href="aboutme.html"> here</a></p>
					</footer>
				</div>
                , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
