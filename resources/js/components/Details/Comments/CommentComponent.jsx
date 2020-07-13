import React, { Component } from 'react'

import { Button, Comment, Form } from 'semantic-ui-react'

export default class CommentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            replyFormHidden: true
        }
    }


    handleClickReply = () => {
        this.setState({
            replyFormHidden: !this.state.replyFormHidden
        })
        console.log(this.state.replyFormHidden)
    }


    render() {
        const { comment, comments } = this.props
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
                        <Comment.Action onClick={this.handleClickReply}>Reply</Comment.Action>
                        <Form reply className={`reply_form ${this.state.replyFormHidden ? 'hidden' : 'show'}`}>
                            <Form.TextArea placeholder='Add Reply' />
                            <Button content='Add Reply' />
                        </Form>
                    </Comment.Actions>
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
