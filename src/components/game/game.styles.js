import styled from 'styled-components';

export const Cards = styled.li`
    margin:4px;
    padding:4px;
    list-style:none;
`;

export const CardsContainer = styled.ul`
    display:flex;
    justify-content: center;
    text-align: center;
`;

export const CardTitle = styled.div`
    font-weight:bold;
    padding:4px;
`;

export const CardDetails = styled.div`
    border: 1px solid red;
    border-radius: 5px;
    background: ${props => props.theme.background};
    color: ${props => props.theme.color};
    width:200px;
    height:300px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding:4px;
`;

export const Controls = styled.div`
    display:flex;
    flex-direction: column;
    text-align: center;
`;

export const PlayButton = styled.button`
    padding: 3px;
    width:200px;
    display:block;
`;