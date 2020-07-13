import React, { Component } from 'react'

import { Button, Comment, Form, Header, CommentContent } from 'semantic-ui-react'

export default class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            replyFormHidden: true

        }
    }

    componentDidMount = () => {

        fetch(`/api/comments/${this.props.landmark}/${this.props.event}`, {
            headers: {
                Accept: "application/json", // we expect JSON as response
                "Content-Type": "application/json", // if we are sending something in the body, it is JSON
                Authorization: "Bearer " + this.props.token
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    this.setState({
                        comments: data
                    })
                })
            } else {
                if (response.status === 401) {
                    this.props.onFailedAuthentication();
                }
            }
        })
    }

    handleClickReply = () => {
        this.setState({
            replyFormHidden: !this.state.replyFormHidden
        })
        console.log(this.state.replyFormHidden)
    }



    render() {
        const { comments } = this.state

        return (
            <div className="ldetails__container__comments">
                <Comment.Group>
                    <Header as='h3' dividing>
                        Comments
                    </Header>
                    {comments ? (

                        comments.map((comment) =>
                            comment.reply_to_id === null ? (
                                <Comment key={comment.id}>
                                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                                    <Comment.Content>
                                        <Comment.Author as='a'>{comment.user.name}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{new Date(comment.created_at).toLocaleDateString("en-US")}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>{comment.text}</Comment.Text>
                                        <Comment.Actions>
                                            <Comment.Action onClick={this.handleClickReply}>Reply</Comment.Action>
                                            <Form reply className={`reply_form ${this.state.replyFormHidden ? 'hidden' : 'show'}`}>
                                                <Form.TextArea placeholder='Add Reply' />
                                                <Button content='Add Reply' />
                                            </Form>
                                        </Comment.Actions>
                                    </Comment.Content>
                                    {comments.map((reply) =>
                                        reply.reply_to_id === comment.id ? (
                                            <Comment.Group key={comment.id}>
                                                <Comment>
                                                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                                                    <Comment.Content>
                                                        <Comment.Author as='a'>{reply.user.name}</Comment.Author>
                                                        <Comment.Metadata>
                                                            <div>{new Date(comment.created_at).toLocaleDateString("en-US")}</div>
                                                        </Comment.Metadata>
                                                        <Comment.Text>{reply.text}</Comment.Text>
                                                        <Comment.Actions>
                                                            <Comment.Action></Comment.Action>
                                                        </Comment.Actions>
                                                    </Comment.Content>
                                                </Comment>
                                            </Comment.Group>
                                        ) : (
                                                null
                                            ))}
                                </Comment>
                            ) : (
                                    null
                                ))
                    ) : (
                            <p>No comment</p>
                        )

                    }



                    {/* <Comment>
                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                        <Comment.Content>
                            <Comment.Author as='a'>Elliot Fu</Comment.Author>
                            <Comment.Metadata>
                                <div>Yesterday at 12:30AM</div>
                            </Comment.Metadata>
                            <Comment.Text>
                                <p>This has been very useful for my research. Thanks as well!</p>
                            </Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                        <Comment.Group>
                            <Comment>
                                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                                <Comment.Content>
                                    <Comment.Author as='a'>Jenny Hess</Comment.Author>
                                    <Comment.Metadata>
                                        <div>Just now</div>
                                    </Comment.Metadata>
                                    <Comment.Text>Elliot you are always so right :)</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>
                        </Comment.Group>
                    </Comment> */}

                    <Form reply>
                        <Form.TextArea placeholder='Add Comment' />
                        <Button content='Add Comment' />
                    </Form>
                </Comment.Group>
            </div>
        )
    }
}
