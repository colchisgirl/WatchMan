import React, { Component } from 'react'

import { Button, Form, Comment, Header, CommentContent } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import CommentComponent from './CommentComponent'

export default class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: this.props.event?.comments || [],
            replyFormHidden: true,
            reply_to_id: '',
            text: ''
        }
    }

    // componentDidMount = () => {

    //     fetch(`/api/comments/${this.props.landmark}/${this.props.event}`, {
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         }
    //     }).then(response => {
    //         if (response.status === 200) {
    //             response.json().then(data => {
    //                 this.setState({
    //                     comments: data
    //                 })
    //             })
    //         } else {
    //             if (response.status === 401) {
    //                 this.props.onFailedAuthentication();
    //             }
    //         }
    //     })
    // }

    handleClickReply = () => {
        this.setState({
            replyFormHidden: !this.state.replyFormHidden
        })
    }

    onCommentValueChange = (e) => {
        e.preventDefault()
        const comment = e.target.value

        this.setState({
            text: comment
        })
    }

    handleCommentSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/addComment', {
            method: 'POST',
            body: JSON.stringify({
                text: this.state.text,
                landmark_id: this.props.landmark,
                event_id: this.props.event,
                reply_to_id: this.state.reply_to_id

            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            }
        });

        const comments = await response.json();
        this.setState({
            comments: comments
        });

    }

    render() {
        const { comments } = this.state;

        return (
            <div className="ldetails__container__comments">
                <Comment.Group>
                    <Header as='h3' dividing>
                        Comments
                    </Header>
                    {comments.length ? (

                        comments.map((comment, i) =>
                            comment.reply_to_id === null ? (
<<<<<<< HEAD
                                <CommentComponent
                                    landmark={this.props.landmark}
                                    event_id={null}
                                    comment={comment}
                                    comments={comments}
                                />
=======
                                <CommentComponent comment={comment} comments={comments} key={i} />
>>>>>>> 16e4cd0078f6cea104f64a8c16ce6c3ee3d65d81
                            ) : (
                                    null
                                ))
                    ) : (
                            <p>No comments</p>
                        )

                    }
                    {
                        this.props.state.user ? (
                            <Form onSubmit={this.handleCommentSubmit}>
                                <Form.TextArea placeholder='Add Comment' onChange={this.onCommentValueChange} />
                                <Button content='Add Comment' />
                            </Form>
                        ) : (
                                <p className="login__required__text">If you want to add the comment, you have to <Link to="/login"><span className="login__required">login</span></Link>.</p>
                            )
                    }
                </Comment.Group>
            </div>
        )
    }
}
