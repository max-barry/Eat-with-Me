import styled from 'react-emotion';
import { bs } from '../../settings/styles';

export const ExpandingThirdsContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    alignItems: 'start'
});

export const ExpandingThirdsSection = styled('div')(
    ({ sticky }) => (sticky ? { position: 'sticky', top: 0 } : {})
);
