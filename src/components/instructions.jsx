import React, { Component } from 'react';
import AdSense from 'react-adsense';
import { CSVLink } from "react-csv";
import excel from '../images/excel.png';

class Instructions extends Component {
    state = {}

    render() {
        const exportData = [['Value as of (month)', 'Value as of (year)', 'Series', 'Denomination', 'Serial Number', 'Issue month', 'Issue Year']]

        const descriptions = [
            ['Series', 'Bond type (ex. E, EE, I, Savings Note)'],
            ['Denomination', 'Face value of your bond'],
            ['Serial Number', 'Unique identifier of your bond'],
            ['Issue Month/Year', 'Start date of when the bond was purchased'],
            ['Value as of Month/Year', 'End date of which to value your bonds']
        ]

        return <div style={{ width: '60%', margin: 'auto', marginTop: '2em' }}>
            <ol>
                <li style={{ textAlign: 'justify' }}>First, you’ll need a .csv file containing a list of your bonds with the following specifications and formatted in-line with the example template provided below:</li>
                <p style={{ marginTop: '1em' }}>For a visual aid in finding these components, please visit our <a href="/bond_example" style={{ fontSize: '.95em', fontWeight: '500' }}>BOND EXAMPLE</a> page</p>
                <ul style={{ margin: '.5em 0' }}>
                    {descriptions.map((description) => (
                        <li key={description[0] + description[1]}>
                            <div key={description[0]} style={{ float: 'left', width: '12.5em', fontWeight: '500', fontSize: '.9em' }}>{description[0]}</div>
                            <div key={description[1]} style={{ float: 'left', fontSize: '.9em' }}>{description[1]}</div>
                        </li>
                    ))}
                </ul>
                <CSVLink data={exportData} style={{ float: 'left', width: '100%', textAlign: 'right' }}>[Download CSV Template]</CSVLink>
                <img src={excel} alt="spreadsheet example" style={{ height: '100%', width: '100%', margin: '.5em 0 1.5em 0' }}></img>
                <li>Then, navigate to the <a href="/valuations" style={{ fontSize: '.95em', fontWeight: '500' }}>VALUATIONS</a> page where you'll attach this csv to value your bonds.</li>
                <li style={{ marginTop: '1em', textAlign: 'justify' }}>If formatted correctly, summary data for your bonds should be available shortly after attaching your csv.</li>
            </ol>
            <AdSense.Google
                client='ca-pub-7292810486004926'
                slot='7806394673'
            />
        </div>;
    }
}

export default Instructions;