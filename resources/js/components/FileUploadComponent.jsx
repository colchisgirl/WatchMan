import React from "react";
import axios, { post } from "axios";

export default class FileUploadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            landmark_id: this.props.landmark_id,
            user_id: this.props.user_id,
            event_id: this.props.event_id || null
        };
    }

    onFormSubmit = e => {
        e.preventDefault();

        const files = Array.from(e.target.querySelector('[type=file]').files);

        files.map((image, i) => {
            const formData = new FormData();

            if (this.state.event_id) {
                formData.append("event_id", this.state.event_id);
            }

            formData.append("landmark_id", this.state.landmark_id);
            formData.append("image", image);

            return axios({
                url: "/api/fileupload",
                method: "post",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        });
    };

    render() {
        return (
            <>
                <div className="file_upload">
                    <form
                        onSubmit={this.onFormSubmit}
                        encType="multipart/form-data"
                        method="POST"
                    >
                        <h1>Upload image</h1>
                        <div className="file__upload__input">
                            <input type="file" name="file" id="file" className="inputfile" multiple />
                            <label htmlFor="file">
                                <span></span>
                                <strong><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg> Choose a file…</strong>
                            </label>
                            <input type="submit" value="Upload images" />
                        </div>

                    </form>
                </div>
            </>
        );
    }
}
