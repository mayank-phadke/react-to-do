import React from 'react';
import {Card, Button, FormControl, Form, InputGroup, Col} from 'react-bootstrap'

class TodoCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editTitle: props.title
        }
    }

    handleSelect(e) {
        this.props.onSelectChange(this.props.id, e.target.checked)
    }

    handleDelete(e) {
        this.props.onDelete(this.props.id)
    }

    handleEdit() {
        this.props.onEdit(this.props.id)
    }

    handleTitleChange(e) {
        this.setState({editTitle: e.target.value})
    }

    saveTitle() {
        this.props.onSave(this.props.id, this.state.editTitle);
    }

    cancelEdit() {
        this.props.onCancel(this.props.id);
    }

    handleComplete() {
        this.props.onComplete(this.props.id, !this.props.complete);
    }

    render() {
        return (
            <Card className="mb-1">
                <Card.Body>
                    <Card.Title className="mb-0">
                        <Form inline>
                            <Col xs={1}>
                                <Form.Check
                                    className="mr-3"
                                    checked={this.props.checked}
                                    onChange={this.handleSelect.bind(this)} />
                            </Col>
                            <Col xs={10} sm={8}>
                                {
                                    this.props.edit?
                                    <InputGroup className="mr-auto">
                                        <FormControl
                                            type="text"
                                            value={this.state.editTitle}
                                            onChange={this.handleTitleChange.bind(this)} />
                                        <InputGroup.Append>
                                            <Button variant="success" onClick={this.saveTitle.bind(this)}><i className="fa fa-check" /></Button>
                                            <Button variant="danger" onClick={this.cancelEdit.bind(this)}><i className="fa fa-times" /></Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    :
                                    this.props.complete?
                                        <Form.Label className="mr-auto float-left text-muted" style={{textDecoration: "line-through"}}>{this.props.title}</Form.Label>
                                        :
                                        <Form.Label className="mr-auto float-left">{this.props.title}</Form.Label>
                                }
                            </Col>
                            <Col lg={3} sm={12}>
                                <Button
                                    variant="outline-danger"
                                    className="float-right ml-2"
                                    onClick={this.handleDelete.bind(this)}>
                                    <i className="fa fa-trash-alt"/>
                                </Button>
                                {
                                    !this.props.edit &&
                                    <Button
                                        variant="outline-warning"
                                        className="float-right ml-2"
                                        onClick={this.handleEdit.bind(this)}>
                                        <i className="fa fa-pen" />
                                    </Button>
                                }
                                {
                                    !this.props.edit &&
                                    this.props.complete ?
                                    <Button
                                        variant="outline-success"
                                        className="float-right"
                                        onClick={this.handleComplete.bind(this)}>
                                        <i className="far fa-times-circle" />
                                    </Button> : 
                                    <Button
                                        variant="outline-success"
                                        className="float-right"
                                        onClick={this.handleComplete.bind(this)}>
                                        <i className="far fa-check-circle" />
                                    </Button>
                                }
                            </Col>
                        </Form>
                    </Card.Title>
                </Card.Body>
            </Card>
        )
    }
}

export default TodoCard;