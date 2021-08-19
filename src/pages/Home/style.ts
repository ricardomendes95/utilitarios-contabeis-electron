import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  position: relative;
  background-image: radial-gradient(
    circle at 50% -20.71%,
    #9dc1ff 0,
    #3c78f2 50%,
    #003581 100%
  );
`;

export const SectionMsg = styled.div`
  position: absolute;
  /* left: 30%;
  top: 28%;
  margin-left: -110px;
  margin-top: -40px; */
  width: 100%;
  height: 100%;
  top: 0;
`;

export const Section = styled.div`
  display: flex;
  /* justify-content: center; */
  margin-left: 10%;
  align-items: center;
  height: 100%;
`;

export const Msg = styled.h1`
  color: white;
  font-size: 80px;
  /* font-size: 600%; */
  line-height: 80px;
  text-shadow: 5px 5px 7px rgba(1, 1, 1, 0.8);
  font-family: 'Red Hat Display', sans-serif;
`;

export const Efect = styled.div`
  background-color: #f0f2f5;
  border-radius: 0px 0px 0px 100%;
  width: 400px;
  height: 350px;
  display: flex;
  justify-content: flex-end;
`;

export const ContEfect = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Img = styled.img`
  margin: 30px 15px 0px 00px;
  height: 40%;
`;
