import React, { Component } from 'react'

import { Button, Comment, Form } from 'semantic-ui-react'

export default class CommentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comments: this.props.comments,
            replyFormHidden: true,
            reply_to_id: this.props.comment.id,
            text: null
        }
    }

    onCommentValueChange = (e) => {
        e.preventDefault()
        const comment = e.target.value

        this.setState({
            text: comment
        })
    }

    handleClickReply = (e) => {
        this.setState({
            replyFormHidden: !this.state.replyFormHidden
        })

    }


    handleReplySubmit = async (e) => {
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
                'Authorization': 'Bearer ' + this.props.token
            }
        });

        const comments = await response.json();
        this.setState({
            comments: comments,
            replyFormHidden: !this.state.replyFormHidden,
            text: null
        });

    }


    render() {
        console.log(this.state.reply_to_id)
        const { comments } = this.state
        const { comment } = this.props
        return (
            <Comment key={comment.id}>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>{comment.user.name}</Comment.Author>
                    <Comment.Metadata>
                        <div>{new Date(comment.created_at).toLocaleDateString("en-US")}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action name={comment.id} onClick={this.handleClickReply}>Reply</Comment.Action>
                    </Comment.Actions>
                    <Form reply
                        className={`reply_form ${this.state.replyFormHidden ? 'hidden' : 'show'}`}
                        onSubmit={this.handleReplySubmit}
                    >
                        <Form.TextArea placeholder='Add Reply' onChange={this.onCommentValueChange} />
                        <Button content='Add Reply' />
                    </Form>
                </Comment.Content>
                {comments.map((reply) =>
                    reply.reply_to_id === comment.id ? (
                        <Comment.Group key={reply.id}>
                            <Comment>
                                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
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
        )
    }
}
