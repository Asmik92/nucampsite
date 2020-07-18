import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const minLength = (len) => (val) => val && val.length >= len;
const maxLength = (len) => (val) => !val || val.length <= len;


class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  handleSubmit(values) {
    alert(JSON.stringify(values));
  }
  render() {
    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil fa-lg mr-1" />
          Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}> Login</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  model=".contactType"
                  name="contactType"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label htmlFor="author">Your Name</Label>
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    minLength: minLength(2),
                    maxLength: maxLength(30),
                  }}
                />
              </div>
              <Errors
                className="text-danger"
                model=".author"
                show="touched"
                component="div"
                messages={{
                  
                  minLength: "Must be at least 2 characters",
                  maxLength: "Must be 15 characters or less",
                }}
              />

              <div className="form-group">
                <Label htmlFor="text">Comment</Label>
                <Control.textarea
                  model=".text"
                  id="text"
                  name="text"
                  placeholder="Comment"
                  className="form-control"
                  rows="6"
                />
              </div>
              <Button>Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
function RenderComments({ comments }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => (
          <div>
            {comment.text}
            <br />
            <h5> {comment.author}</h5>
            <br />
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
          </div>
        ))}
        <CommentForm />
      </div>
    );
  }
}
function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  }
  return <div />;
}
export default CampsiteInfo;
