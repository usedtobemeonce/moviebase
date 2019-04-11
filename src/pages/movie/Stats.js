import React from 'react';
import { Table } from 'react-bootstrap';

import Header from '../../components/shared/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { numberWithCommas } from '../../util/helper';

const stats = props => {
    const { className, status, releaseDate, budget, revenue, languages, runtime, countries } = props;

    return (
        <div className={className}>
            <Header as="h2">Stats for nerds</Header>
            <Table borderless striped responsive variant="dark">
                <tbody>
                    <tr>
                        <td>Status</td>
                        <td>{status}</td>
                    </tr>
                    <tr>
                        <td>Release Date</td>
                        <td>{releaseDate}</td>
                    </tr>
                    <tr>
                        <td>Budget</td>
                        <td>
                            <FontAwesomeIcon color="green" fixedWidth icon="dollar-sign" />
                            {numberWithCommas(budget)}
                        </td>
                    </tr>
                    <tr>
                        <td>Revenue</td>
                        <td>
                            <FontAwesomeIcon color="green" fixedWidth icon="dollar-sign" />
                            {numberWithCommas(revenue)}
                        </td>
                    </tr>
                    <tr>
                        <td>Languages</td>
                        <td>{languages}</td>
                    </tr>
                    <tr>
                        <td>Runtime</td>
                        <td>{runtime}</td>
                    </tr>
                    <tr>
                        <td>Countries</td>
                        <td>{countries}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default stats;