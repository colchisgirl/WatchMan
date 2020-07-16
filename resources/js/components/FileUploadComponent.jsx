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
                        <div className="file__upload__input">
                            <input type="file" name="files" multiple />
                            <input type="submit" value="Upload images" />
                        </div>

                    </form>
                </div>
            </>
        );
    }
}
