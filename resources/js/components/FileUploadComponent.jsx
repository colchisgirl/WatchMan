import React from 'react';
import axios, { post } from 'axios';

export default class FileUploadComponent extends React.Component {
   

    constructor(props) {
        super(props);
        this.state ={
          landmark_id: this.props.landmark_id,
          user_id: this.props.user_id,
          event_id: this.props.event_id
        }
        console.log(this.props);
      }

      onFormSubmit = (e) => {
        e.preventDefault();
        this.fileUpload(e);
      }
      
      fileUpload = (e) => {
        const url = '/api/fileupload';
        const formData = new FormData(e.target);
        formData.append('landmark_id', this.state.landmark_id);
        formData.append('event_id', this.state.event_id);

        return axios({
          url: url,
          method: 'post',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => console.log(response));

        // return  post(url, formData)
        //         .then(response => console.log(response))
      }

      
    

    render() {
        return (
        <>
        <div className="file_upload">
        <form onSubmit={this.onFormSubmit} >
          <h1>Upload image</h1>
          <input type="file" name="image" />
          <input type="submit" value="Upload image" />
        </form>
        </div>
        </>
        )
    }
}