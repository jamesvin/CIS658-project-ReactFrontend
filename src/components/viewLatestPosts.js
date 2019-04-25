import React from 'react';
// import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import axios from 'axios';
// import SinglePost from './article'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Posts from './posts'


const API_BASE = 'http://localhost:4000/';
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
 onDelete={props.onDelete}
 onEdit={props.onEdit}
 />
 )
 });
 return (
 <div className="post-list">
 <table className="table table-hover">
 <thead>
 <tr>
 <th className="col-md-3">Top Headlines</th>
 </tr>
 </thead>
 <tbody>
 {postItems}
 </tbody>
 </table>
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
export default class ViewLatestPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      formMode: "new",
      post: {title:"", article:"", likes:"", id: "9999999", comments: [{id:"", commenter:"", body:""}]}
    };
    this.loadPosts = this.loadPosts.bind(this);
    this.updatePost = this.updatePost.bind(this);
  }
  render() {
 return ( <
  div className = "posts" >
  <
 PostList posts = {
   this.state.posts
 }
 onEdit = {
   (mode, post) => this.updateForm(mode, post)
 }
 />
 <Posts />
 <
  /div>
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
   this.setState({
     post: Object.assign({}, postVals),
     formMode: mode,
      });
 }
 clearForm(){
      console.log("clear form");
      this.updateForm("new",{title:"",article:"",likes:"", id: "99999999"});
  }

    formSubmitted(post) {
          this.updatePost(post);
        this.clearForm();
   }
}
