import { Outlet } from "react-router-dom";
import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;

  @media screen and (min-width: 501px) and (max-width: 1023px) {
    width: 32rem;
  }

  @media screen and (min-width: 1024px) {
    margin-top: 7rem;
    width: 40rem;
  }
`;

const Home = () => {
  return (
    <ContentContainer>
      <Outlet />
    </ContentContainer>
  );
};

export default Home;
