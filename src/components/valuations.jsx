import React, { Component } from "react";
import { Form, Table, Card, Spinner } from "react-bootstrap";
import { CSVLink } from "react-csv";


class Valuations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: 'Attach file',
            rows: [],
            totals: [],
            spinner: false,
            export: []
        };

        this.setFilename = this.setFilename.bind(this);
    }

    setFilename(e) {
        let filename = null

        if (e.target.files.length > 0) {
            filename = e.target.files[0].name
        }

        if (filename !== null) {

            this.setState({ label: filename, rows: [], totals: [], spinner: false, timer: 50 })

            var reader = new FileReader();

            reader.onload = () => {
                const csv = reader.result

                this.setState({ spinner: true })

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                    body: JSON.stringify({ csv })
                };

                fetch('https://ec2-18-222-193-49.us-east-2.compute.amazonaws.com/upload', requestOptions)
                    .then(response => response.json())
                    .then(response => {
                        let exports = []

                        exports.push(['Lookup Date', 'Serial Number', 'Series', 'Bond Amount', 'Issue Date', 'Next Accrual', 'Final Maturity', 'Issue Price', 'Interest', 'Interest Rate', 'Bond Value'])

                        for (let i in response['results']) {
                            exports.push(response['results'][i])
                        }

                        exports.push(['', '', '', response['totals'][1], '', '', '', response['totals'][2], '', '', response['totals'][0]])

                        this.setState({ rows: response['results'], totals: response['totals'], export: exports, spinner: false })
                    })
            }

            reader.readAsText(e.target.files[0]);
        }

    }

    render() {
        return (
            <React.Fragment>
                <Form className="form-csv" style={{ position: 'relative' }}>
                    {this.state.spinner ? <Spinner animation="border" role="status" variant="secondary" style={{ position: 'absolute', top: '.25em', left: '-2.5em' }}></Spinner> : null}
                    <Form.File
                        id="custom-file"
                        label={this.state.label}
                        onChange={this.setFilename}
                        custom
                    />
                </Form>
                <div style={{ float: 'left', width: '100%', marginTop: '2em' }}>
                    {this.state.totals.length > 0 ?
                        <div style={{ width: '50em', margin: 'auto' }}>
                            <Card style={{ width: '15em', float: 'left' }}>
                                <Card.Body style={{ margin: 'auto' }} >
                                    <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>TOTAL VALUE</Card.Subtitle>
                                    <Card.Title style={{ color: 'green', fontSize: '28px', textAlign: 'center', marginBottom: '0' }}>{this.state.totals[0]}</Card.Title>
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '15em', float: 'left', marginLeft: '2.5em' }}>
                                <Card.Body style={{ margin: 'auto' }}>
                                    <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>TOTAL FACE VALUE</Card.Subtitle>
                                    <Card.Title style={{ fontSize: '28px', textAlign: 'center', marginBottom: '0' }}>{this.state.totals[1]}</Card.Title>
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '15em', float: 'left', marginLeft: '2.5em' }}>
                                <Card.Body style={{ margin: 'auto' }}>
                                    <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>TOTAL ISSUE PRICE</Card.Subtitle>
                                    <Card.Title style={{ fontSize: '28px', textAlign: 'center', marginBottom: '0' }}>{this.state.totals[2]}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div> : null}
                </div>
                <div style={{ float: 'left', width: '100%', margin: '.5em 0 .25em 0' }}>
                    <div style={{ width: '85%', margin: 'auto', textAlign: 'right' }}>
                        {this.state.rows.length > 0 ?
                            <CSVLink filename={'export_' + this.state.label} data={this.state.export}>+ [Export]</CSVLink> : null}
                    </div>
                </div>
                <div style={{ float: 'left', width: '100%' }}>
                    {
                        this.state.rows.length > 0 ?
                            <Table striped bordered hover style={{ width: '85%', margin: 'auto' }}>
                                <thead style={{ textAlign: "center", fontSize: "11px", textTransform: "uppercase" }}>
                                    <tr>
                                        <th>Lookup Date</th>
                                        <th>Serial Number</th>
                                        <th>Series</th>
                                        <th>Bond Amount</th>
                                        <th>Issue Date</th>
                                        <th>Next Accrual</th>
                                        <th>Final Maturity</th>
                                        <th>Issue Price</th>
                                        <th>Interest</th>
                                        <th>Interest Rate</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.rows.map((result) => (
                                        <tr key={result[1]}>
                                            <td>{result[0]}</td>
                                            <td>{result[1]}</td>
                                            <td>{result[2]}</td>
                                            <td>{result[3]}</td>
                                            <td>{result[4]}</td>
                                            <td>{result[5]}</td>
                                            <td>{result[6]}</td>
                                            <td>{result[7]}</td>
                                            <td>{result[8]}</td>
                                            <td>{result[9]}</td>
                                            <td>{result[10]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table> : null
                    }
                </div>
            </React.Fragment >
        )
    }
}

export default Valuations;