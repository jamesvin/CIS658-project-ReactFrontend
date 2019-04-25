import React from 'react';
// import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import axios from 'axios';
// import SinglePost from './article'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem } from 'reactstrap';

const API_BASE = 'https://soccer-backend.herokuapp.com';
//ReactDOM.render( <h1>hey</h1> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

const PostList = (props) => {
	const postItems = props.posts.map((post) => {
		return (
			 <PostListItem
			 title={post.title}
			 article={post.article}
			 likes={post.likes}
			 id={post.id}
			 key={post.id}
			 comments={post.comments}
			 onDelete={props.onDelete}
			 onEdit={props.onEdit}
			 />
		)
	});

	return (
		<div className="postsDisplayDiv">
			<h4 className="livescoreDivHeading"> <u> Top Headlines</u> </h4>
			<div className="postsListDiv">
				{postItems}
			</div>
		</div>
	);
}

const PostListItem = (props) => {
	return (
		<ul>
			<li onClick={event => props.onEdit("edit",props)}><a>{props.title}</a></li>
		</ul>
	);
}

export default class Posts extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			formMode: "new",
			post: {title:"", article:"", likes:"", id: "9999999", comments: []}
		};
		this.loadPosts = this.loadPosts.bind(this);
		this.updatePost = this.updatePost.bind(this);
	}

	render() {
		const postsSize = this.state.posts.length;
		return (
			<div className = "posts" >
				<PostList posts = {this.state.posts} onEdit = {(mode, post) => this.updateForm(mode, post)} />

				<div>
					<PostForm onSubmit = {(post) => this.formSubmitted(post)}
						  onCancel = {(mode, post) => this.updateForm(mode, post)  }
						  formMode = {this.state.formMode}
						  post = {this.state.post}
						  key = {this.state.post.id} />
				</div>
			</div>
		);
	}

	componentDidMount() {
		console.log('Posts mounted!')
		this.loadPosts();
	}

	loadPosts() {
		axios
		.get(`${API_BASE}/posts.json`)
		.then(res => {
            this.setState({ posts: res.data });
            console.log(`Data loaded! = ${this.state.posts}`)
        })
		.catch(err => console.log(err));
	}

	updatePost(post) {
		axios
        .put(`${API_BASE}/posts/${post.id}.json`, post)
        .then(res => {
              this.loadPosts();
        })
        .catch(err => console.log(err));
	}

	updateForm(mode, postVals) {
		this.setState({post: Object.assign({}, postVals), formMode: mode});
	}
	clearForm(){
		console.log("clear form");
		this.updateForm("new",{title:"",article:"",likes:"", id: "99999999", comments:[]});
	}

    formSubmitted(post) {
         this.updatePost(post);
        this.clearForm();
   }
}
//export default Users;
//const UserForm = (props) => {
//  return ( <div className = "user-form" > Our User Form Goes Here. </div>
//  );
//}
class PostForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: props.post.title,
			article: props.post.article,
			likes: props.post.likes,
			id: props.post.id,
			comments: props.post.comments
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.postNewComment = this.postNewComment.bind(this);
		document.getElementsByClassName('postFormDiv').display = 'block';
	}

	renderAddComents() {
		return(
			<div className="form-group">
				<p><b> Add your comment</b></p>
				<Form>
					<FormGroup>
						<Label for="postComment">Comment</Label>
						<Input type="textarea" name="postComment" id="postComment" placeholder="Enter your comments here..." />
					</FormGroup>
					<FormGroup>
						<Label for="postName">Commenter Name</Label>
						<Input type="text" name="postName" id="postName" placeholder="Enter your name here..."/>
					</FormGroup>
					<FormGroup>
						<Button type="submit" className="btn btn-primary" onClick={this.handleSubmit}> Submit </Button> &nbsp;&nbsp;&nbsp;&nbsp;
						<Button type="button" className="btn btn-danger" onClick={this.handleCancel}> Cancel </Button>
					</FormGroup>
				</Form>
			</div>
		);
	}

	render() {
		const comments = this.state.comments;
		return (
			<div className="postFormDiv" id="post">
				{/*<h1> Posts </h1>*/}
				<h5><b><u>{this.state.title}</u></b></h5>
				<p>{this.state.article}</p>
				<br/>
				{/*<p><b>Likes</b> : {this.state.likes}</p>
				<br/>*/}
				<div>
					<b>Comments</b>
					<ListGroup flush>
						{this.state.comments.map((dynamicComponent, i) => <PostComments
							key = {i} componentData = {dynamicComponent}/>)}
					</ListGroup>
				</div>
				{this.renderAddComents()}
			</div>
		);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	handleSubmit(event)
	{
		var newComment = {
			"id": 0 ,
			"commenter": document.getElementById('postName').value,
			"body": document.getElementById('postComment').value,
			"post_id": this.state.id,
			"created_at": "",
			"updated_at": ""
		}
		this.state.comments.push(newComment);
		this.postNewComment(newComment);
		this.props.onSubmit({
			title: this.state.title,
			article: this.state.article,
			likes: this.state.likes,
			id: this.state.id,
			comments: this.state.comments
		});
		event.preventDefault();
	}
	handleCancel(event)
	{
		this.props.onCancel("new", {title:"", article:"", likes:"", comments:[]});
		event.preventDefault();
	}

	postNewComment(post) {
		axios
        .post(`${API_BASE}/posts/${post.post_id}/comments.json`, post)
        .then(res => {
              this.loadPosts();
        })
        .catch(err => console.log(err));
	}
}

class PostComments extends React.Component{
	 render() {
		return (
			<ListGroupItem>
				<div>Commenter: {this.props.componentData.commenter} </div>
				<div>Comment: {this.props.componentData.body} </div>
			</ListGroupItem>
        );
     }
}
