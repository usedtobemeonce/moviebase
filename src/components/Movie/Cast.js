import React from 'react';
import { Table } from 'semantic-ui-react';

import Header from '../UI/Header';

const cast = ({ className, cast }) => {

    return (
        <div className={className}>
            <Header as="h2">Cast</Header>
            <Table basic="very" celled inverted padded collapsing>
                <Table.Body>
                    {cast.slice(0, 20).map(actor => (
                        <Table.Row key={actor.id}>
                            <Table.Cell>
                                <img
                                    src={`https://image.tmdb.org/t/p/w45/${actor.profile_path}`}
                                    alt="actor profile" />
                            </Table.Cell>
                            <Table.Cell>{actor.name}</Table.Cell>
                            <Table.Cell>{actor.character}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}

export default cast;