import styled from 'react-emotion';
import { bs } from '../../settings/styles';

export const ContractableListContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    alignItems: 'start'
});

export const ContractableListRow = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
    padding: `${bs(0.5)} 0`
    // display: 'grid',
    // gridTemplateColumns: `repeat(auto-fill, minmax(${dimensions.card}px, 1fr))`,
    // gridGap: `${bs(2)} ${bs(1)}`
});

export const ContractableListArea = styled('div')(
    ({ sticky }) => (sticky ? { position: 'sticky', top: 0 } : {})
);
