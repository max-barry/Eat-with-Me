import styled from 'react-emotion';
import { bs, dimensions } from '../../settings/styles';

export const ContractableListContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)'
});

export const ContractableListUl = styled('ul')({
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(${dimensions.card}px, 1fr))`,
    gridGap: `${bs(2)} ${bs(1)}`
});

export const ContractableListLi = styled('li')({});

export const ContractableListArea = styled('div')({});
