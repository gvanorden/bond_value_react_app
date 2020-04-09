import React, { Component } from 'react';
import AdSense from 'react-adsense';
import { Table } from 'react-bootstrap';
import { CSVLink } from "react-csv";
import excel from '../images/excel.png';

class Instructions extends Component {
    state = {}

    render() {
        const exportData = [['Value as of (month)', 'Value as of (year)', 'Series', 'Denomination', 'Serial Number', 'Issue month', 'Issue Year']]

        const descriptions = [
            [<a href="/bond_example">Series</a>, 'Bond type (ex. E, EE, I, Savings Note)'],
            [<a href="/bond_example">Denomination</a>, 'Purchase price of your bond'],
            [<a href="/bond_example">Serial Number</a>, 'Unique identifier of your bond'],
            [<a href="/bond_example">Issue Month/Year</a>, 'Start date of when the bond was purchased'],
            ['Value as of Month/Year', 'End date of which to value your bonds']
        ]

        return <div style={{ width: '50%', margin: 'auto', marginTop: '2em' }}>
            <ol>
                <li>First, you’ll need a .csv file containing a list of your bonds with the following specifications:</li>
                <Table style={{ marginTop: '1em' }}>
                    <tbody>
                        {descriptions.map((description) => (
                            <tr key={description[0] + description[1]}>
                                <td key={description[0]} style={{ border: 'none', fontWeight: '500', width: '30%', padding: '.25em', fontSize: '.9em' }}>{description[0]}</td>
                                <td key={description[1]} style={{ border: 'none', padding: '.25em', fontSize: '.9em' }}>{description[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <CSVLink data={exportData} style={{ float: 'left', width: '100%', textAlign: 'right' }}>[Download CSV Template]</CSVLink>
                <img src={excel} alt="spreadsheet example" style={{ height: '100%', width: '100%', margin: '.5em 0 2em 0' }}></img>
                <li>Then, navigate to the <a href="/valuations" style={{ fontSize: '.95em', fontWeight: '500' }}>VALUATIONS</a> page where you'll attach this csv to value your bonds.</li>
            </ol>
            <AdSense.Google
                client='ca-pub-7292810486004926'
                slot='7806394673'
            />
        </div>;
    }
}

export default Instructions;