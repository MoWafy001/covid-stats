import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Heading = styled.h1`
    font-size: 24px;
    color: #333;
`;

export const Loading = () => {
    return (
        <Container>
            <Heading>Loading...</Heading>
        </Container>
    );
};
