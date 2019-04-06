import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

import Header from '../UI/Header';
import { numberWithCommas } from '../../util/helper';

const stats = props => {
    const { className, status, releaseDate, budget, revenue, languages, runtime, countries } = props;

    return (
        <div className={className}>
            <Header as="h2">Stats for nerds</Header>
            <Table celled inverted padded>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Status</Table.Cell>
                        <Table.Cell>{status}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Release Date</Table.Cell>
                        <Table.Cell>{releaseDate}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Budget</Table.Cell>
                        <Table.Cell>
                            <>
                                <Icon name="dollar" color="green" />
                                {numberWithCommas(budget)}
                            </>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Revenue</Table.Cell>
                        <Table.Cell>
                            <>
                                <Icon name="dollar" color="green" />
                                {numberWithCommas(revenue)}
                            </>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Languages</Table.Cell>
                        <Table.Cell>{languages}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Runtime</Table.Cell>
                        <Table.Cell>{runtime} minutes</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Countries</Table.Cell>
                        <Table.Cell>{countries}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}

export default stats;